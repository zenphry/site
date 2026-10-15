import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

type Login = { url: string; email: string; password: string };
type Article = {
  sequence: number;
  slug: string;
  title: string;
  htmlFile: string;
  customExcerpt: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  reviewStatus: "ready" | "needs-review";
};
type GhostPost = {
  id: string;
  slug: string;
  lexical: string | null;
  url?: string;
};
type GhostUser = {
  id: string;
  name: string;
  email: string;
  status: string;
  roles?: Array<{ name: string }>;
};

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const loginPath = resolve(root, "ghost/.local/admin-login.json");
const manifestPath = resolve(root, "ghost/content/articles/manifest.json");
const reportPath = resolve(root, "ghost/.local/article-import.json");

function assertLoopback(url: string) {
  const origin = new URL(url).origin;
  if (!/^http:\/\/(127\.0\.0\.1|localhost)(?::\d+)?$/.test(origin)) {
    throw new Error("Only a loopback Ghost Admin instance may be updated");
  }
  return origin;
}

async function ensureAuthor(page: import("playwright").Page) {
  const findAuthor = () =>
    page.evaluate(async () => {
      const response = await fetch(
        "/ghost/api/admin/users/?limit=all&include=roles",
      );
      if (!response.ok)
        throw new Error(`Author lookup failed with ${response.status}`);
      return response.json();
    }) as Promise<{ users: GhostUser[] }>;
  const authorFrom = (users: GhostUser[]) =>
    users.find(
      (user) =>
        user.name === "Marvellous Chuyuoh" &&
        user.email === "marvellous@zenphry.com" &&
        ["active", "locked"].includes(user.status) &&
        user.roles?.some((role) => role.name === "Author"),
    );
  const existing = authorFrom((await findAuthor()).users);
  if (existing) return existing;

  const site = (await page.evaluate(async () => {
    const response = await fetch("/ghost/api/admin/site/");
    if (!response.ok)
      throw new Error(`Site version lookup failed with ${response.status}`);
    return response.json();
  })) as { site?: { version?: string } };
  const version = site.site?.version;
  if (!version) throw new Error("Ghost did not provide its Admin site version");
  const importVersion = /^\d+\.\d+$/.test(version) ? `${version}.0` : version;
  await page.evaluate(
    async ({ version }) => {
      const now = new Date().toISOString();
      const user = {
        id: crypto.randomUUID(),
        name: "Marvellous Chuyuoh",
        slug: "marvellous-chuyuoh",
        email: "marvellous@zenphry.com",
        status: "active",
        visibility: "public",
        created_at: now,
        updated_at: now,
      };
      const role = {
        id: crypto.randomUUID(),
        name: "Author",
        description: "Author",
        created_at: now,
        updated_at: now,
      };
      const payload = {
        db: [
          {
            meta: { exported_on: Date.now(), version },
            data: {
              users: [user],
              roles: [role],
              roles_users: [{ role_id: role.id, user_id: user.id }],
            },
          },
        ],
      };
      const form = new FormData();
      form.append(
        "importfile",
        new File([JSON.stringify(payload)], "marvellous-author.json", {
          type: "application/json",
        }),
      );
      const response = await fetch("/ghost/api/admin/db/", {
        method: "POST",
        body: form,
      });
      if (!response.ok)
        throw new Error(`Author import failed with ${response.status}`);
    },
    { version: importVersion },
  );
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const imported = authorFrom((await findAuthor()).users);
    if (imported) return imported;
    await page.waitForTimeout(250);
  }
  throw new Error(
    "Ghost did not create the verified Marvellous Chuyuoh author within 30 seconds",
  );
}

async function main() {
  const [loginRaw, manifestRaw] = await Promise.all([
    readFile(loginPath, "utf8"),
    readFile(manifestPath, "utf8"),
  ]);
  const login = JSON.parse(loginRaw) as Login;
  const origin = assertLoopback(login.url);
  const { articles } = JSON.parse(manifestRaw) as { articles: Article[] };
  const browser = await chromium.launch({ headless: true });
  const report: Array<{
    sequence: number;
    slug: string;
    reviewStatus: Article["reviewStatus"];
    result: "created" | "skipped";
    id?: string;
    url?: string;
    editorUrl?: string;
  }> = [];

  try {
    const page = await browser.newPage();
    await page.goto(login.url, { waitUntil: "domcontentloaded" });
    if (new URL(page.url()).origin !== origin) {
      throw new Error("Ghost Admin redirected away from the local instance");
    }

    await page.getByLabel("Email address").fill(login.email);
    await page.getByLabel("Password").fill(login.password);
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.waitForFunction(() => !location.hash.includes("signin"));
    if (new URL(page.url()).origin !== origin) {
      throw new Error("Ghost Admin redirected away from the local instance");
    }
    const author = await ensureAuthor(page);

    for (const article of articles) {
      const existing = (await page.evaluate(async (slug) => {
        const response = await fetch(
          `/ghost/api/admin/posts/slug/${slug}/?formats=lexical,html`,
        );
        if (response.status === 404) return null;
        if (!response.ok)
          throw new Error(`Post lookup failed with ${response.status}`);
        return response.json();
      }, article.slug)) as { posts: GhostPost[] } | null;
      if (existing?.posts[0]) {
        report.push({
          slug: article.slug,
          sequence: article.sequence,
          reviewStatus: article.reviewStatus,
          result: "skipped",
          id: existing.posts[0].id,
          url: existing.posts[0].url,
          editorUrl: `${origin}/ghost/#/editor/post/${existing.posts[0].id}`,
        });
        continue;
      }

      const html = await readFile(
        resolve(root, "ghost/content/articles", article.htmlFile),
        "utf8",
      );
      const created = (await page.evaluate(
        async ({ article, html, author }) => {
          const response = await fetch("/ghost/api/admin/posts/?source=html", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              posts: [
                {
                  title: article.title,
                  slug: article.slug,
                  html,
                  status: "draft",
                  custom_excerpt: article.customExcerpt,
                  meta_title: article.metaTitle,
                  meta_description: article.metaDescription,
                  tags: [
                    ...article.tags.map((name: string) => ({ name })),
                    {
                      name:
                        article.reviewStatus === "ready"
                          ? "#Ready for launch"
                          : "#Needs review",
                    },
                  ],
                  authors: [{ id: author.id }],
                },
              ],
            }),
          });
          if (!response.ok)
            throw new Error(`Post creation failed with ${response.status}`);
          return response.json();
        },
        { article, html, author },
      )) as { posts: Array<GhostPost & { url: string }> };
      const post = created.posts[0];
      if (!post?.lexical)
        throw new Error(
          `Ghost did not retain native content for ${article.slug}`,
        );
      const readBack = (await page.evaluate(async (id) => {
        const response = await fetch(
          `/ghost/api/admin/posts/${id}/?formats=lexical,html`,
        );
        if (!response.ok)
          throw new Error(`Post readback failed with ${response.status}`);
        return response.json();
      }, post.id)) as { posts: GhostPost[] };
      if (!readBack.posts[0]?.lexical) {
        throw new Error(
          `Ghost did not retain native content after readback for ${article.slug}`,
        );
      }
      report.push({
        slug: article.slug,
        sequence: article.sequence,
        reviewStatus: article.reviewStatus,
        result: "created",
        id: post.id,
        url: post.url,
        editorUrl: `${origin}/ghost/#/editor/post/${post.id}`,
      });
    }
  } finally {
    await browser.close();
  }

  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(
    reportPath,
    `${JSON.stringify({ articles: report }, null, 2)}\n`,
    { mode: 0o600 },
  );
  await chmod(reportPath, 0o600);
  for (const item of report) console.log(`${item.result}: ${item.slug}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
