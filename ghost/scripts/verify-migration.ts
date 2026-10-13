import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

type Page = { path: string; slug: string };
const ghostRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  const manifest = JSON.parse(
    await readFile(resolve(ghostRoot, "content/pages-manifest.json"), "utf8"),
  ) as Page[];
  const routes = await readFile(resolve(ghostRoot, "routes.yaml"), "utf8");
  const redirects = await readFile(
    resolve(ghostRoot, "redirects.yaml"),
    "utf8",
  );
  const templates = [
    "default.hbs",
    "home.hbs",
    "page.hbs",
    "service.hbs",
    "post.hbs",
    "index.hbs",
    "page-contact.hbs",
    "page-book-a-call.hbs",
  ];

  for (const page of manifest) {
    const path = page.path === "/" ? "/" : `${page.path}/`;
    if (
      !routes.includes(`  ${path}:`) ||
      !routes.includes(`data: page.${page.slug}`)
    ) {
      throw new Error(`Missing Ghost route for ${page.path} (${page.slug})`);
    }
  }
  for (const source of [
    "^/pricing/?$",
    "^/case-studies/?$",
    "^/case-studies/saas-scaling/?$",
    "^/case-studies/founder-bottleneck/?$",
    "^/case-studies/enterprise-alignment/?$",
    "^/how-it-works/?$",
    "^/services/foundation/?$",
    "^/services/enterprise/?$",
    "^/services/growth/?$",
  ]) {
    if (!redirects.includes(`  "${source}":`))
      throw new Error(`Missing redirect for ${source}`);
  }
  for (const template of templates) {
    await readFile(resolve(ghostRoot, "theme", template), "utf8");
  }
  console.log(
    `Verified ${manifest.length} imported pages, ${templates.length} templates, and legacy redirects.`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
