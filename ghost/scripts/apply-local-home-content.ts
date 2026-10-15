import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

type Login = { url: string; email: string; password: string };
type Page = {
  id: string;
  updated_at: string;
  html: string;
  lexical: string | null;
};

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const loginPath = resolve(root, "ghost/.local/admin-login.json");
const exportPath = resolve(root, "ghost/content/export/zenphry-content.json");
const backupDir = resolve(root, "ghost/.local/backups");

function assertLocalPageOrigin(pageUrl: string, origin: string) {
  if (new URL(pageUrl).origin !== origin)
    throw new Error("Ghost Admin redirected away from the local instance");
}

async function main() {
  const login = JSON.parse(await readFile(loginPath, "utf8")) as Login;
  const origin = new URL(login.url).origin;
  if (!/^http:\/\/(127\.0\.0\.1|localhost)(?::\d+)?$/.test(origin))
    throw new Error("Only a loopback Ghost Admin instance may be updated");
  const exported = JSON.parse(await readFile(exportPath, "utf8")) as {
    data: { posts: Array<{ slug: string; html: string }> };
  };
  const html = exported.data.posts.find((post) => post.slug === "home")?.html;
  if (!html) throw new Error("The exported home page is missing");
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(login.url, { waitUntil: "domcontentloaded" });
    assertLocalPageOrigin(page.url(), origin);
    await page.getByLabel("Email address").fill(login.email);
    await page.getByLabel("Password").fill(login.password);
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.waitForFunction(() => !location.hash.includes("signin"));
    assertLocalPageOrigin(page.url(), origin);
    const current = (await page.evaluate(async () => {
      const response = await fetch(
        "/ghost/api/admin/pages/slug/home/?formats=lexical,html",
      );
      if (!response.ok)
        throw new Error(`Home read failed with ${response.status}`);
      return response.json();
    })) as { pages: Page[] };
    const home = current.pages[0];
    if (!home) throw new Error("Local Ghost home page is missing");
    await mkdir(backupDir, { recursive: true });
    const backup = resolve(
      backupDir,
      `home-before-native-update-${Date.now()}.json`,
    );
    await writeFile(backup, `${JSON.stringify(home, null, 2)}\n`, {
      mode: 0o600,
    });
    await chmod(backup, 0o600);
    const saved = (await page.evaluate(
      async ({ home, html }) => {
        const response = await fetch(
          `/ghost/api/admin/pages/${home.id}/?source=html`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pages: [{ id: home.id, updated_at: home.updated_at, html }],
            }),
          },
        );
        if (!response.ok)
          throw new Error(`Home update failed with ${response.status}`);
        return response.json();
      },
      { home, html },
    )) as { pages: Page[] };
    if (!saved.pages[0])
      throw new Error("Ghost did not return the saved home page");
    const refreshed = (await page.evaluate(async () => {
      const response = await fetch(
        "/ghost/api/admin/pages/slug/home/?formats=lexical,html",
      );
      if (!response.ok)
        throw new Error(
          `Home verification read failed with ${response.status}`,
        );
      return response.json();
    })) as { pages: Page[] };
    const updated = refreshed.pages[0];
    if (!updated?.lexical || !updated.html?.includes("Most Popular"))
      throw new Error("Ghost did not retain native Lexical home content");
    const native = JSON.parse(updated.lexical) as unknown;
    const nativeText = JSON.stringify(native);
    const listItemCount = (nativeText.match(/"type":"listitem"/g) ?? []).length;
    if (listItemCount !== 19)
      throw new Error(
        `Ghost saved ${listItemCount} native list items, expected 19`,
      );
    console.log("Updated and backed up local Ghost home content.");
  } finally {
    await browser.close();
  }
}
main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
