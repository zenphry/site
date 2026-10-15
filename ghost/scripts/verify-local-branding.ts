import { chromium } from "playwright";

const origin = (process.env.GHOST_LOCAL_URL ?? "http://127.0.0.1:2368").replace(
  /\/$/,
  "",
);

function expect(value: unknown, message: string): asserts value {
  if (!value) throw new Error(message);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    const response = await page.goto(origin, { waitUntil: "domcontentloaded" });
    if (response?.status() !== 200)
      throw new Error("The local homepage did not load");

    const attribute = (selector: string, name: string) =>
      page.locator(selector).getAttribute(name);
    const metadata = {
      icon: await attribute('link[rel="icon"]', "href"),
      logo: await attribute(".site-header .site-brand img", "src"),
      ogImage: await attribute('meta[property="og:image"]', "content"),
      ogTitle: await attribute('meta[property="og:title"]', "content"),
      ogDescription: await attribute(
        'meta[property="og:description"]',
        "content",
      ),
      twitterImage: await attribute('meta[name="twitter:image"]', "content"),
      twitterTitle: await attribute('meta[name="twitter:title"]', "content"),
      twitterDescription: await attribute(
        'meta[name="twitter:description"]',
        "content",
      ),
      twitterSite: await attribute('meta[name="twitter:site"]', "content"),
    };
    expect(
      metadata.icon?.includes("zenphry-icon"),
      "Publication icon is missing",
    );
    expect(
      metadata.logo?.includes("zenphry-publication-logo"),
      "Publication logo is missing",
    );
    expect(
      metadata.ogImage?.includes("zenphry-facebook-card"),
      "Open Graph card is missing",
    );
    expect(
      metadata.twitterImage?.includes("zenphry-x-card"),
      "X card is missing",
    );
    expect(
      metadata.ogTitle ===
        "Zenphry | Business restructuring and transformation" &&
        metadata.twitterTitle ===
          "Zenphry | Business restructuring and transformation",
      "Social titles are incorrect",
    );
    expect(
      metadata.ogDescription ===
        "Business restructuring and transformation for sustainable growth." &&
        metadata.twitterDescription ===
          "Business restructuring and transformation for sustainable growth.",
      "Social descriptions are incorrect",
    );
    expect(metadata.twitterSite === "@zenphry", "X handle is incorrect");

    for (const url of [
      metadata.icon,
      metadata.ogImage,
      metadata.twitterImage,
    ]) {
      expect(url, "A published branding asset URL is missing");
      const asset = await page.request.get(url);
      if (!asset.ok())
        throw new Error(`Published branding asset failed: ${url}`);
      expect(
        asset.headers()["content-type"]?.startsWith("image/"),
        "Branding asset is not an image",
      );
    }
    const box = await page
      .locator(".site-header .site-brand img")
      .boundingBox();
    expect(
      box && box.width <= 172 && box.height <= 40,
      "Header logo dimensions changed",
    );
    await page.screenshot({
      path: "/tmp/zenphry-ghost-branding.png",
      fullPage: false,
    });
    console.log("Verified local publication branding and social metadata.");
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
