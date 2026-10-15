import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Page } from "playwright";

type Login = { url: string; email: string; password: string };
type UploadedImage = { images: Array<{ url: string }> };

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const credentialsPath = resolve(siteRoot, "ghost/.local/admin-login.json");
const brandingDir = resolve(siteRoot, "ghost/branding");

function assertLocalAdminUrl(value: string) {
  const url = new URL(value);
  if (
    url.protocol !== "http:" ||
    !["127.0.0.1", "localhost", "::1"].includes(url.hostname)
  ) {
    throw new Error(
      "This script only permits a loopback HTTP Ghost Admin URL.",
    );
  }
  return url;
}

function assertLocalPageOrigin(page: Page, origin: string) {
  if (new URL(page.url()).origin !== origin) {
    throw new Error("Ghost Admin redirected away from the local instance.");
  }
}

async function upload(page: Page, filename: string, purpose?: "icon") {
  const bytes = await readFile(resolve(brandingDir, filename));
  const result = await page.evaluate(
    async ({ bytes, filename, purpose }) => {
      const form = new FormData();
      form.append(
        "file",
        new File([new Uint8Array(bytes)], filename, {
          type: filename.endsWith(".svg") ? "image/svg+xml" : "image/png",
        }),
      );
      if (purpose) form.append("purpose", purpose);
      const response = await fetch("/ghost/api/admin/images/upload/", {
        method: "POST",
        body: form,
      });
      if (!response.ok) {
        throw new Error(`Image upload failed with ${response.status}`);
      }
      return response.json();
    },
    { bytes: [...bytes], filename, purpose },
  );
  const response = result as UploadedImage;
  const image = response.images?.[0]?.url;
  if (!image) throw new Error(`Ghost did not return a URL for ${filename}`);
  return image;
}

async function main() {
  const login = JSON.parse(await readFile(credentialsPath, "utf8")) as Login;
  const adminUrl = assertLocalAdminUrl(login.url);
  const origin = adminUrl.origin;
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(adminUrl.toString(), { waitUntil: "domcontentloaded" });
    assertLocalPageOrigin(page, origin);
    await page.getByLabel("Email address").fill(login.email);
    await page.getByLabel("Password").fill(login.password);
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.waitForFunction(() => !window.location.hash.includes("signin"));
    assertLocalPageOrigin(page, origin);

    const [logo, icon, ogImage, twitterImage] = await Promise.all([
      upload(page, "zenphry-publication-logo.svg"),
      upload(page, "zenphry-icon.png", "icon"),
      upload(page, "zenphry-facebook-card.png"),
      upload(page, "zenphry-x-card.png"),
    ]);
    const settings = [
      { key: "accent_color", value: "#cbb26a" },
      { key: "logo", value: logo },
      { key: "icon", value: icon },
      { key: "og_image", value: ogImage },
      {
        key: "og_title",
        value: "Zenphry | Business restructuring and transformation",
      },
      {
        key: "og_description",
        value:
          "Business restructuring and transformation for sustainable growth.",
      },
      { key: "twitter_image", value: twitterImage },
      {
        key: "twitter_title",
        value: "Zenphry | Business restructuring and transformation",
      },
      {
        key: "twitter_description",
        value:
          "Business restructuring and transformation for sustainable growth.",
      },
      { key: "twitter", value: "@zenphry" },
      { key: "linkedin", value: "" },
      { key: "facebook", value: "" },
      { key: "timezone", value: "America/Chicago" },
    ];
    const response = await page.evaluate(async (settings) => {
      const result = await fetch("/ghost/api/admin/settings/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      if (!result.ok) {
        throw new Error(`Settings update failed with ${result.status}`);
      }
      return result.json();
    }, settings);
    if (!response || typeof response !== "object") {
      throw new Error("Ghost did not return settings after the update");
    }

    const expected = new Map(settings.map(({ key, value }) => [key, value]));
    const saved = (await page.evaluate(async () => {
      const response = await fetch("/ghost/api/admin/settings/?group=site");
      if (!response.ok)
        throw new Error(`Settings read failed with ${response.status}`);
      return response.json();
    })) as { settings: Array<{ key: string; value: string | null }> };
    const actual = new Map(
      (saved.settings as Array<{ key: string; value: string }>).map(
        ({ key, value }) => [key, value],
      ),
    );
    const normalizeImageUrl = (value: string) =>
      new URL(value.replace("__GHOST_URL__", origin), origin).pathname.replace(
        /\/content\/images\/size\/[^/]+\//,
        "/content/images/",
      );
    for (const [key, value] of expected) {
      const savedValue = actual.get(key);
      const matches = ["logo", "icon", "og_image", "twitter_image"].includes(
        key,
      )
        ? typeof savedValue === "string" &&
          normalizeImageUrl(savedValue) === normalizeImageUrl(value)
        : value === ""
          ? savedValue === "" || savedValue === null
          : savedValue === value;
      if (!matches) {
        throw new Error(`Ghost did not retain the ${key} setting`);
      }
    }
    await page.goto(origin, { waitUntil: "domcontentloaded" });
    const publicationLogo = page.locator(".site-header .site-brand img");
    if ((await publicationLogo.count()) !== 1) {
      throw new Error(
        "The published header did not render the publication logo",
      );
    }
    const logoBox = await publicationLogo.boundingBox();
    if (!logoBox || logoBox.width > 172 || logoBox.height > 40) {
      throw new Error(
        "The publication logo changed the approved header dimensions",
      );
    }
    console.log("Applied and verified local Ghost branding settings.");
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
