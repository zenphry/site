/* Runs in the legacy page browser context before Ghost HTML is exported. */
function _semanticizeImportedMain(importedMain) {
  const clean = (element) =>
    (element.textContent || "").replace(/\s+/g, " ").trim();
  const children = (element) => Array.from(element.children);
  const after = (heading) => {
    const parent = heading.parentElement;
    if (!parent) return null;
    const siblings = children(parent);
    return siblings[siblings.indexOf(heading) + 1] || null;
  };
  const list = (items, ordered = false) => {
    const result = document.createElement(ordered ? "ol" : "ul");
    for (const text of items) {
      const item = document.createElement("li");
      item.textContent = text.replace(/^•\s*/, "");
      result.append(item);
    }
    return result;
  };
  const listSection = (name) => {
    for (const heading of importedMain.querySelectorAll("h2")) {
      if (clean(heading) !== name) continue;
      const content = after(heading);
      if (!content || content.querySelector("ul, ol")) continue;
      const items = children(content).map(clean).filter(Boolean);
      if (items.length > 1) content.replaceWith(list(items));
    }
  };
  const steps = (name) => {
    for (const heading of importedMain.querySelectorAll("h2")) {
      if (clean(heading) !== name) continue;
      const content = after(heading);
      if (!content) continue;
      const rows = children(content)
        .map((row) => {
          const title = row.querySelector("h3");
          const detail = Array.from(row.querySelectorAll("p")).find(
            (paragraph) => !/^\d+$/.test(clean(paragraph)),
          );
          return title && detail ? [clean(title), clean(detail)] : null;
        })
        .filter(Boolean);
      if (rows.length < 2) continue;
      const result = document.createElement("ol");
      for (const [title, detail] of rows) {
        const item = document.createElement("li");
        const label = document.createElement("strong");
        label.textContent = title;
        item.append(label, document.createElement("br"), detail);
        result.append(item);
      }
      content.replaceWith(result);
    }
  };

  [
    "Who It Is For",
    "Who This Is For",
    "Who This Service Is For",
    "Common Triggers",
    "What You Get",
    "What Is NOT Included",
  ].forEach(listSection);
  steps("How It Works");
  steps("How Engagements Work");

  for (const heading of importedMain.querySelectorAll("h2")) {
    if (clean(heading) !== "Timeline & Engagement") continue;
    const content = after(heading);
    if (!content) continue;
    const rows = Array.from(content.querySelectorAll("h3")).map((title) => [
      clean(title),
      clean(title.parentElement.querySelector("p")),
    ]);
    if (rows.length < 2) continue;
    const result = document.createElement("ul");
    for (const [title, detail] of rows) {
      const item = document.createElement("li");
      const label = document.createElement("strong");
      label.textContent = title;
      item.append(label, document.createElement("br"), detail);
      result.append(item);
    }
    content.replaceWith(result);
  }

  for (const container of importedMain.querySelectorAll("div, section")) {
    const nodes = children(container);
    for (let index = 0; index < nodes.length;) {
      const run = [];
      while (
        nodes[index + run.length] &&
        nodes[index + run.length].tagName === "P" &&
        /^•\s*/.test(clean(nodes[index + run.length]))
      )
        run.push(nodes[index + run.length]);
      if (run.length > 1) {
        run[0].replaceWith(list(run.map(clean)));
        run.slice(1).forEach((node) => node.remove());
        index += run.length;
      } else index += 1;
    }
  }
}
