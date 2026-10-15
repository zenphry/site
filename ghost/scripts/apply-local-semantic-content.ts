import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

type Login = { url: string; email: string; password: string };
type GhostPage = {
  id: string;
  slug: string;
  updated_at: string;
  html: string;
  lexical: string | null;
};
type ExportedPage = { slug: string; html: string };

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const loginPath = resolve(root, "ghost/.local/admin-login.json");
const exportPath = resolve(root, "ghost/content/export/zenphry-content.json");
const backupDir = resolve(root, "ghost/.local/backups");

function assertLoopback(url: string) {
  const origin = new URL(url).origin;
  if (!/^http:\/\/(127\.0\.0\.1|localhost)(?::\d+)?$/.test(origin))
    throw new Error("Only a loopback Ghost Admin instance may be updated");
  return origin;
}

function assertNativeStructure(slug: string, page: GhostPage) {
  const html = page.html || "";
  if (slug === "services") {
    if ((html.match(/<h3\b[^>]*>/g) ?? []).length !== 8)
      throw new Error("Ghost did not retain eight editable service headings");
    for (const expected of [
      "Restructuring Diagnostic</h3>",
      '<a href="/services/diagnostic">Get the Diagnostic</a>',
      '<a href="/services/advisory">Learn More</a>',
    ])
      if (!html.includes(expected))
        throw new Error(
          `Ghost did not retain service catalog content: ${expected}`,
        );
  }
  if (slug === "services-financial") {
    if ((html.match(/<h3\b[^>]*>/g) ?? []).length !== 6)
      throw new Error("Ghost did not retain six editable financial pillars");
    if ((html.match(/<li\b[^>]*>/g) ?? []).length !== 35)
      throw new Error("Ghost did not retain the financial checklists");
  }
}

async function main() {
  const baselinePath = process.env.SEMANTIC_BASELINE_EXPORT;
  const slugs = process.argv.slice(2);
  if (!baselinePath)
    throw new Error("SEMANTIC_BASELINE_EXPORT must point to the prior export");
  if (!slugs.length)
    throw new Error("Provide one or more page slugs to update");

  const [loginRaw, exportRaw, baselineRaw] = await Promise.all([
    readFile(loginPath, "utf8"),
    readFile(exportPath, "utf8"),
    readFile(baselinePath, "utf8"),
  ]);
  const login = JSON.parse(loginRaw) as Login;
  const origin = assertLoopback(login.url);
  const target = JSON.parse(exportRaw) as {
    data: { posts: ExportedPage[] };
  };
  const baseline = JSON.parse(baselineRaw) as {
    data: { posts: ExportedPage[] };
  };
  const targetBySlug = new Map(
    target.data.posts.map((page) => [page.slug, page]),
  );
  const baselineBySlug = new Map(
    baseline.data.posts.map((page) => [page.slug, page]),
  );

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(login.url, { waitUntil: "domcontentloaded" });
    if (new URL(page.url()).origin !== origin)
      throw new Error("Ghost Admin redirected away from the local instance");
    await page.getByLabel("Email address").fill(login.email);
    await page.getByLabel("Password").fill(login.password);
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.waitForFunction(() => !location.hash.includes("signin"));
    if (new URL(page.url()).origin !== origin)
      throw new Error("Ghost Admin redirected away from the local instance");

    await mkdir(backupDir, { recursive: true });
    for (const slug of slugs) {
      const next = targetBySlug.get(slug);
      const previous = baselineBySlug.get(slug);
      if (!next || !previous) throw new Error(`Missing ${slug} in an export`);
      const response = (await page.evaluate(async (pageSlug) => {
        const result = await fetch(
          `/ghost/api/admin/pages/slug/${pageSlug}/?formats=lexical,html`,
        );
        if (!result.ok) throw new Error(`Read failed with ${result.status}`);
        return result.json();
      }, slug)) as { pages: GhostPage[] };
      const current = response.pages[0];
      if (!current) throw new Error(`Local Ghost page ${slug} is missing`);
      const matchesPriorImport = await page.evaluate(
        ({ currentHtml, priorHtml }) =>
          new Function(
            "currentHtml",
            "priorHtml",
            `const content=html=>{const container=document.createElement("div");container.innerHTML=html;const links=[];for(const anchor of container.querySelectorAll("a")){const href=new URL(anchor.getAttribute("href")||"",location.origin).href;const text=(anchor.textContent||"").replace(/\\s+/g,"");if(!text)continue;const previous=links.at(-1);if(previous&&previous.href===href)previous.text+=text;else links.push({href,text})}return {text:(container.textContent||"").replace(/\\s+/g,""),links}};const current=content(currentHtml),prior=content(priorHtml);return current.text===prior.text&&JSON.stringify(current.links)===JSON.stringify(prior.links);`,
          )(currentHtml, priorHtml),
        { currentHtml: current.html, priorHtml: previous.html },
      );
      if (!matchesPriorImport)
        throw new Error(
          `${slug} differs from the prior import's text or links; refusing to overwrite it`,
        );

      const backup = resolve(
        backupDir,
        `${slug}-before-semantic-update-${Date.now()}.json`,
      );
      await writeFile(backup, `${JSON.stringify(current, null, 2)}\n`, {
        mode: 0o600,
      });
      await chmod(backup, 0o600);
      const saved = (await page.evaluate(
        async ({ pageToUpdate, html }) => {
          const result = await fetch(
            `/ghost/api/admin/pages/${pageToUpdate.id}/?source=html`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                pages: [
                  {
                    id: pageToUpdate.id,
                    updated_at: pageToUpdate.updated_at,
                    html,
                  },
                ],
              }),
            },
          );
          if (!result.ok)
            throw new Error(`Update failed with ${result.status}`);
          return result.json();
        },
        { pageToUpdate: current, html: next.html },
      )) as { pages: GhostPage[] };
      const updated = saved.pages[0];
      if (!updated?.lexical)
        throw new Error(`Ghost did not retain native content for ${slug}`);
      assertNativeStructure(slug, updated);
      if (slug === "services-diagnostic") {
        const listItems = (
          JSON.stringify(JSON.parse(updated.lexical)).match(
            /"type":"listitem"/g,
          ) ?? []
        ).length;
        if (listItems !== 30)
          throw new Error(
            `Ghost saved ${listItems} diagnostic list items, expected 30`,
          );
      }
      console.log(`Updated and backed up local Ghost page: ${slug}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
