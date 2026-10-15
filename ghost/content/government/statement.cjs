// Renders the Zenphry government capability statement as a one-page A4 PDF.
const { chromium } = require("/Users/ditahk/zenphry/site/node_modules/playwright");
const fs = require("fs");
const path = require("path");

const logo = "data:image/svg+xml;base64," + fs.readFileSync("/Users/ditahk/zenphry/site/ghost/branding/zenphry-publication-logo.svg").toString("base64");
const naics = [
  ["541512", "Computer Systems Design Services"],
  ["541611", "Administrative Management and General Management Consulting Services"],
  ["541618", "Other Management Consulting Services"],
  ["541519", "Other Computer Related Services"],
  ["541613", "Marketing Consulting Services"],
  ["541614", "Process, Physical Distribution, and Logistics Consulting Services"],
];
const info = [
  ["Legal Name", "Zenphry IT Services LLC"], ["UEI", "P8TAY263GD23"], ["CAGE Code", "0EQU0"],
  ["Business Type", "Minority-Owned Small Business (Black-Owned LLC)"], ["SAM Status", "Active"],
  ["CMBL Status", "Approved"], ["State", "Texas"], ["Texas HUB", "Certification in progress"],
];
const services = [
  "Business process redesign and workflow automation", "CRM and enterprise systems modernization",
  "Technology transformation and implementation support", "PMO, project coordination, and execution support",
  "Dashboard, reporting, and decision support systems", "Operational readiness and training enablement",
  "Strategic advisory and management consulting",
];

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=block" rel="stylesheet">
<style>
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; }
body { width: 210mm; height: 297mm; font-family: Inter, sans-serif; color: #27241f; font-size: 9.2pt; line-height: 1.45; }
.top { background: #1a1a1a; color: #fbf8ef; padding: 11mm 13mm 9mm; position: relative; overflow: hidden; }
.top::after { content: ""; position: absolute; right: -40mm; top: -50mm; width: 120mm; height: 120mm; background: radial-gradient(circle, rgba(203,178,106,.22), transparent 65%); }
.top img { height: 11mm; }
.top h1 { font-size: 19pt; font-weight: 800; letter-spacing: -.02em; margin-top: 5mm; }
.top .tag { color: #cbb26a; font-weight: 700; font-size: 10.5pt; margin-top: 1mm; }
.top .contact { color: #c9c1b2; font-size: 8.4pt; margin-top: 3mm; }
.kicker { position: absolute; right: 13mm; top: 12mm; color: #cbb26a; font-size: 7.6pt; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
.grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 8mm; padding: 8mm 13mm 0; }
h2 { font-size: 10.5pt; font-weight: 800; margin: 0 0 2mm; padding-bottom: 1.2mm; border-bottom: 1.5px solid #cbb26a; }
section { margin-bottom: 5.5mm; }
p + p { margin-top: 2mm; }
ul { padding-left: 4mm; }
li { margin: .8mm 0; }
li::marker { color: #a5863c; }
table { width: 100%; border-collapse: collapse; font-size: 8.6pt; }
td { padding: 1.3mm 0; border-bottom: 1px solid #e5dfd1; vertical-align: top; }
td:first-child { color: #69645b; width: 32mm; font-weight: 500; }
.naics td:first-child { width: 16mm; font-weight: 700; color: #27241f; }
.box { background: #f8f5ed; border: 1px solid #e5dfd1; border-left: 3px solid #cbb26a; border-radius: 1.5mm; padding: 3.5mm 4mm; }
.poc strong { font-size: 10pt; }
.foot { position: absolute; bottom: 0; left: 0; right: 0; padding: 4mm 13mm; border-top: 1px solid #e5dfd1; color: #69645b; font-size: 7.6pt; display: flex; justify-content: space-between; }
</style></head><body>
<div class="top"><span class="kicker">Capability Statement</span><img src="${logo}" alt="Zenphry">
<h1>Zenphry IT Services LLC</h1>
<p class="tag">Execution-Led Business Transformation and Systems Modernization</p>
<p class="contact">6160 Warren Parkway, Frisco, Texas 75034 &nbsp;|&nbsp; 469-879-6464 &nbsp;|&nbsp; contact@zenphry.com &nbsp;|&nbsp; zenphry.com</p></div>
<div class="grid"><div>
<section><h2>Who We Are</h2><p>Zenphry IT Services LLC is a minority-owned small business based in Frisco, Texas. We help public sector clients improve operational performance, modernize business systems, and implement practical technology solutions that support mission execution, service delivery, and organizational efficiency.</p><p>We are an execution-focused firm. We do not just deliver strategy. We stay through implementation and make sure the work gets done.</p></section>
<section><h2>Core Services</h2><ul>${services.map((s) => `<li>${s}</li>`).join("")}</ul></section>
<section><h2>Why Zenphry</h2><p>We combine business consulting and technology implementation in one firm. Our clients get a team that understands both the operational problem and the technical solution, without needing to manage two separate vendors. We are responsive, practical, and focused on outcomes that are measurable.</p></section>
<section><h2>Service Area</h2><p>Texas state and local government, with selective remote support and partner-enabled delivery through subcontracting and teaming arrangements.</p></section>
</div><div>
<section><h2>Company Information</h2><table>${info.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}</table></section>
<section><h2>NAICS Codes</h2><table class="naics">${naics.map(([c, d]) => `<tr><td>${c}</td><td>${d}</td></tr>`).join("")}</table></section>
<section><h2>Point of Contact</h2><div class="box poc"><strong>Marvellous Anutumangho</strong><br>Founder<br>469-879-6464<br>contact@zenphry.com</div></section>
</div></div>
<div class="foot"><span>Zenphry IT Services LLC Capability Statement</span><span>zenphry.com/government</span></div>
</body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setContent(html, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  const out = path.join(__dirname, "zenphry-capability-statement.pdf");
  await p.pdf({ path: out, format: "A4", printBackground: true, pageRanges: "1" });
  await p.setViewportSize({ width: 794, height: 1123 });
  await p.screenshot({ path: path.join(__dirname, "statement-preview.png"), fullPage: false });
  console.log("[OK]", out);
  await b.close();
})();
