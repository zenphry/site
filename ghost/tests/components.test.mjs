import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { Window } from "happy-dom";

const siteScript = await readFile(
  new URL("../theme/assets/js/site.js", import.meta.url),
  "utf8",
);

function render(pathname, content) {
  const window = new Window({ url: `https://zenphry.test${pathname}` });
  window.document.body.innerHTML = content;
  window.eval(siteScript);
  const enhanced = window.document.body.innerHTML;
  window.eval(siteScript);
  assert.equal(window.document.body.innerHTML, enhanced);
  return window.document;
}

function serviceBlock(title, href) {
  return `<h3>${title}</h3><p>Duration</p><p>Audience</p><p>Description</p><p><a href="${href}">Learn more</a></p>`;
}

test("builds an eight-card services catalog only once", () => {
  const content = Array.from({ length: 8 }, (_, index) =>
    serviceBlock(`Service ${index + 1}`, `/services/${index + 1}/`),
  ).join("");
  const document = render(
    "/services/",
    `<article class="content-page"><div class="page-content">${content}<h2>Start here</h2><p>Copy</p></div></article>`,
  );

  assert.equal(
    document.querySelectorAll(".component-catalog .component-card").length,
    8,
  );
  assert.equal(document.querySelectorAll(".component-catalog a").length, 8);
  assert.equal(document.querySelectorAll(".component-section").length, 1);
});

test("closes the mobile navigation when a nested link element is clicked", () => {
  const document = render(
    "/",
    `<button data-nav-toggle aria-expanded="false"></button><nav data-site-nav><a href="/services/"><span>Services</span><svg><path></path></svg></a></nav>`,
  );
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-site-nav]");

  toggle.click();
  nav
    .querySelector("path")
    .dispatchEvent(
      new document.defaultView.MouseEvent("click", { bubbles: true }),
    );

  assert.equal(nav.classList.contains("is-open"), false);
  assert.equal(toggle.getAttribute("aria-expanded"), "false");
});

test("keeps FAQ introductions and trailing CTAs outside collapsed answers", () => {
  const document = render(
    "/resources/faq/",
    `<article class="content-page"><div class="page-content"><h2 id="about">About Zenphry</h2><p>Category introduction.</p><h3 id="question-one">Question one?</h3><p>Answer one.</p><h3 id="question-two">Question two?</h3><p>Answer two.</p><p><a href="/contact/">Discuss this solution</a></p></div></article>`,
  );
  const section = document.querySelector(".component-faq");
  const children = Array.from(section.children);

  assert.equal(children[0].tagName, "H2");
  assert.equal(children[1].textContent, "Category introduction.");
  assert.equal(children[2].className, "component-accordion");
  assert.equal(children[3].className, "component-cta");
  assert.equal(section.querySelectorAll("details").length, 2);
  assert.equal(
    section.querySelector("summary#question-one").textContent,
    "Question one?",
  );
  assert.equal(section.querySelector("details a"), null);
});

test("keeps formatted Ghost CTAs outside FAQ details", () => {
  const document = render(
    "/resources/faq/",
    `<article class="content-page"><div class="page-content"><h2 id="faq">Questions</h2><h3>Question?</h3><p>Answer.</p><p><strong><a href="/contact/">Discuss this</a></strong></p></div></article>`,
  );
  const section = document.querySelector(".component-faq");

  assert.equal(section.querySelector("details a"), null);
  assert.equal(
    section.querySelector(".component-cta a").textContent,
    "Discuss this",
  );
  assert.equal(
    section.querySelector(".component-cta strong").tagName,
    "STRONG",
  );
});

test("does not classify a link beside non-link media as a CTA", () => {
  const document = render(
    "/resources/faq/",
    `<article class="content-page"><div class="page-content"><h2 id="faq">Questions</h2><h3>Question?</h3><p>Answer.</p><p><a href="/contact/">Discuss this</a><img src="/image.png" alt="" /></p></div></article>`,
  );

  assert.equal(document.querySelector(".component-cta"), null);
  assert.ok(document.querySelector("details img"));
});

test("classifies a final not token as an exclusion list without duplicate markers", () => {
  const document = render(
    "/services/financial/",
    `<article class="service-page"><div class="page-content"><h2 id="what-this-service-is-not">What this service is not</h2><ul><li>• Accounting services</li><li>• Tax advisory</li></ul></div></article>`,
  );

  assert.ok(document.querySelector(".component-exclusions"));
  assert.equal(document.querySelector(".component-checklist"), null);
  assert.ok(document.querySelector(".component-literal-markers"));
});

test("does not mistake pricing-like pre-section headings for a service catalog", () => {
  const document = render(
    "/resources/pricing/",
    `<article class="content-page"><div class="page-content"><h3>Foundation</h3><p>Tier details</p><h3>What is included</h3><ul><li>One item</li></ul><h3>Growth</h3><p>Tier details</p><h2>Next section</h2></div></article>`,
  );

  assert.equal(document.querySelector(".component-catalog"), null);
});

test("wraps five top-level H3 and list phases as an ordered component", () => {
  const phases = Array.from(
    { length: 5 },
    (_, index) =>
      `<h3>Week ${index + 1}</h3><p>Phase summary</p><p><strong>Deliverables</strong></p><ul><li>Deliverable one</li><li>Deliverable two</li></ul>`,
  ).join("");
  const document = render(
    "/resources/how-it-works/",
    `<article class="content-page"><div class="page-content">${phases}</div></article>`,
  );
  const pillars = document.querySelector(".component-pillars");

  assert.equal(pillars.tagName, "OL");
  assert.ok(pillars.classList.contains("component-list-steps") === false);
  assert.equal(
    pillars.querySelectorAll(":scope > li.component-pillar").length,
    5,
  );
  assert.equal(pillars.querySelectorAll("h3").length, 5);
});

test("keeps the next H2 section outside the final top-level phase", () => {
  const phases = Array.from(
    { length: 5 },
    (_, index) =>
      `<h3>Week ${index + 1}</h3><p>Phase summary</p><ul><li>Deliverable</li></ul>`,
  ).join("");
  const document = render(
    "/resources/how-it-works/",
    `<article class="content-page"><div class="page-content">${phases}<h2 id="governance">Governance</h2><p>Governance copy.</p><p><a href="/contact/">Discuss</a></p></div></article>`,
  );
  const content = document.querySelector(".page-content");
  const pillars = content.querySelector(".component-pillars");
  const governance = content.querySelector(":scope > .component-section");

  assert.ok(governance);
  assert.equal(governance.querySelector("h2").id, "governance");
  assert.equal(pillars.contains(governance), false);
});

test("wraps six H3 and list groups beneath a service section", () => {
  const groups = Array.from(
    { length: 6 },
    (_, index) =>
      `<h3>Pillar ${index + 1}</h3><p>Summary</p><ul><li>Action one</li><li>Action two</li></ul>`,
  ).join("");
  const document = render(
    "/services/technology/",
    `<article class="service-page"><div class="page-content"><h2 id="what-zenphry-delivers">What Zenphry delivers</h2><p>Intro.</p>${groups}</div></article>`,
  );

  assert.equal(
    document.querySelectorAll(".component-section .component-pillars > li")
      .length,
    6,
  );
  assert.equal(
    document.querySelector(".component-section.component-steps"),
    null,
  );
});

test("does not reclassify financial pillars as steps", () => {
  const groups = Array.from(
    { length: 6 },
    (_, index) =>
      `<h3>Pillar ${index + 1}</h3><ul><li>Action one</li><li>Action two</li></ul>`,
  ).join("");
  const document = render(
    "/services/financial/",
    `<article class="service-page"><div class="page-content"><h2 id="what-zenphry-does">What Zenphry does</h2>${groups}</div></article>`,
  );
  const section = document.querySelector(".component-section");

  assert.ok(section.querySelector(".component-pillars"));
  assert.equal(section.classList.contains("component-steps"), false);
});

test("marks literal bullets inside pricing story cards", () => {
  const group = (name) =>
    `<h3>${name}</h3><ul><li>• Included item</li><li>• Another item</li></ul><p><a href="/contact/">Discuss</a></p>`;
  const document = render(
    "/resources/pricing/",
    `<article class="content-page"><div class="page-content">${group("Foundation")}${group("Growth")}</div></article>`,
  );

  assert.equal(document.querySelectorAll(".component-story-card").length, 2);
  assert.equal(
    document.querySelectorAll(
      ".component-story-card ul.component-literal-markers",
    ).length,
    2,
  );
});

test("turns a top-level linked feature list into fully clickable cards", () => {
  const document = render(
    "/about/",
    `<article class="content-page"><div class="page-content"><p>Intro.</p><ul><li><a href="/about/what-we-do/"><strong>What we do</strong><br>How we approach work.</a></li><li><a href="/about/team/"><strong>Team</strong><br>The people leading engagements.</a></li><li><a href="/about/vision/"><strong>Vision</strong><br>The principles we follow.</a></li></ul></div></article>`,
  );

  const list = document.querySelector(".component-linked-list");
  assert.ok(list);
  assert.equal(list.querySelectorAll("li > a > strong").length, 3);
  assert.ok(list.classList.contains("component-list-feature"));
});

test("classifies each direct list in a section instead of only the first", () => {
  const document = render(
    "/solutions/",
    `<article class="content-page"><div class="page-content"><h2 id="capabilities">Capabilities</h2><ul><li><strong>Private cloud</strong>Controlled infrastructure.</li></ul><p>More options.</p><ul><li>Assess current systems</li><li>Plan a migration</li></ul></div></article>`,
  );

  const lists = document.querySelectorAll(".component-section > ul");
  assert.equal(lists.length, 2);
  assert.ok(lists[0].classList.contains("component-list-feature"));
  assert.ok(lists[1].classList.contains("component-list-checklist"));
});

test("converts complete legacy marker pairs without changing malformed prose", () => {
  const document = render(
    "/about/what-we-do/",
    `<article class="content-page"><div class="page-content"><h2 id="what-we-do-not-do">What We Do Not Do</h2><p>—</p><p>We do not hand off a slide deck.</p><p>—</p><p>We do not sell generic coaching.</p><p>—</p><p>We do not replace your team.</p><p>—</p><p>We do not bill for research.</p></div></article>`,
  );
  assert.equal(
    document.querySelectorAll(".component-marker-list > li").length,
    4,
  );
  assert.equal(
    document.querySelector(".component-marker-list > li").textContent,
    "— We do not hand off a slide deck.",
  );
  assert.ok(document.querySelector(".component-exclusions"));

  const malformed = render(
    "/about/what-we-do/",
    `<article class="content-page"><div class="page-content"><h2>Notes</h2><p>—</p><p>One statement only.</p><p>Plain paragraph.</p></div></article>`,
  );
  assert.equal(malformed.querySelector(".component-marker-list"), null);
  assert.equal(malformed.querySelectorAll(".component-section > p").length, 3);

  const consecutiveMarkers = render(
    "/about/what-we-do/",
    `<article class="content-page"><div class="page-content"><h2>Notes</h2><p>—</p><p>—</p><p>—</p><p>—</p></div></article>`,
  );
  assert.equal(
    consecutiveMarkers.querySelector(".component-marker-list"),
    null,
  );

  const formattedLinkOnly = render(
    "/about/what-we-do/",
    `<article class="content-page"><div class="page-content"><h2>Notes</h2><p>—</p><p><strong><a href="/book-a-call/">Book a call</a></strong></p><p>—</p><p>We do not replace your team.</p></div></article>`,
  );
  assert.equal(formattedLinkOnly.querySelector(".component-marker-list"), null);

  const inlineLink = render(
    "/about/what-we-do/",
    `<article class="content-page"><div class="page-content"><h2>Notes</h2><p>—</p><p>We work with <a href="/contact/">your team</a>.</p><p>—</p><p>We do not replace your team.</p></div></article>`,
  );
  assert.equal(
    inlineLink.querySelectorAll(".component-marker-list > li").length,
    2,
  );
});

test("preserves authored dash markers in canonical exclusion lists", () => {
  const document = render(
    "/about/what-we-do/",
    `<article class="content-page"><div class="page-content"><h2 id="what-we-do-not-do">What We Do Not Do</h2><ul><li>— We do not hand off slide decks.</li><li>– We do not replace your team.</li></ul></div></article>`,
  );

  const list = document.querySelector(".component-exclusions ul");
  assert.ok(list.classList.contains("component-literal-markers"));
  assert.equal(list.textContent.includes("— We do not hand off"), true);
  assert.equal(list.textContent.includes("– We do not replace"), true);
});

test("enhances booking and thank-you editable content while preserving inline prose links", () => {
  const booking = render(
    "/book-a-call/",
    `<article class="booking-page"><div class="page-content"><p>Schedule a call.</p><p><strong>What to expect:</strong></p><ul><li>Discovery call</li><li>Next steps</li></ul></div></article>`,
  );
  assert.ok(booking.querySelector(".component-section.component-checklist"));

  const thankYou = render(
    "/thank-you/",
    `<article class="content-page"><div class="page-content"><h2>What happens next</h2><ol><li>Confirmation email</li><li>Review</li><li>Discovery call</li></ol><p>While you wait, read <a href="/resources/">our resources</a>.</p></div></article>`,
  );
  assert.ok(thankYou.querySelector(".component-section.component-steps"));
  assert.ok(thankYou.querySelector(".component-list-steps"));
  assert.equal(
    thankYou.querySelector("p:last-child").classList.contains("component-cta"),
    false,
  );
});

test("styles a direct feature-card action without turning it into a linked card", () => {
  const document = render(
    "/solutions/",
    `<article class="content-page"><div class="page-content"><h2>Solutions</h2><ul><li><strong>Private cloud</strong>Managed infrastructure.<a href="/solutions/private-cloud/">Explore solution</a></li><li><strong>Secure workspaces</strong>Protected access.<a href="/solutions/legal-workspace/">Explore solution</a></li></ul></div></article>`,
  );

  assert.equal(document.querySelector(".component-linked-list"), null);
  assert.equal(document.querySelectorAll(".component-card-action").length, 2);
  assert.ok(document.querySelector(".component-grid-two"));
});

test("uses a trailing feature-card link as the action when the title is linked", () => {
  const document = render(
    "/solutions/",
    `<article class="content-page"><div class="page-content"><h2>Solutions</h2><ul><li><a href="/solutions/private-cloud/"><strong>Private cloud</strong></a><br>Managed infrastructure.<a href="/contact/">Discuss this solution</a></li></ul></div></article>`,
  );

  const links = document.querySelectorAll(".component-list-feature > li > a");
  assert.equal(links[0].classList.contains("component-card-action"), false);
  assert.equal(links[1].classList.contains("component-card-action"), true);
});

test("recognizes linked cards inside a headed section", () => {
  const document = render(
    "/about/",
    `<article class="content-page"><div class="page-content"><h2>Explore</h2><ul><li><a href="/a/"><strong>One</strong><br>First card.</a></li><li><a href="/b/"><strong>Two</strong><br>Second card.</a></li></ul></div></article>`,
  );

  assert.ok(
    document.querySelector(".component-section .component-linked-list"),
  );
  assert.equal(document.querySelectorAll(".component-card-action").length, 0);
});

test("keeps linked-card and CTA feature lists isolated in one section", () => {
  const document = render(
    "/solutions/",
    `<article class="content-page"><div class="page-content"><h2>Explore</h2><ul><li><a href="/a/"><strong>One</strong><br>First card.</a></li><li><a href="/b/"><strong>Two</strong><br>Second card.</a></li></ul><p>Capabilities</p><ul><li><strong>Private cloud</strong>Managed infrastructure.<a href="/solutions/private-cloud/">Explore solution</a></li><li><strong>Secure workspaces</strong>Protected access.<a href="/solutions/legal-workspace/">Explore solution</a></li><li><strong>Private AI</strong>Controlled assistance.<a href="/solutions/private-ai/">Explore solution</a></li></ul></div></article>`,
  );

  const lists = document.querySelectorAll(".component-section > ul");
  assert.equal(lists.length, 2);
  assert.ok(lists[0].classList.contains("component-linked-list"));
  assert.equal(lists[1].classList.contains("component-linked-list"), false);
  assert.equal(lists[1].classList.contains("component-grid-four"), false);
  assert.equal(lists[1].querySelectorAll(".component-card-action").length, 3);
});
