import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { chromium } from "playwright";

type ManifestPage = { path: string; slug: string };
type ExportedPage = { title: string; slug: string; meta_title: string };

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const ghostRoot = resolve(siteRoot, "ghost");
const origin = (process.env.GHOST_LOCAL_URL ?? "http://127.0.0.1:2368").replace(
  /\/$/,
  "",
);
const redirects = {
  "/pricing": "/resources/pricing/",
  "/case-studies": "/resources/case-studies/",
  "/case-studies/saas-scaling": "/resources/case-studies/saas-scaling/",
  "/case-studies/founder-bottleneck":
    "/resources/case-studies/founder-bottleneck/",
  "/case-studies/enterprise-alignment":
    "/resources/case-studies/enterprise-alignment/",
  "/how-it-works": "/resources/how-it-works/",
  "/services/foundation": "/services/operational/",
  "/services/enterprise": "/services/organizational/",
  "/services/growth": "/services/scale/",
};

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function routePath(path: string) {
  return path === "/" ? "/" : `${path}/`;
}

function contrastRatio(first: number[], second: number[]) {
  const luminance = (color: number[]) => {
    const channel = color.map((value) => {
      const normalized = value / 255;
      return normalized <= 0.04045
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * channel[0] + 0.7152 * channel[1] + 0.0722 * channel[2];
  };
  const [lighter, darker] = [luminance(first), luminance(second)].sort(
    (left, right) => right - left,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

async function expectResponse(path: string, expectedStatus: number) {
  const response = await fetch(`${origin}${path}`, { redirect: "manual" });
  if (response.status !== expectedStatus) {
    throw new Error(
      `${path} returned ${response.status}, expected ${expectedStatus}`,
    );
  }
  return response;
}

async function main() {
  const manifest = JSON.parse(
    await readFile(resolve(ghostRoot, "content/pages-manifest.json"), "utf8"),
  ) as ManifestPage[];
  const exported = JSON.parse(
    await readFile(
      resolve(ghostRoot, "content/export/zenphry-content.json"),
      "utf8",
    ),
  ) as { data: { posts: ExportedPage[] } };
  const exportedBySlug = new Map(
    exported.data.posts.map((page) => [page.slug, page]),
  );
  if (exportedBySlug.size !== manifest.length) {
    throw new Error(
      `Expected ${manifest.length} exported pages, found ${exportedBySlug.size}`,
    );
  }

  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [
      { name: "desktop", width: 1440, height: 1000 },
      { name: "mobile", width: 390, height: 844 },
    ]) {
      const page = await browser.newPage({ viewport });
      for (const entry of manifest) {
        const path = routePath(entry.path);
        const response = await page.goto(`${origin}${path}`, {
          waitUntil: "domcontentloaded",
        });
        if (response?.status() !== 200)
          throw new Error(`${path} returned ${response?.status()}`);
        const exportedPage = exportedBySlug.get(entry.slug);
        if (!exportedPage) throw new Error(`No export for ${entry.slug}`);
        const title = await page.title();
        if (title !== exportedPage.meta_title) {
          throw new Error(`${path} title was ${JSON.stringify(title)}`);
        }
        const canonical = await page
          .locator('link[rel="canonical"]')
          .getAttribute("href");
        if (canonical !== `${origin}${path}`) {
          throw new Error(`${path} canonical was ${canonical}`);
        }
        const h1 = page.locator("h1");
        if (
          (await h1.count()) !== 1 ||
          normalize(await h1.innerText()) !== normalize(exportedPage.title)
        ) {
          throw new Error(`${path} did not render the imported h1`);
        }
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        );
        if (overflow)
          throw new Error(`${path} overflows the ${viewport.name} viewport`);
      }
      await page.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
      await page.screenshot({
        path: `/tmp/zenphry-ghost-${viewport.name}.png`,
        fullPage: true,
      });
      await page.close();
    }

    const light = await browser.newContext({
      colorScheme: "light",
      viewport: { width: 1440, height: 1000 },
    });
    const home = await light.newPage();
    await home.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
    if ((await home.locator(".site-header").count()) !== 1)
      throw new Error("Homepage shared header is missing");
    if ((await home.locator(".site-footer").count()) !== 1)
      throw new Error("Homepage shared footer is missing");
    if ((await home.locator("[data-theme-toggle]").count()) !== 1)
      throw new Error("Homepage theme toggle is missing");
    if ((await home.locator("[data-site-nav] a").count()) < 3)
      throw new Error("Homepage primary navigation is incomplete");
    const nativeLists = home.locator(".home-introduction .gh-content > ul");
    if ((await nativeLists.nth(0).locator("li").count()) !== 6)
      throw new Error(
        "Homepage does not render its six editable challenge cards",
      );
    if (
      (await home
        .locator(".home-introduction .gh-content > ol > li")
        .count()) !== 5
    )
      throw new Error(
        "Homepage does not render its five editable framework phases",
      );
    if ((await nativeLists.nth(1).locator("li").count()) !== 8)
      throw new Error(
        "Homepage does not render eight editable service durations",
      );
    for (const expected of [
      "Root Cause Report + Priority Matrix",
      "Governance Framework + KPI Dashboard",
      "6–12 weeks. Most Popular.",
      "No long-term contracts.",
    ]) {
      if (
        !(await home.locator(".home-introduction").innerText()).includes(
          expected,
        )
      )
        throw new Error(`Homepage lost editable content: ${expected}`);
    }
    if ((await home.locator(".service-grid .content-card").count()) !== 8)
      throw new Error(
        "Homepage does not render all eight editable service cards",
      );
    const serviceHrefs = await home
      .locator(".service-grid .content-card")
      .evaluateAll((cards) => cards.map((card) => card.getAttribute("href")));
    const expectedServiceHrefs = [
      "/services/diagnostic/",
      "/services/operational/",
      "/services/organizational/",
      "/services/financial/",
      "/services/technology/",
      "/services/scale/",
      "/services/advisory/",
      "/services/private-cloud/",
    ].map((path) => `${origin}${path}`);
    if (
      expectedServiceHrefs.some((href) => !serviceHrefs.includes(href)) ||
      serviceHrefs.some((href) => !expectedServiceHrefs.includes(href ?? ""))
    ) {
      throw new Error("Homepage service cards do not link to canonical routes");
    }
    if ((await home.locator(".newsletter input[type=email]").count()) !== 1)
      throw new Error("Homepage native newsletter signup is missing");
    for (const expected of [
      "6160 Warren Parkway, Frisco, TX 75034",
      "+1 972-362-9878",
      "Zenphry does not provide legal, tax, or bankruptcy advice.",
    ]) {
      if (!(await home.locator(".site-footer").innerText()).includes(expected))
        throw new Error(`Footer lost required content: ${expected}`);
    }
    if (
      (await home
        .locator('.site-footer a[href="https://x.com/zenphry"]')
        .count()) !== 1
    )
      throw new Error("Footer X link is missing");
    if (
      (await home.locator('.site-footer a[href*="linkedin.com"]').count()) !== 0
    )
      throw new Error("Footer still exposes LinkedIn");
    if ((await home.locator("html").getAttribute("data-theme")) !== "light")
      throw new Error("Light system preference did not select the light theme");
    await home.screenshot({
      path: "/tmp/zenphry-ghost-desktop-light.png",
      fullPage: true,
    });
    await home.locator("[data-theme-toggle]").click();
    if ((await home.locator("html").getAttribute("data-theme")) !== "dark")
      throw new Error("Theme toggle did not select dark mode");
    await home.reload({ waitUntil: "domcontentloaded" });
    if ((await home.locator("html").getAttribute("data-theme")) !== "dark")
      throw new Error("Theme preference did not persist after reload");
    await home.goto(`${origin}/services/`, { waitUntil: "domcontentloaded" });
    if ((await home.locator("html").getAttribute("data-theme")) !== "dark")
      throw new Error("Theme preference did not persist between routes");
    const contrast = await home.evaluate(() => {
      const body = getComputedStyle(document.body);
      return { foreground: body.color, background: body.backgroundColor };
    });
    const rgb = (value: string) =>
      value.match(/\d+/g)?.slice(0, 3).map(Number) ?? [];
    const foreground = rgb(contrast.foreground);
    const background = rgb(contrast.background);
    if (
      foreground.length !== 3 ||
      background.length !== 3 ||
      contrastRatio(foreground, background) < 4.5
    ) {
      throw new Error(
        "Dark theme body text does not meet the 4.5:1 contrast check",
      );
    }
    await home.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
    await home.screenshot({
      path: "/tmp/zenphry-ghost-desktop-dark.png",
      fullPage: true,
    });
    await light.close();

    const dark = await browser.newContext({
      colorScheme: "dark",
      viewport: { width: 1440, height: 1000 },
    });
    const darkHome = await dark.newPage();
    await darkHome.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
    if ((await darkHome.locator("html").getAttribute("data-theme")) !== "dark")
      throw new Error("Dark system preference did not select the dark theme");
    await dark.close();

    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const mobile = await mobileContext.newPage();
    await mobile.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
    const menuButton = mobile.locator("[data-nav-toggle]");
    if ((await menuButton.count()) !== 1)
      throw new Error("Mobile menu toggle is missing");
    await menuButton.click();
    if ((await menuButton.getAttribute("aria-expanded")) !== "true")
      throw new Error("Mobile menu did not expose its expanded state");
    if (
      !(await mobile
        .locator("[data-site-nav]")
        .evaluate((nav) => nav.classList.contains("is-open")))
    )
      throw new Error("Mobile navigation did not open");
    const focusedTag = await mobile.evaluate(
      () => document.activeElement?.tagName,
    );
    if (focusedTag !== "A" && focusedTag !== "BUTTON")
      throw new Error(
        "Mobile navigation did not move focus to its first control",
      );
    await mobile.keyboard.press("Escape");
    if ((await menuButton.getAttribute("aria-expanded")) !== "false")
      throw new Error("Escape did not close the mobile menu");
    if (
      !(await menuButton.evaluate(
        (button) => document.activeElement === button,
      ))
    )
      throw new Error("Escape did not return focus to the mobile menu button");
    for (const width of [320, 390]) {
      await mobile.setViewportSize({ width, height: 844 });
      await menuButton.click();
      const overflow = await mobile.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      if (overflow) throw new Error(`Open mobile menu overflows ${width}px`);
      await mobile.keyboard.press("Escape");
    }
    await mobile.screenshot({
      path: "/tmp/zenphry-ghost-mobile-light.png",
      fullPage: true,
    });
    await mobile.close();
    await mobileContext.close();

    const noScript = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const noScriptMobile = await noScript.newPage();
    await noScriptMobile.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
    if (!(await noScriptMobile.locator("[data-site-nav]").isVisible()))
      throw new Error(
        "Primary navigation is unavailable when JavaScript is disabled",
      );
    if (await noScriptMobile.locator("[data-theme-toggle]").isVisible())
      throw new Error("Theme toggle is visible when JavaScript is disabled");
    for (const width of [320, 390]) {
      await noScriptMobile.setViewportSize({ width, height: 844 });
      const overflow = await noScriptMobile.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      if (overflow)
        throw new Error(`No-JavaScript navigation overflows ${width}px`);
    }
    await noScript.close();

    const contact = await browser.newPage();
    await contact.goto(`${origin}/contact/`, { waitUntil: "domcontentloaded" });
    if ((await contact.locator("form[data-contact-form]").count()) !== 1)
      throw new Error("/contact/ native enquiry form is missing");
    if ((await contact.locator('input[name="name"][required]').count()) !== 1)
      throw new Error("/contact/ required name field is missing");
    if (
      (await contact.locator('textarea[name="message"][required]').count()) !==
      1
    )
      throw new Error("/contact/ required message field is missing");
    if ((await contact.locator("iframe").count()) !== 0)
      throw new Error(
        "/contact/ must not render a retired LeadConnector iframe",
      );

    await contact.goto(`${origin}/book-a-call/`, {
      waitUntil: "domcontentloaded",
    });
    if ((await contact.locator("iframe").count()) !== 0)
      throw new Error(
        "/book-a-call/ must not render a retired LeadConnector iframe",
      );
    const bookingFallback = contact.locator('a[href$="/contact/"]');
    if ((await bookingFallback.count()) < 1)
      throw new Error(
        "/book-a-call/ must provide a contact fallback when no booking URL is configured",
      );
    await contact.close();
  } finally {
    await browser.close();
  }

  for (const [source, target] of Object.entries(redirects)) {
    for (const path of [source, `${source}/`]) {
      const redirect = await expectResponse(path, 301);
      if (redirect.headers.get("location") !== target) {
        throw new Error(
          `${path} redirected to ${redirect.headers.get("location")}`,
        );
      }
      await expectResponse(target, 200);
    }
  }
  console.log(
    `Verified ${manifest.length} routes on desktop and mobile, theme and menu interactions, plus ${Object.keys(redirects).length} legacy redirects.`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
