import { createHash, randomInt } from "node:crypto";
import { spawn } from "node:child_process";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { chromium, type Page as BrowserPage } from "playwright";

type ManifestPage = { path: string; slug: string };
type AccordionAnswer = { question: string; answer: string };
type FrameworkPhase = {
  phase: string;
  summary: string;
  detail: string;
  timeline: string;
  deliverable: string;
};

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const ghostRoot = resolve(siteRoot, "ghost");
const semanticizerPath = resolve(
  ghostRoot,
  "scripts/semanticize-imported-content.js",
);
const marketingGroupNormalizerPath = resolve(
  ghostRoot,
  "scripts/normalize-marketing-groups.js",
);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, ".000Z");
const frameworkPhases = [
  "Diagnose",
  "Stabilize",
  "Redesign",
  "Implement",
  "Sustain",
];
const homeIntroduction = `<p>Zenphry helps operators identify and fix the operational, organizational, financial, and technology constraints that hold businesses back.</p>
<p>For operators scaling $1M–$50M businesses. Trusted by 40+ operators across technology, healthcare, and services.</p>
<p><strong>40+ engagements completed.</strong> <strong>5-Phase proprietary framework.</strong> <strong>$2M+ capacity recovered.</strong></p>
<p>Explore <a href="/services/">our restructuring services</a> or <a href="/book-a-call/">book a call</a> to discuss the next step.</p>
<h2>Does this sound like your business?</h2>
<ul>
  <li><a href="/services/diagnostic/"><strong>Declining performance</strong><br>Results are slipping but the root causes are not clear.</a></li>
  <li><a href="/services/operational/"><strong>No operational visibility</strong><br>Leadership cannot see what is happening on the ground.</a></li>
  <li><a href="/services/organizational/"><strong>Unclear roles and accountability</strong><br>Ownership gaps create friction and slow down execution.</a></li>
  <li><a href="/services/scale/"><strong>Growth has become chaotic</strong><br>What worked before is no longer enough for the next stage.</a></li>
  <li><a href="/services/organizational/"><strong>Founder bottlenecks</strong><br>The business cannot move faster than decisions can be made.</a></li>
  <li><a href="/services/technology/"><strong>Technology is slowing execution</strong><br>Teams work around systems instead of being supported by them.</a></li>
</ul>
<h2>The Zenphry Framework</h2>
<ol>
  <li><strong>Diagnose</strong><br>Identify root causes. Timeline: 1–2 weeks. Deliverable: Root Cause Report + Priority Matrix.</li>
  <li><strong>Stabilize</strong><br>Reduce chaos. Timeline: 2–3 weeks. Deliverable: Stabilization Plan + Quick Win Log.</li>
  <li><strong>Redesign</strong><br>Build new models. Timeline: 3–4 weeks. Deliverable: Operating Model Blueprint.</li>
  <li><strong>Implement</strong><br>Execute changes. Timeline: 4–8 weeks. Deliverable: Implementation Tracker + Team Playbooks.</li>
  <li><strong>Sustain</strong><br>Lock in results. Timeline: 2–4 weeks. Deliverable: Governance Framework + KPI Dashboard.</li>
</ol>
<h2>Engagement timing</h2>
<ul>
  <li><strong>Restructuring Diagnostic</strong><br>2–3 weeks</li>
  <li><strong>Operational Restructuring</strong><br>6–12 weeks. Most Popular.</li>
  <li><strong>Organizational &amp; Team</strong><br>4–8 weeks</li>
  <li><strong>Financial Execution</strong><br>4–6 weeks</li>
  <li><strong>Technology &amp; Systems</strong><br>4–10 weeks</li>
  <li><strong>White-Label Private Cloud</strong><br>Scoped</li>
  <li><strong>Growth &amp; Scale Readiness</strong><br>6–10 weeks</li>
  <li><strong>Growth Advisory</strong><br>Ongoing</li>
</ul>
<p>Book a discovery call or request the Restructuring Diagnostic to identify what needs to change. No long-term contracts.</p>`;

function pageId(slug: string) {
  const hash = createHash("sha256")
    .update(`zenphry-ghost-page:${slug}`)
    .digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-5${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}

function getBaseUrl() {
  if (process.env.LEGACY_SITE_URL) {
    const url = new URL(process.env.LEGACY_SITE_URL);
    if (!["127.0.0.1", "localhost", "::1"].includes(url.hostname))
      throw new Error("LEGACY_SITE_URL must point to a loopback legacy site");
    return url.origin;
  }
  return `http://127.0.0.1:${randomInt(30000, 50000)}`;
}

async function waitForServer(url: string, child: ReturnType<typeof spawn>) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (child.exitCode !== null)
      throw new Error(`Legacy server exited with ${child.exitCode}`);
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // The development server is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 500));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function captureAccordionAnswers(page: BrowserPage) {
  const answers: AccordionAnswer[] = [];
  const triggers = page.locator("button[data-radix-collection-item]");
  const count = await triggers.count();
  for (let index = 0; index < count; index += 1) {
    const trigger = triggers.nth(index);
    const question = (await trigger.innerText()).trim();
    await trigger.click();
    const answer = await trigger.evaluate((button) => {
      const item = button.closest("div[data-state][data-orientation]");
      return item?.querySelector('[role="region"]')?.textContent?.trim() ?? "";
    });
    if (question && answer) answers.push({ question, answer });
  }
  return answers;
}

async function captureFramework(page: BrowserPage) {
  const phases: FrameworkPhase[] = [];
  for (const [index, phase] of frameworkPhases.entries()) {
    const phaseContainer = page
      .getByRole("heading", { level: 3, name: phase, exact: true })
      .locator("xpath=..");
    const summary = (await phaseContainer.locator("p").innerText()).trim();
    const trigger = phaseContainer.getByRole("button");
    await trigger.click();
    const details = page
      .getByRole("heading", {
        level: 4,
        name: `Phase ${index + 1}: ${phase}`,
        exact: true,
      })
      .locator("xpath=..");
    const captured = await details.evaluate((element) => {
      const fields = Array.from(
        element.querySelectorAll(":scope > div > div"),
      ).map((field) => field.textContent?.trim() ?? "");
      return {
        detail: element.querySelector("p")?.textContent?.trim() ?? "",
        timeline:
          fields
            .find((field) => field.startsWith("Timeline:"))
            ?.replace(/^Timeline:\s*/, "") ?? "",
        deliverable:
          fields
            .find((field) => field.startsWith("Deliverable:"))
            ?.replace(/^Deliverable:\s*/, "") ?? "",
      };
    });
    if (!captured.detail || !captured.timeline || !captured.deliverable)
      throw new Error(`Could not capture the ${phase} framework phase`);
    phases.push({ phase, summary, ...captured });
  }
  return phases;
}

async function extractPage(
  page: BrowserPage,
  framework: FrameworkPhase[] = [],
  semanticizerSource: string,
  marketingGroupNormalizerSource: string,
) {
  const accordions = await captureAccordionAnswers(page);
  return page.evaluate(
    ({
      accordionAnswers,
      capturedFramework,
      semanticizerSource,
      marketingGroupNormalizerSource,
    }) => {
      const main = document.querySelector("main");
      if (!main) throw new Error("No main element was rendered");
      const heading =
        main.querySelector("h1")?.innerText.trim() || document.title;
      const title = document.title.trim() || heading;
      const description =
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") || "";
      const importedMain = main.cloneNode(true) as HTMLElement;
      const answers = new Map(
        accordionAnswers.map(({ question, answer }) => [question, answer]),
      );

      for (const trigger of importedMain.querySelectorAll(
        "button[data-radix-collection-item]",
      )) {
        const question = trigger.textContent?.trim() ?? "";
        const answer = answers.get(question);
        const item = trigger.closest("div[data-state][data-orientation]");
        if (!answer || !item) continue;
        const questionHeading = document.createElement("h3");
        questionHeading.textContent = question;
        const answerParagraph = document.createElement("p");
        answerParagraph.textContent = answer;
        item.outerHTML = `${questionHeading.outerHTML}${answerParagraph.outerHTML}`;
      }

      if (capturedFramework.length) {
        const frameworkHeading = Array.from(
          importedMain.querySelectorAll("h2"),
        ).find(
          (element) => element.textContent?.trim() === "The Zenphry Framework",
        );
        const frameworkSection = frameworkHeading?.closest("section");
        if (!frameworkSection)
          throw new Error("Could not locate the Zenphry Framework section");
        const replacement = document.createElement("section");
        const replacementHeading = document.createElement("h2");
        replacementHeading.textContent = "The Zenphry Framework";
        replacement.appendChild(replacementHeading);
        for (const phase of capturedFramework) {
          const phaseHeading = document.createElement("h3");
          phaseHeading.textContent = phase.phase;
          const summary = document.createElement("p");
          summary.textContent = phase.summary;
          const detail = document.createElement("p");
          detail.textContent = phase.detail;
          const timeline = document.createElement("p");
          timeline.textContent = `Timeline: ${phase.timeline}`;
          const deliverable = document.createElement("p");
          deliverable.textContent = `Deliverable: ${phase.deliverable}`;
          replacement.appendChild(phaseHeading);
          replacement.appendChild(summary);
          replacement.appendChild(detail);
          replacement.appendChild(timeline);
          replacement.appendChild(deliverable);
        }
        frameworkSection.replaceWith(replacement);
      }

      new Function(
        "importedMain",
        `${semanticizerSource}\n${marketingGroupNormalizerSource}\n_semanticizeImportedMain(importedMain);\n_normalizeMarketingGroups(importedMain);`,
      )(importedMain);

      importedMain
        .querySelectorAll(
          "script, style, svg, iframe, noscript, nav, input, textarea, select",
        )
        .forEach((element) => element.remove());
      importedMain
        .querySelectorAll("h1")
        .forEach((element) => element.remove());
      if (heading === "Get in Touch") {
        importedMain.querySelectorAll("h2, h3, p").forEach((element) => {
          if (element.textContent?.trim() === "Contact Form") element.remove();
        });
      }
      importedMain.querySelectorAll("button").forEach((button) => {
        const label = button.textContent?.trim() ?? "";
        if (/^book(?: a)? call$/i.test(label)) {
          const link = document.createElement("a");
          link.href = "/book-a-call/";
          link.textContent = label;
          button.replaceWith(link);
        } else button.remove();
      });
      importedMain
        .querySelectorAll("[hidden]")
        .forEach((element) => element.remove());
      importedMain.querySelectorAll("*").forEach((element) => {
        for (const attribute of Array.from(element.attributes)) {
          if (element.tagName === "A" && attribute.name === "href") continue;
          if (
            element.tagName === "IMG" &&
            ["src", "alt"].includes(attribute.name)
          )
            continue;
          element.removeAttribute(attribute.name);
        }
      });

      const blockTags = new Set([
        "DIV",
        "SECTION",
        "ARTICLE",
        "ASIDE",
        "HEADER",
        "FOOTER",
        "UL",
        "OL",
        "LI",
        "H2",
        "H3",
        "H4",
        "P",
        "TABLE",
        "FIGURE",
        "BLOCKQUOTE",
      ]);
      for (const element of Array.from(
        importedMain.querySelectorAll("div, span"),
      )) {
        if (element.tagName === "SPAN") {
          element.replaceWith(...Array.from(element.childNodes));
        } else if (
          !Array.from(element.children).some((child) =>
            blockTags.has(child.tagName),
          ) &&
          element.textContent?.trim()
        ) {
          const paragraph = document.createElement("p");
          paragraph.replaceChildren(...Array.from(element.childNodes));
          element.replaceWith(paragraph);
        }
      }
      // Legacy service pages sometimes retain a visual wrapper around a set of
      // short paragraphs after the first semantic pass. Convert only repeated
      // paragraph rows that follow an introductory paragraph into native lists.
      // This keeps the surrounding narrative editable as normal paragraphs.
      for (const group of Array.from(importedMain.querySelectorAll("div"))) {
        const previous = group.previousElementSibling;
        const previousIsIntroduction =
          previous?.tagName === "P" ||
          (previous?.children.length === 1 &&
            previous.firstElementChild?.tagName === "P");
        if (!previousIsIntroduction) continue;
        const rows = Array.from(group.children).filter((row) =>
          row.textContent?.trim(),
        );
        if (rows.length < 2) continue;
        const paragraphs = rows.map((row) => {
          if (row.tagName === "P") return row;
          return row.children.length === 1 &&
            row.firstElementChild?.tagName === "P"
            ? row.firstElementChild
            : null;
        });
        if (paragraphs.some((paragraph) => !paragraph)) continue;
        const list = document.createElement("ul");
        for (const paragraph of paragraphs) {
          if (!paragraph) continue;
          const item = document.createElement("li");
          while (paragraph.firstChild) item.appendChild(paragraph.firstChild);
          list.appendChild(item);
        }
        group.replaceWith(list);
      }
      importedMain
        .querySelectorAll("div, section, article, aside, header, footer, p, li")
        .forEach((element) => {
          if (
            !element.textContent?.trim() &&
            !element.querySelector("img, hr, br")
          )
            element.remove();
        });
      importedMain.querySelectorAll("a + a").forEach((link) => {
        link.insertAdjacentText("beforebegin", " ");
      });
      return { heading, title, description, html: importedMain.innerHTML };
    },
    {
      accordionAnswers: accordions,
      capturedFramework: framework,
      semanticizerSource,
      marketingGroupNormalizerSource,
    },
  );
}

async function main() {
  const pages = JSON.parse(
    await readFile(resolve(ghostRoot, "content/pages-manifest.json"), "utf8"),
  ) as ManifestPage[];
  const [semanticizerSource, marketingGroupNormalizerSource] =
    await Promise.all([
      readFile(semanticizerPath, "utf8"),
      readFile(marketingGroupNormalizerPath, "utf8"),
    ]);
  const startsLocalServer = !process.env.LEGACY_SITE_URL;
  const baseUrl = getBaseUrl();
  const server = startsLocalServer
    ? spawn(
        "npm",
        [
          "run",
          "dev",
          "--",
          "--host",
          "127.0.0.1",
          "--port",
          new URL(baseUrl).port,
          "--strictPort",
        ],
        { cwd: siteRoot, stdio: "ignore", detached: true },
      )
    : undefined;
  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
  try {
    if (server) await waitForServer(baseUrl, server);
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const posts = [];
    for (const entry of pages) {
      const response = await page.goto(`${baseUrl}${entry.path}`, {
        waitUntil: "domcontentloaded",
      });
      if (!response?.ok())
        throw new Error(
          `${entry.path} returned ${response?.status() ?? "no status"}`,
        );
      await page.locator("main").waitFor({ state: "attached" });
      const framework = entry.path === "/" ? await captureFramework(page) : [];
      const document = await extractPage(
        page,
        framework,
        semanticizerSource,
        marketingGroupNormalizerSource,
      );
      const html = entry.slug === "home" ? homeIntroduction : document.html;
      posts.push({
        id: pageId(entry.slug),
        title: document.heading,
        meta_title: document.title,
        slug: entry.slug,
        html,
        meta_description: document.description || null,
        type: "page",
        status: "published",
        visibility: "public",
        created_at: now,
        updated_at: now,
        published_at: now,
      });
    }
    await mkdir(resolve(ghostRoot, "content/export"), { recursive: true });
    await writeFile(
      resolve(ghostRoot, "content/export/zenphry-content.json"),
      `${JSON.stringify({ meta: { exported_on: Date.now(), version: "6.69.0" }, data: { posts, tags: [] } }, null, 2)}\n`,
    );
    console.log(
      `Exported ${posts.length} editable Ghost pages to ghost/content/export/zenphry-content.json`,
    );
  } finally {
    await browser?.close();
    if (server && !server.killed && server.pid)
      process.kill(-server.pid, "SIGTERM");
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
