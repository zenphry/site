import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { Window } from "happy-dom";

const normalizerSource = await readFile(
  new URL("../scripts/normalize-marketing-groups.js", import.meta.url),
  "utf8",
);

function normalize(html) {
  const window = new Window();
  const previous = {
    Node: globalThis.Node,
    NodeFilter: globalThis.NodeFilter,
    document: globalThis.document,
  };
  Object.assign(globalThis, {
    Node: window.Node,
    NodeFilter: window.NodeFilter,
    document: window.document,
  });
  try {
    window.document.body.innerHTML = `<main>${html}</main>`;
    window.eval(normalizerSource);
    window.eval("_normalizeMarketingGroups(document.querySelector('main'))");
    return window.document.querySelector("main").innerHTML;
  } finally {
    Object.assign(globalThis, previous);
  }
}

test("groups repeated legacy marker cards into one editable list", () => {
  const result = normalize(`
    <div>
      <div><span>—</span><p>First statement.</p></div>
      <div><span>—</span><p>Second statement.</p></div>
    </div>
  `);

  assert.match(
    result,
    /<ul><li>— First statement\.<\/li><li>— Second statement\.<\/li><\/ul>/,
  );
  assert.doesNotMatch(result, /<span>—<\/span><p>/);
});

test("does not turn incomplete marker patterns or wrapped link CTAs into list items", () => {
  const result = normalize(`
    <div>
      <div><span>—</span><p>First statement.</p></div>
      <div><span>—</span><p>—</p></div>
      <div><span>—</span><p><strong><a href="/contact/">Book a call</a></strong></p></div>
    </div>
  `);

  assert.doesNotMatch(result, /<ul><li>/);
  assert.match(result, /href="\/contact\/">Book a call/);
});

test("does not turn flat marker pairs with wrapped link CTAs into list items", () => {
  const result = normalize(`
    <section>
      <p>—</p><p><em><a href="/contact/">Book a call</a></em></p>
      <p>—</p><p><strong><a href="/services/">Explore services</a></strong></p>
    </section>
  `);

  assert.doesNotMatch(result, /<ul><li>/);
  assert.match(result, /href="\/contact\/">Book a call/);
  assert.match(result, /href="\/services\/">Explore services/);
});

test("does not discard additional content inside a marker card", () => {
  const result = normalize(`
    <div>
      <div><span>—</span><p>First statement.</p><p>Extra detail.</p></div>
      <div><span>—</span><p>Second statement.</p></div>
    </div>
  `);

  assert.doesNotMatch(result, /<ul><li>/);
  assert.match(result, /Extra detail\./);
});

test("removes only decorative ordinal spans from a repeated ordered flow", () => {
  const result = normalize(`
    <ol>
      <li><span>1</span><span>You will receive a confirmation.</span></li>
      <li><span>2</span><span>Our team will review your information.</span></li>
      <li><span>3</span><span>We will contact you.</span></li>
    </ol>
  `);

  assert.doesNotMatch(result, /<span>1<\/span>/);
  assert.match(
    result,
    /<li><span>You will receive a confirmation\.<\/span><\/li>/,
  );
});

test("leaves ordinary numeric ordered-list prose untouched", () => {
  const result = normalize(`
    <ol><li>10% of the work is complete.</li><li>20% is reviewed.</li><li>30% is delivered.</li></ol>
  `);

  assert.match(result, /<li>10% of the work is complete\.<\/li>/);
  assert.match(result, /<li>20% is reviewed\.<\/li>/);
  assert.match(result, /<li>30% is delivered\.<\/li>/);
});
