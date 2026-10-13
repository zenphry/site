import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

type ExportedPage = {
  id: string;
  slug: string;
  title: string;
  meta_title: string | null;
  type: string;
  meta_description: string | null;
  html: string;
};
const ghostRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function page(pages: ExportedPage[], slug: string) {
  const result = pages.find((candidate) => candidate.slug === slug);
  if (!result) throw new Error(`Ghost export is missing ${slug}`);
  return result;
}
function requireText(html: string, expected: string, description = expected) {
  if (!html.includes(expected)) throw new Error(`Export lost ${description}`);
}

async function main() {
  const [raw, manifestRaw] = await Promise.all([
    readFile(resolve(ghostRoot, "content/export/zenphry-content.json"), "utf8"),
    readFile(resolve(ghostRoot, "content/pages-manifest.json"), "utf8"),
  ]);
  const exportData = JSON.parse(raw) as { data?: { posts?: ExportedPage[] } };
  const manifest = JSON.parse(manifestRaw) as Array<{ slug: string }>;
  const posts = exportData.data?.posts;
  if (!posts?.length) throw new Error("Ghost export contains no pages");
  if (posts.length !== manifest.length)
    throw new Error(
      `Expected ${manifest.length} pages, received ${posts.length}`,
    );
  if (new Set(posts.map((post) => post.slug)).size !== posts.length)
    throw new Error("Ghost export has duplicate slugs");
  if (new Set(posts.map((post) => post.id)).size !== posts.length)
    throw new Error("Ghost export has duplicate IDs");
  for (const post of posts) {
    if (post.type !== "page")
      throw new Error(`${post.slug} is not a Ghost page`);
    if (!post.title || !post.meta_title)
      throw new Error(`${post.slug} is missing title metadata`);
    if (/<(?:button|script|svg|iframe)\b/i.test(post.html))
      throw new Error(
        `${post.slug} still includes a React-only control or embed`,
      );
    if (/<h1\b/i.test(post.html))
      throw new Error(`${post.slug} duplicates the Ghost page title`);
  }
  const home = page(posts, "home");
  for (const expected of [
    "operational, organizational, financial, and technology constraints",
    'href="/services/"',
    'href="/book-a-call/"',
    "Does this sound like your business?",
    "Root Cause Report + Priority Matrix",
    "Governance Framework + KPI Dashboard",
    "Restructuring Diagnostic",
    "2–3 weeks",
    "Operational Restructuring",
    "6–12 weeks. Most Popular.",
    "Growth Advisory",
    "Ongoing",
    "No long-term contracts.",
  ])
    requireText(home.html, expected, `homepage content: ${expected}`);
  const faq = page(posts, "resources-faq");
  requireText(
    faq.html,
    "Does Zenphry provide accounting, tax, or legal services?",
    "a hidden FAQ question",
  );
  requireText(
    faq.html,
    "We do not provide accounting, tax advisory, legal, or investment services.",
    "its adjacent FAQ answer",
  );
  const operational = page(posts, "services-operational");
  requireText(
    operational.html,
    "How do you handle resistance to process changes?",
    "service FAQ question",
  );
  requireText(
    operational.html,
    "Change resistance is expected and planned for.",
    "service FAQ answer",
  );
  const services = page(posts, "services");
  const serviceHeadings = services.html.match(/<h3>/g) ?? [];
  if (serviceHeadings.length !== 8)
    throw new Error(
      `Services catalog has ${serviceHeadings.length} cards, expected 8`,
    );
  for (const expected of [
    "<h3>Restructuring Diagnostic</h3><p>2-3 weeks</p><p><strong>Who it is for:</strong> All businesses needing clarity</p>",
    '<p><a href="/services/diagnostic">Get the Diagnostic</a></p>',
    '<p><a href="/services/advisory">Learn More</a></p>',
  ])
    requireText(
      services.html,
      expected,
      `service catalog content: ${expected}`,
    );
  if (/<li\b[^>]*>.*?<h3\b/i.test(services.html))
    throw new Error("Services catalog still nests card content in list items");
  const financial = page(posts, "services-financial");
  for (const expected of [
    "<h2>What This Service Is Not</h2><p>To be explicit and transparent, Zenphry does not provide:</p><ul>",
    "<li>Accounting services</li>",
    "<li>Insolvency or legal services</li>",
    "<h2>Who This Service Is For</h2><p>This service is designed for organizations that:</p><ul>",
    "<li>Experience margin erosion without clear explanation</li>",
    "<h2>What Zenphry Actually Does</h2><p>Zenphry delivers Financial Execution Discipline across six execution pillars.</p><h3>Cost and Spend Visibility Mapping</h3><ul>",
    "<h3>Behavior and Decision Reinforcement</h3><ul>",
    "<li>Ensure new processes are adopted</li>",
  ])
    requireText(
      financial.html,
      expected,
      `financial service content: ${expected}`,
    );
  if ((financial.html.match(/<h3>/g) ?? []).length !== 6)
    throw new Error(
      "Financial service should expose six editable pillar headings",
    );
  if ((financial.html.match(/<li>/g) ?? []).length !== 35)
    throw new Error(
      "Financial service should retain 5 exclusions, 6 audience items, and 24 actions",
    );
  const diagnostic = page(posts, "services-diagnostic");
  for (const expected of [
    "<h2>What You Get</h2><ul>",
    "<li>Business health assessment</li>",
    "<li>Clear next steps</li>",
    "<h2>How It Works</h2><ol>",
    "<li><strong>Week 1</strong><br>Data gathering, interviews, workflow observation</li>",
    "<h2>Timeline &amp; Engagement</h2><ul>",
    "<strong>Duration</strong><br>2-3 weeks",
  ])
    requireText(diagnostic.html, expected, `diagnostic structure: ${expected}`);
  const solution = page(posts, "solution-education-private-cloud");
  requireText(
    solution.html,
    "<h2>What Zenphry Delivers</h2><ul>",
    "solution deliverables list",
  );
  requireText(
    solution.html,
    "<li><strong>Backup and recovery</strong>",
    "solution use-case boundary",
  );
  const framework = page(posts, "resources-how-it-works");
  for (const expected of [
    "<h3>Diagnose</h3><p>Identify root causes of inefficiency and execution breakdown</p><p><strong>Deliverables:</strong></p><ul>",
    "<li>• Business health assessment</li>",
    "<p><strong>Typical Timeline:</strong></p><p>1-3 weeks</p>",
    "<h3>Sustain</h3>",
    "<p><strong>Typical Timeline:</strong></p><p>Ongoing</p>",
  ])
    requireText(framework.html, expected, `framework content: ${expected}`);
  if ((framework.html.match(/<h3>/g) ?? []).length !== 5)
    throw new Error("Framework should expose five editable phase headings");
  const technology = page(posts, "services-technology");
  for (const expected of [
    "<h3>Systems and Tool Assessment</h3><ul>",
    "<p>Technologies Reviewed</p><ul><li>CRM platforms</li>",
    "<h3>Cloud Infrastructure and Virtual Private Servers</h3><ul>",
    "<p>Cloud Platforms</p><ul><li>Amazon Web Services (AWS)</li>",
  ])
    requireText(
      technology.html,
      expected,
      `technology service content: ${expected}`,
    );
  const caseStudy = page(posts, "case-study-saas-scaling");
  requireText(
    caseStudy.html,
    "<h2>What Zenphry Did</h2><ol>",
    "case-study numbered steps",
  );
  requireText(
    caseStudy.html,
    "<li>Implemented weekly operations review cadence</li>",
    "case-study fourth step",
  );
  const faqPage = page(posts, "resources-faq");
  if ((faqPage.html.match(/<h2>/g) ?? []).length !== 5)
    throw new Error("FAQ category headings were flattened");
  const pricing = page(posts, "resources-pricing");
  for (const expected of [
    "<h3>Diagnostic</h3><p>2-3 weeks</p><p>Starting point</p>",
    "<h3>What is included:</h3><ul><li>Business health assessment</li>",
    "<h3>What is NOT included:</h3><ul><li>• Implementation</li>",
  ])
    requireText(pricing.html, expected, `flat pricing content: ${expected}`);
  if (/<li\b[^>]*>[^<]*<(?:p|h[1-6]|ul|ol)\b/i.test(pricing.html))
    throw new Error("Pricing still nests rich blocks inside list items");
  const caseStudies = page(posts, "resources-case-studies");
  for (const expected of [
    "<h3>SaaS Company Scaling Challenges</h3><p>Software (SaaS)</p>",
    "<h3>Situation:</h3><p>Rapid growth led to operational chaos",
    "<h3>Outcome:</h3><p>40% reduction in support tickets",
  ])
    requireText(
      caseStudies.html,
      expected,
      `flat case-study content: ${expected}`,
    );

  const whatWeDo = page(posts, "about-what-we-do");
  requireText(
    whatWeDo.html,
    "<h2>What We Do Not Do</h2>",
    "what-we-do exclusions heading",
  );
  requireText(
    whatWeDo.html,
    "<ul><li>— We do not deliver slide decks and walk away.",
    "what-we-do grouped exclusion statement",
  );
  if (/<p>\s*[—–-]\s*<\/p>/.test(whatWeDo.html))
    throw new Error("What We Do still exports detached marker paragraphs");

  const thankYou = page(posts, "thank-you");
  requireText(
    thankYou.html,
    "<ol><li>You will receive a confirmation email shortly</li>",
    "thank-you semantic first step",
  );
  if (/<li>\d+(?:You|Our|We)\b/.test(thankYou.html))
    throw new Error("Thank-you still includes duplicated decorative ordinals");
  console.log(`Verified ${posts.length} structured, editable Ghost pages.`);
}
main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
