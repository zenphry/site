import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const assetsDir = resolve(siteRoot, "ghost/branding");
const logoPath = resolve(
  siteRoot,
  "ghost/theme/assets/images/zenphry-logo.svg",
);

type Card = {
  filename: string;
  eyebrow: string;
  headline: string;
  description: string;
};

const cards: Card[] = [
  {
    filename: "zenphry-facebook-card.png",
    eyebrow: "BUSINESS RESTRUCTURING AND TRANSFORMATION",
    headline: "Restructure operations. Realign teams. Scale with confidence.",
    description:
      "Operator-led support for businesses ready to realign and grow.",
  },
  {
    filename: "zenphry-x-card.png",
    eyebrow: "ZENPHRY",
    headline: "Restructure operations. Realign teams. Scale with confidence.",
    description:
      "Business restructuring and transformation for sustainable growth.",
  },
];

function documentFor(card: Card, logo: string) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  body { background: #1a1a1a; color: #f8f3e9; font-family: Inter, Arial, sans-serif; }
  .card { position: relative; width: 1200px; height: 630px; padding: 64px 76px; overflow: hidden;
    background: linear-gradient(125deg, #191918 0%, #24231e 58%, #2d2b22 100%); }
  .card::before { content: ""; position: absolute; inset: 0; opacity: .28;
    background-image: linear-gradient(rgba(203,178,106,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(203,178,106,.18) 1px, transparent 1px);
    background-size: 44px 44px; mask-image: linear-gradient(90deg, black, transparent 74%); }
  .card::after { content: ""; position: absolute; width: 700px; height: 700px; border: 1px solid rgba(203,178,106,.42); border-radius: 50%; right: -280px; top: -220px; box-shadow: 0 0 0 36px rgba(203,178,106,.04), 0 0 0 104px rgba(203,178,106,.025); }
  .content { position: relative; z-index: 1; display: flex; height: 100%; flex-direction: column; }
  .logo { width: 224px; height: auto; object-fit: contain; object-position: left center; }
  .eyebrow { margin: auto 0 19px; color: #cbb26a; font-size: 17px; line-height: 1.2; letter-spacing: .12em; font-weight: 700; }
  h1 { width: 820px; margin: 0; font-size: 60px; line-height: 1.06; letter-spacing: -.04em; font-weight: 800; }
  p { width: 680px; margin: 22px 0 0; color: #d5d0c4; font-size: 23px; line-height: 1.35; }
  .rule { width: 84px; height: 5px; margin-top: 38px; background: #cbb26a; }
</style></head><body><main class="card"><div class="content">
  <img class="logo" src="${logo}" alt="Zenphry">
  <div class="eyebrow">${card.eyebrow}</div>
  <h1>${card.headline}</h1><p>${card.description}</p><div class="rule"></div>
</div></main></body></html>`;
}

function iconDocument(logo: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; } html, body { margin: 0; width: 512px; height: 512px; overflow: hidden; }
    body { display: grid; place-items: center; background: #1a1a1a; }
    .icon { position: relative; display: grid; place-items: center; width: 512px; height: 512px; overflow: hidden;
      background: radial-gradient(circle at 50% 35%, #393421, #1a1a1a 69%); }
    .mark { position: relative; width: 380px; height: 380px; overflow: hidden; }
    img { position: absolute; top: 0; left: 0; width: 1216px; height: auto; max-width: none; }
  </style></head><body><div class="icon"><div class="mark"><img src="${logo}" alt="Zenphry"></div></div></body></html>`;
}

async function main() {
  const logo = `data:image/svg+xml;base64,${(await readFile(logoPath)).toString("base64")}`;
  await mkdir(assetsDir, { recursive: true });
  await writeFile(
    resolve(assetsDir, "zenphry-publication-logo.svg"),
    await readFile(logoPath),
  );

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
    });
    for (const card of cards) {
      await page.setContent(documentFor(card, logo));
      await page.screenshot({
        path: resolve(assetsDir, card.filename),
        type: "png",
      });
    }
    await page.setViewportSize({ width: 512, height: 512 });
    await page.setContent(iconDocument(logo));
    await page.screenshot({
      path: resolve(assetsDir, "zenphry-icon.png"),
      type: "png",
    });
  } finally {
    await browser.close();
  }
  console.log(`Generated Zenphry branding assets in ${assetsDir}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
