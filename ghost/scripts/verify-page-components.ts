import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Page } from "playwright";

type RequiredComponents = Partial<{
  catalogCards: number;
  componentLists: number;
  exclusions: number;
  faqItems: number;
  featureCards: number;
  featureLists: number;
  pillars: number;
  serviceCards: number;
  steps: number;
  storyCards: number;
}>;

type RouteExpectation = {
  kind: string;
  required?: RequiredComponents;
};

type Expectations = {
  version: number;
  routes: Record<string, RouteExpectation>;
  discovered: Record<string, RouteExpectation>;
};

type ManifestPage = { path: string; slug: string };
type AuditIssue = { rule: string; detail: string };
type ComponentCounts = Record<string, number>;
type RouteResult = {
  path: string;
  kind: string;
  status: "pass" | "fail" | "untested";
  components?: ComponentCounts;
  checks?: AuditIssue[];
  advisory?: string[];
  reason?: string;
};

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const ghostRoot = resolve(siteRoot, "ghost");
const origin = (process.env.GHOST_LOCAL_URL ?? "http://127.0.0.1:2368").replace(
  /\/$/,
  "",
);
const reportPath = resolve(ghostRoot, ".local/page-component-audit.json");

function routePath(path: string) {
  return path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
}

function normalizePath(path: string) {
  return path === "/" ? path : `${path.replace(/\/$/, "")}/`;
}

function countMinimum(
  required: RequiredComponents | undefined,
  observed: ComponentCounts,
) {
  const issues: AuditIssue[] = [];
  for (const [name, minimum] of Object.entries(required ?? {})) {
    if ((observed[name] ?? 0) < minimum) {
      issues.push({
        rule: "component-count",
        detail: `${name} was ${observed[name] ?? 0}, expected at least ${minimum}`,
      });
    }
  }
  return issues;
}

async function sitemapUrls() {
  const visited = new Set<string>();
  const urls = new Set<string>();

  async function visit(url: string): Promise<void> {
    if (visited.has(url)) return;
    visited.add(url);
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(
        `Could not read Ghost sitemap ${url}: ${response.status}`,
      );
    const xml = await response.text();
    if (!/<(?:sitemapindex|urlset)\b/.test(xml))
      throw new Error(`Ghost sitemap ${url} did not return sitemap XML`);
    const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => match[1],
    );
    if (!locations.length)
      throw new Error(`Ghost sitemap ${url} did not contain any URLs`);
    await Promise.all(
      locations.map(async (location) => {
        if (/\/sitemap(?:-[^/]+)?\.xml$/.test(location)) await visit(location);
        else urls.add(normalizePath(new URL(location).pathname));
      }),
    );
  }

  await visit(`${origin}/sitemap.xml`);
  return [...urls].sort();
}

function discoveredKind(path: string, expectations: Expectations) {
  if (/^\/resources\/authors\/[^/]+\/$/.test(path))
    return expectations.discovered.author;
  if (/^\/resources\/topics\/[^/]+\/$/.test(path))
    return expectations.discovered.tag;
  if (/^\/resources\/blog\/[^/]+\/$/.test(path))
    return expectations.discovered.post;
  return undefined;
}

async function inspectPage(
  page: Page,
  path: string,
  expectation: RouteExpectation,
) {
  const response = await page.goto(`${origin}${path}`, {
    waitUntil: "networkidle",
  });
  if (response?.status() !== 200) {
    return {
      observed: {} as ComponentCounts,
      issues: [
        {
          rule: "response",
          detail: `${path} returned ${response?.status() ?? "no response"}`,
        },
      ],
      advisory: [],
    };
  }

  await page
    .locator("body")
    .evaluate(
      (body, kind) => body.setAttribute("data-component-audit-kind", kind),
      expectation.kind,
    );
  await page.evaluate("window.__name = function (value) { return value; }");
  const inspection = await page.evaluate(() => {
    function __name<T>(value: T) {
      return value;
    }
    const kind = document.body.dataset.componentAuditKind ?? "";
    const content = document.querySelector(".page-content");
    function selectCount(selector: string) {
      return document.querySelectorAll(selector).length;
    }
    const counts = {
      catalogCards: selectCount(".component-catalog .component-card"),
      componentLists: selectCount(
        ".component-list-feature, .component-list-checklist, .component-list-exclusions, .component-list-steps",
      ),
      exclusions: selectCount(".component-exclusions"),
      faqItems: selectCount(".component-accordion details"),
      featureCards: selectCount(".component-list-feature > li"),
      featureLists: selectCount(".component-list-feature"),
      pillars: selectCount(".component-pillars > .component-pillar"),
      serviceCards: selectCount(".service-grid .content-card"),
      steps: selectCount(".component-list-steps"),
      storyCards: selectCount(".component-story-grid .component-story-card"),
    };
    const issues: Array<{ rule: string; detail: string }> = [];
    const advisory: string[] = [];
    const overflow = document.documentElement.scrollWidth > window.innerWidth;
    if (overflow)
      issues.push({
        rule: "overflow",
        detail: "document exceeds viewport width",
      });
    if (selectCount(".site-header") !== 1 || selectCount(".site-footer") !== 1)
      issues.push({
        rule: "shell",
        detail: "shared header or footer is missing",
      });

    if (
      kind === "marketing-components" ||
      kind === "booking-pattern" ||
      kind === "thank-you-steps"
    ) {
      if (!content) {
        issues.push({
          rule: "content-root",
          detail: "editable page content is missing",
        });
      } else {
        const componentListClass = [
          "component-list-feature",
          "component-list-checklist",
          "component-list-exclusions",
          "component-list-steps",
        ];
        const lists = Array.from(content.querySelectorAll("ul, ol"));
        lists.forEach((list) => {
          const nestedPillarList = Boolean(list.closest(".component-pillar"));
          const managed =
            list.classList.contains("component-pillars") ||
            componentListClass.some((className) =>
              list.classList.contains(className),
            );
          const standalone =
            list.parentElement === content ||
            list.parentElement?.classList.contains("component-section");
          if (standalone && !managed && !nestedPillarList) {
            issues.push({
              rule: "unstyled-list",
              detail: `direct ${list.tagName.toLowerCase()} lacks a reusable component list class`,
            });
          }
          if (managed) {
            const style = getComputedStyle(list);
            if (style.listStyleType !== "none") {
              issues.push({
                rule: "list-style",
                detail: `component list ${list.className} still shows native list markers`,
              });
            }
            if (style.display !== "grid") {
              issues.push({
                rule: "list-layout",
                detail: `component list ${list.className} has unexpected display ${style.display}`,
              });
            }
          }
        });
        Array.from(content.querySelectorAll("p")).forEach((paragraph) => {
          if (/^[—–-]$/.test((paragraph.textContent ?? "").trim()))
            issues.push({
              rule: "detached-marker",
              detail: "a marker paragraph was left outside its exclusion list",
            });
        });
        Array.from(
          content.querySelectorAll(".component-literal-markers > li"),
        ).forEach((item) => {
          if (/^(?:•|—|–|-\s)/.test((item.textContent ?? "").trim())) {
            const marker = getComputedStyle(item, "::before").content;
            if (
              marker &&
              marker !== "none" &&
              marker !== "normal" &&
              marker !== '""'
            )
              issues.push({
                rule: "duplicate-marker",
                detail:
                  "an authored list marker is paired with a pseudo marker",
              });
          }
        });
        if (content.querySelector(".component-pillar section"))
          issues.push({
            rule: "nested-pillar-section",
            detail: "a component section is nested inside a pillar",
          });
        Array.from(content.querySelectorAll(".component-cta")).forEach(
          (cta) => {
            const anchors = Array.from(cta.querySelectorAll("a"));
            const copy = cta.cloneNode(true) as HTMLElement;
            copy.querySelectorAll("a").forEach((anchor) => anchor.remove());
            const outsideLinkMedia = Array.from(
              cta.querySelectorAll(
                "img, video, audio, iframe, object, embed, svg",
              ),
            ).some((media) => !media.closest("a"));
            if (!anchors.length || copy.textContent?.trim() || outsideLinkMedia)
              issues.push({
                rule: "inline-cta",
                detail: "inline prose was styled as a call to action",
              });
          },
        );
      }
    }

    if (kind === "thank-you-steps" && content) {
      Array.from(
        content.querySelectorAll(".component-list-steps > li"),
      ).forEach((item) => {
        if (/^\s*\d+[.)]?(?=\s|[A-Za-z])/.test(item.textContent ?? ""))
          issues.push({
            rule: "thank-you-ordinal",
            detail: "thank-you step contains a duplicated literal ordinal",
          });
      });
    }

    const sourceText = content?.textContent ?? "";
    if (/\bplaceholder\b|will be added here/i.test(sourceText))
      advisory.push("Source content still contains placeholder text.");
    if (/\bteam leadership\b|profiles coming soon/i.test(sourceText))
      advisory.push(
        "Source content refers to team leadership without named bios.",
      );
    return { counts, issues, advisory };
  });

  return {
    observed: inspection.counts,
    issues: inspection.issues,
    advisory: inspection.advisory,
  };
}

async function main() {
  const [expectationsRaw, manifestRaw] = await Promise.all([
    readFile(
      resolve(ghostRoot, "content/page-component-expectations.json"),
      "utf8",
    ),
    readFile(resolve(ghostRoot, "content/pages-manifest.json"), "utf8"),
  ]);
  const expectations = JSON.parse(expectationsRaw) as Expectations;
  const manifest = JSON.parse(manifestRaw) as ManifestPage[];
  const manifestPaths = new Set(manifest.map((entry) => routePath(entry.path)));
  const configuredPaths = new Set(Object.keys(expectations.routes));
  const missingExpectations = [...manifestPaths].filter(
    (path) => !configuredPaths.has(path),
  );
  const unexpectedExpectations = [...configuredPaths].filter(
    (path) => !manifestPaths.has(path) && path !== "/resources/blog/",
  );
  if (missingExpectations.length || unexpectedExpectations.length) {
    throw new Error(
      `Page expectation coverage mismatch: missing ${missingExpectations.join(", ") || "none"}; unexpected ${unexpectedExpectations.join(", ") || "none"}`,
    );
  }

  const sitemap = await sitemapUrls();
  const staticPaths = [...configuredPaths];
  const dynamicPaths = sitemap.filter(
    (path) => !configuredPaths.has(path) && discoveredKind(path, expectations),
  );
  const canonicalAliases = manifest
    .map((entry) => ({
      alias: `/${entry.slug}/`,
      canonical: routePath(entry.path),
    }))
    .filter(({ alias, canonical }) => alias !== canonical);
  const aliasesInSitemap = canonicalAliases.filter(({ alias }) =>
    sitemap.includes(alias),
  );
  const aliasPaths = new Set(aliasesInSitemap.map(({ alias }) => alias));
  const unknownSitemapPaths = sitemap.filter(
    (path) =>
      !configuredPaths.has(path) &&
      !discoveredKind(path, expectations) &&
      !aliasPaths.has(path),
  );
  const routePlan = [...staticPaths, ...dynamicPaths].sort().map((path) => ({
    path,
    expectation:
      expectations.routes[path] ?? discoveredKind(path, expectations),
  }));

  const browser = await chromium.launch({ headless: true });
  const results = new Map<string, RouteResult>();
  try {
    for (const { alias, canonical } of aliasesInSitemap) {
      const response = await fetch(`${origin}${alias}`, { redirect: "manual" });
      const location = response.headers.get("location");
      results.set(`(redirect:${alias})`, {
        path: `(redirect:${alias})`,
        kind: "canonical-redirect",
        status:
          response.status === 301 && location === canonical ? "pass" : "fail",
        checks:
          response.status === 301 && location === canonical
            ? []
            : [
                {
                  rule: "canonical-redirect",
                  detail: `${alias} returned ${response.status} with ${location ?? "no location"}, expected 301 to ${canonical}`,
                },
              ],
      });
    }
    for (const colorScheme of ["light", "dark"] as const) {
      for (const viewport of [
        { name: "desktop", width: 1440, height: 1000 },
        { name: "mobile", width: 390, height: 844 },
      ]) {
        const context = await browser.newContext({ colorScheme, viewport });
        const page = await context.newPage();
        for (const { path, expectation } of routePlan) {
          if (!expectation) continue;
          const result = await inspectPage(page, path, expectation);
          const stored: RouteResult = results.get(path) ?? {
            path,
            kind: expectation.kind,
            status: "pass",
            components: result.observed,
            checks: [],
            advisory: [],
          };
          stored.components = result.observed;
          stored.checks?.push(
            ...countMinimum(expectation.required, result.observed).map(
              (issue) => ({
                ...issue,
                detail: `${viewport.name}/${colorScheme}: ${issue.detail}`,
              }),
            ),
          );
          stored.checks?.push(
            ...result.issues.map((issue) => ({
              ...issue,
              detail: `${viewport.name}/${colorScheme}: ${issue.detail}`,
            })),
          );
          stored.advisory?.push(...result.advisory);
          results.set(path, stored);
        }
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  for (const { path, expectation } of routePlan) {
    if (!expectation) continue;
    const result = results.get(path);
    if (!result) continue;
    result.advisory = [...new Set(result.advisory ?? [])];
    if (result.checks?.length) result.status = "fail";
  }

  const discoveredStatuses = ["post", "tag"] as const;
  for (const kind of discoveredStatuses) {
    const hasPublished = dynamicPaths.some(
      (path) =>
        discoveredKind(path, expectations)?.kind ===
        expectations.discovered[kind].kind,
    );
    if (!hasPublished) {
      results.set(`(discovery:${kind})`, {
        path: `(discovery:${kind})`,
        kind: expectations.discovered[kind].kind,
        status: "untested",
        reason: `No published ${kind} URLs were found in the local Ghost sitemap.`,
      });
    }
  }
  for (const path of unknownSitemapPaths) {
    results.set(`(discovery:unknown:${path})`, {
      path: `(discovery:unknown:${path})`,
      kind: "unknown-sitemap-route",
      status: "fail",
      checks: [
        {
          rule: "unknown-sitemap-route",
          detail:
            "This published sitemap URL is outside the canonical page, collection, author, post, and topic contracts.",
        },
      ],
    });
  }

  const routes = [...results.values()].sort((left, right) =>
    left.path.localeCompare(right.path),
  );
  const failures = routes.filter((route) => route.status === "fail");
  const report = {
    generatedAt: new Date().toISOString(),
    origin,
    sourceCoverage: {
      manifestPages: manifest.length,
      configuredManifestPages: manifestPaths.size,
      collectionRoutes: ["/resources/blog/"],
      sitemapUrls: sitemap.length,
      discoveredDynamicRoutes: dynamicPaths,
      canonicalRedirects: aliasesInSitemap,
      unknownSitemapRoutes: unknownSitemapPaths,
      intentionalExemptions: [
        "/privacy-policy/ uses readable prose rather than marketing components.",
      ],
    },
    summary: {
      passed: routes.filter((route) => route.status === "pass").length,
      failed: failures.length,
      untested: routes.filter((route) => route.status === "untested").length,
    },
    routes,
  };
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  if (failures.length) {
    throw new Error(
      `Page component audit failed for ${failures.map((route) => route.path).join(", ")}. Report: ${reportPath}`,
    );
  }
  console.log(
    `Verified reusable components across ${routePlan.length} rendered pages and ${aliasesInSitemap.length} canonical redirects. Report: ${reportPath}`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
