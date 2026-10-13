/* Runs in the legacy page browser context after semanticizeImportedMain. */
function _normalizeMarketingGroups(importedMain) {
  const clean = (element) =>
    (element.textContent || "").replace(/\s+/g, " ").trim();
  const children = (element) => Array.from(element.children);
  const textList = (items) => {
    const result = document.createElement("ul");
    for (const text of items) {
      const item = document.createElement("li");
      item.textContent = text;
      result.append(item);
    }
    return result;
  };
  const contentAfter = (heading) => {
    const parent = heading.parentElement;
    if (!parent) return heading.nextElementSibling;
    const siblings = children(parent);
    return (
      siblings[siblings.indexOf(heading) + 1] || heading.nextElementSibling
    );
  };
  const nestedContainers = (root) =>
    [root, ...Array.from(root?.querySelectorAll("div") || [])].filter(Boolean);
  for (const title of importedMain.querySelectorAll(
    'div[class*="font-semibold"][class*="tracking-tight"]',
  )) {
    const heading = document.createElement("h3");
    heading.replaceChildren(...Array.from(title.childNodes));
    title.replaceWith(heading);
  }
  const isCardContainer = (element) => {
    const className = element.getAttribute("class") || "";
    if (!/(?:^|\s)(?:grid|space-y-\d+)(?:\s|$)/.test(className)) return false;
    const entries = children(element).filter((child) => clean(child));
    if (entries.some((entry) => entry.querySelector("h2"))) return false;
    return (
      entries.length > 1 &&
      entries.every(
        (entry) =>
          entry.querySelector("h3, h4, a, ul, ol") ||
          /^(?:\d+|[•-])\s/.test(clean(entry)) ||
          (children(entry).length > 0 &&
            children(entry).every((child) => child.tagName === "SPAN")),
      )
    );
  };
  const isStepGroup = (entries) =>
    entries.every((entry, index) => {
      const ordinal = Array.from(entry.querySelectorAll("*")).find(
        (child) => clean(child) === String(index + 1),
      );
      const first = ordinal || entry.firstElementChild;
      return (
        clean(first || entry) === String(index + 1) ||
        /^\d+$/.test(clean(first || entry))
      );
    });
  const normalizeLinkedBlocks = (root) => {
    for (const link of root.querySelectorAll("a")) {
      if (!link.querySelector("h1, h2, h3, h4, h5, h6, p, ul, ol")) continue;
      const nestedLists = Array.from(link.querySelectorAll("ul, ol")).filter(
        (list) => !list.parentElement?.closest("ul, ol"),
      );
      const replacement = document.createElement("a");
      replacement.href = link.getAttribute("href") || "#";
      const title = link.querySelector("h1, h2, h3, h4, h5, h6");
      if (title) {
        const label = document.createElement("strong");
        label.textContent = clean(title);
        replacement.append(label);
      }
      const detail = Array.from(link.querySelectorAll("p"))
        .map(clean)
        .filter(Boolean)
        .join(" ");
      if (detail) {
        if (replacement.childNodes.length)
          replacement.append(document.createElement("br"));
        replacement.append(detail);
      }
      if (!replacement.childNodes.length) replacement.textContent = clean(link);
      link.replaceWith(
        replacement,
        ...nestedLists.map((list) => list.cloneNode(true)),
      );
    }
  };
  const appendBreak = (parent) => {
    if (parent.childNodes.length && parent.lastChild?.nodeName !== "BR")
      parent.append(document.createElement("br"));
  };
  const appendInline = (parent, node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.replace(/\s+/g, " ").trim();
      if (!text) return;
      const previous = parent.lastChild;
      const previousText =
        previous?.textContent?.replace(/\s+/g, " ").trim() || "";
      if (
        previous &&
        previous.nodeName !== "BR" &&
        previousText &&
        !/[\s([{/]$/.test(previousText) &&
        !/^[,.;:!?%)\]}]/.test(text)
      )
        parent.append(" ");
      parent.append(text);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const element = node;
    if (element.tagName === "BR") {
      appendBreak(parent);
      return;
    }
    const isBlock = /^(?:P|DIV|H[1-6]|UL|OL|LI)$/.test(element.tagName);
    if (isBlock) appendBreak(parent);
    const inline =
      element.tagName === "A" || element.tagName === "STRONG"
        ? document.createElement(element.tagName.toLowerCase())
        : parent;
    if (element.tagName === "A")
      inline.setAttribute("href", element.getAttribute("href") || "#");
    for (const child of Array.from(element.childNodes))
      appendInline(inline, child);
    if (inline !== parent && inline.childNodes.length) parent.append(inline);
    if (isBlock) appendBreak(parent);
  };
  const flatPricingAndCaseStudyCards = () => {
    for (const container of Array.from(importedMain.querySelectorAll("div"))) {
      const cards = children(container).filter((card) => clean(card));
      if (cards.length < 2) continue;
      const labels = cards.map((card) =>
        Array.from(card.querySelectorAll("h4")).map(clean),
      );
      const isPricing = labels.every((cardLabels) =>
        cardLabels.includes("What is included:"),
      );
      const isCaseStudyIndex = labels.every(
        (cardLabels) =>
          cardLabels.includes("Situation:") && cardLabels.includes("Outcome:"),
      );
      if (!isPricing && !isCaseStudyIndex) continue;

      const replacement = document.createDocumentFragment();
      for (const card of cards) {
        const appendFlat = (node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const element = node;
          if (/^H[34]$/.test(element.tagName)) {
            const heading = document.createElement("h3");
            heading.textContent = clean(element);
            if (heading.textContent) replacement.append(heading);
            return;
          }
          if (element.tagName === "P") {
            const paragraph = document.createElement("p");
            paragraph.textContent = clean(element);
            if (paragraph.textContent) replacement.append(paragraph);
            return;
          }
          if (/^(?:UL|OL)$/.test(element.tagName)) {
            const list = document.createElement("ul");
            for (const sourceItem of element.querySelectorAll(":scope > li")) {
              const item = document.createElement("li");
              item.textContent = clean(sourceItem);
              if (item.textContent) list.append(item);
            }
            if (list.childNodes.length) replacement.append(list);
            return;
          }
          if (element.tagName === "A") {
            const paragraph = document.createElement("p");
            const anchor = document.createElement("a");
            anchor.href = element.getAttribute("href") || "#";
            anchor.textContent = clean(element);
            if (anchor.textContent) {
              paragraph.append(anchor);
              replacement.append(paragraph);
            }
            return;
          }
          if (!element.children.length) {
            const paragraph = document.createElement("p");
            paragraph.textContent = clean(element);
            if (paragraph.textContent) replacement.append(paragraph);
            return;
          }
          for (const child of Array.from(element.children)) appendFlat(child);
        };
        for (const child of Array.from(card.children)) appendFlat(child);
      }
      container.replaceWith(replacement);
    }
  };
  const normalizeCard = (card, ordered) => {
    const item = document.createElement("li");
    const labels = children(card).filter((child) => child.tagName === "SPAN");
    if (labels.length > 1 && labels.length === children(card).length) {
      const label = document.createElement("strong");
      label.textContent = clean(labels[0]);
      item.append(label, document.createElement("br"));
      item.append(labels.slice(1).map(clean).join(" "));
      return item;
    }
    const clone = document.createElement("div");
    clone.append(card.cloneNode(true));
    normalizeLinkedBlocks(clone);

    const ordinal = Array.from(clone.querySelectorAll("*")).find((child) =>
      /^\d+$/.test(clean(child)),
    );
    if (ordered && ordinal) ordinal.remove();

    const heading = clone.querySelector("h1, h2, h3, h4, h5, h6");
    if (heading) {
      const label = document.createElement("strong");
      label.textContent = clean(heading);
      const linkedHeading = heading.closest("a");
      if (linkedHeading) {
        const link = document.createElement("a");
        link.href = linkedHeading.getAttribute("href") || "#";
        link.append(label);
        linkedHeading.replaceWith(link);
      } else heading.replaceWith(label);
    }

    for (const invalidParagraph of clone.querySelectorAll("p")) {
      if (!invalidParagraph.querySelector("p, ul, ol")) continue;
      invalidParagraph.replaceWith(...Array.from(invalidParagraph.childNodes));
    }
    for (const wrapper of Array.from(
      clone.querySelectorAll("div, span"),
    ).reverse()) {
      if (!wrapper.children.length && clean(wrapper)) {
        const paragraph = document.createElement("p");
        paragraph.textContent = clean(wrapper);
        wrapper.replaceWith(paragraph);
        continue;
      }
      wrapper.replaceWith(...Array.from(wrapper.childNodes));
    }
    for (const node of Array.from(clone.childNodes)) appendInline(item, node);
    while (item.lastChild?.nodeName === "BR") item.lastChild.remove();
    return item;
  };

  flatPricingAndCaseStudyCards();

  const containers = Array.from(importedMain.querySelectorAll("div")).sort(
    (left, right) => {
      const depth = (element) => {
        let count = 0;
        for (
          let parent = element.parentElement;
          parent;
          parent = parent.parentElement
        )
          count += 1;
        return count;
      };
      return depth(right) - depth(left);
    },
  );
  for (const container of containers) {
    if (!importedMain.contains(container)) continue;
    if (!isCardContainer(container)) continue;
    const entries = children(container).filter((child) => clean(child));
    if (entries.some((entry) => entry.matches("ul, ol"))) continue;
    const ordered = isStepGroup(entries);
    const list = document.createElement(ordered ? "ol" : "ul");
    for (const entry of entries) list.append(normalizeCard(entry, ordered));
    container.replaceWith(list);
  }

  const pairedCards = (headingText) => {
    for (const heading of importedMain.querySelectorAll("h2")) {
      if (clean(heading) !== headingText) continue;
      const container = nestedContainers(contentAfter(heading)).find(
        (candidate) => {
          const cards = children(candidate).filter((card) => clean(card));
          return (
            cards.length > 1 &&
            cards.every((card) => {
              const title = card.querySelector("h3");
              const paragraphs = Array.from(card.querySelectorAll("p")).filter(
                (paragraph) => clean(paragraph),
              );
              return (
                (title && paragraphs.length === 1) ||
                (!title && paragraphs.length === 2)
              );
            })
          );
        },
      );
      if (!container) continue;
      const cards = children(container).filter((card) => clean(card));
      const pairs = cards
        .map((card) => {
          const title = card.querySelector("h3");
          const paragraphs = Array.from(card.querySelectorAll("p"))
            .map(clean)
            .filter(Boolean);
          return title && paragraphs.length === 1
            ? [clean(title), paragraphs[0]]
            : paragraphs.length === 2
              ? paragraphs
              : null;
        })
        .filter(Boolean);
      if (pairs.length !== cards.length || pairs.length < 2) continue;
      const list = document.createElement("ul");
      for (const [title, detail] of pairs) {
        const item = document.createElement("li");
        const label = document.createElement("strong");
        label.textContent = title;
        item.append(label, document.createElement("br"), detail);
        list.append(item);
      }
      container.replaceWith(list);
    }
  };
  const numberedCards = (headingText) => {
    for (const heading of importedMain.querySelectorAll("h2")) {
      if (clean(heading) !== headingText) continue;
      const container = nestedContainers(contentAfter(heading)).find(
        (candidate) => {
          const cards = children(candidate).filter((card) => clean(card));
          return (
            cards.length > 1 &&
            cards.every((card) => {
              const ordinal = Array.from(card.querySelectorAll("div")).find(
                (element) => /^\d+$/.test(clean(element)),
              );
              const detail = card.querySelector("p");
              return Boolean(ordinal && detail && clean(detail));
            })
          );
        },
      );
      if (!container) continue;
      const cards = children(container).filter((card) => clean(card));
      const steps = cards
        .map((card) => card.querySelector("p"))
        .filter(Boolean)
        .map(clean);
      if (steps.length !== cards.length || steps.length < 2) continue;
      const list = document.createElement("ol");
      for (const detail of steps) {
        const item = document.createElement("li");
        item.textContent = detail;
        list.append(item);
      }
      container.replaceWith(list);
    }
  };

  pairedCards("What Zenphry Delivers");
  pairedCards("Common Use Cases");
  numberedCards("What Zenphry Did");

  const cloneLine = (nodes) => {
    const fragment = document.createDocumentFragment();
    for (const node of nodes) fragment.append(node.cloneNode(true));
    return fragment;
  };
  const lineGroups = (item) => {
    const lines = [];
    let current = [];
    const commit = () => {
      if (current.some((node) => clean(node))) lines.push(current);
      current = [];
    };
    for (const node of Array.from(item.childNodes)) {
      if (node.nodeName === "BR") commit();
      else current.push(node);
    }
    commit();
    return lines;
  };
  const lineText = (line) =>
    line
      .map((node) => clean(node))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  const directListItems = (list) =>
    Array.from(list.children).filter((item) => item.tagName === "LI");
  const paragraphFromLine = (line) => {
    const paragraph = document.createElement("p");
    paragraph.append(cloneLine(line));
    return paragraph;
  };

  // The legacy Services page used a responsive grid of divs. The generic card
  // normalizer turns it into rich list items, which Ghost preserves but cannot
  // expose as separate editable fields. Split the repeated title/duration/
  // audience/description/CTA line pattern into native siblings instead.
  for (const list of Array.from(importedMain.querySelectorAll("ul, ol"))) {
    const items = directListItems(list);
    const rows = items.map(lineGroups);
    const isServiceCatalog =
      items.length > 2 &&
      rows.length === items.length &&
      rows.every((lines) => {
        const first = lines[0]?.[0];
        const last = lines.at(-1);
        return (
          lines.length >= 5 &&
          first?.nodeName === "STRONG" &&
          Boolean(last?.some((node) => node.nodeName === "A"))
        );
      });
    if (!isServiceCatalog) continue;
    const replacement = document.createDocumentFragment();
    for (const lines of rows) {
      const title = document.createElement("h3");
      title.textContent = lineText(lines[0]);
      replacement.append(title);
      for (const line of lines.slice(1))
        replacement.append(paragraphFromLine(line));
    }
    list.replaceWith(replacement);
  }

  // A repeated numbered set with a title and four action lines is a service
  // pillar, not a prose list. Keep its source order while giving Ghost one H3
  // and one editable checklist per pillar. This intentionally relies on the
  // DOM shape rather than any service-specific copy.
  for (const list of Array.from(importedMain.querySelectorAll("ol"))) {
    const items = directListItems(list);
    const rows = items.map(lineGroups);
    const isFramework =
      items.length > 2 &&
      rows.every((lines) => {
        const deliverables = lines.findIndex(
          (line) => lineText(line) === "Deliverables:",
        );
        const timeline = lines.findIndex(
          (line) => lineText(line) === "Typical Timeline:",
        );
        return (
          lines[0]?.[0]?.nodeName === "STRONG" &&
          deliverables > 1 &&
          timeline > deliverables + 1 &&
          timeline === lines.length - 2
        );
      });
    if (isFramework) {
      const replacement = document.createDocumentFragment();
      for (const lines of rows) {
        const deliverables = lines.findIndex(
          (line) => lineText(line) === "Deliverables:",
        );
        const timeline = lines.findIndex(
          (line) => lineText(line) === "Typical Timeline:",
        );
        const title = document.createElement("h3");
        title.textContent = lineText(lines[0]);
        replacement.append(title, paragraphFromLine(lines[1]));
        replacement.append(paragraphFromLine(lines[deliverables]));
        const deliverableList = document.createElement("ul");
        for (const line of lines.slice(deliverables + 1, timeline)) {
          const item = document.createElement("li");
          item.append(cloneLine(line));
          deliverableList.append(item);
        }
        replacement.append(deliverableList, paragraphFromLine(lines[timeline]));
        replacement.append(paragraphFromLine(lines[timeline + 1]));
      }
      list.replaceWith(replacement);
      continue;
    }
    const isPillarList =
      items.length > 2 &&
      rows.every((lines) => {
        const first = lines[0]?.[0];
        return (
          lines.length >= 4 &&
          first?.nodeName === "STRONG" &&
          !lines.some((line) => line.some((node) => node.nodeName === "A"))
        );
      });
    if (!isPillarList) continue;
    const replacement = document.createDocumentFragment();
    for (const lines of rows) {
      const title = document.createElement("h3");
      title.textContent = lineText(lines[0]);
      const subgroupIndex = lines.findIndex(
        (line, index) =>
          index > 3 &&
          index < lines.length - 2 &&
          /^(?:[A-Z][a-z]+|[A-Z]{2,})(?:\s+(?:[A-Z][a-z]+|[A-Z]{2,}))*$/.test(
            lineText(line),
          ),
      );
      const actions = document.createElement("ul");
      const actionLines = lines.slice(
        1,
        subgroupIndex > 0 ? subgroupIndex : undefined,
      );
      for (const line of actionLines) {
        const item = document.createElement("li");
        item.append(cloneLine(line));
        actions.append(item);
      }
      replacement.append(title, actions);
      if (subgroupIndex > 0) {
        replacement.append(paragraphFromLine(lines[subgroupIndex]));
        const subgroup = document.createElement("ul");
        for (const line of lines.slice(subgroupIndex + 1)) {
          const item = document.createElement("li");
          item.append(cloneLine(line));
          subgroup.append(item);
        }
        replacement.append(subgroup);
      }
    }
    list.replaceWith(replacement);
  }

  for (const heading of importedMain.querySelectorAll("h2")) {
    if (clean(heading) !== "How We Operate") continue;
    const container = contentAfter(heading);
    if (!container) continue;
    const rows = children(container)
      .map((element) => clean(element.querySelector("span") || element))
      .filter(Boolean);
    if (rows.length < 2) continue;
    container.replaceWith(textList(rows));
  }

  for (const heading of importedMain.querySelectorAll("h2")) {
    if (clean(heading) !== "Outcomes & Metrics") continue;
    const container = contentAfter(heading);
    if (!container || container.querySelector(":scope > ul, :scope > ol"))
      continue;
    const items = children(container).map(clean).filter(Boolean);
    if (items.length < 2) continue;
    container.replaceWith(textList(items));
  }

  // Some legacy pages express a repeated set of statements as a marker-only
  // paragraph followed by its copy. Preserve the statements as normal editable
  // list items instead of leaving the markers detached from their sentences.
  // This is deliberately based on a repeated sibling shape, rather than a page
  // title or a piece of marketing copy, so it applies to later imports too.
  const markerOnly = (element) =>
    element?.tagName === "P" && /^[—–-]$/.test(clean(element));
  const statement = (element) => {
    if (
      element?.tagName !== "P" ||
      !clean(element) ||
      /^[—–-]$/.test(clean(element))
    )
      return false;
    const prose = element.cloneNode(true);
    prose.querySelectorAll("a").forEach((anchor) => anchor.remove());
    return Boolean(clean(prose));
  };

  // Before the generic exporter unwraps legacy containers, some pages have
  // repeated marker-and-copy pairs inside sibling cards. Convert those cards
  // at their source so the later unwrapping cannot separate the marker from
  // the statement.
  for (const parent of Array.from(
    importedMain.querySelectorAll("div, section"),
  )) {
    const cards = children(parent).filter((card) => clean(card));
    if (cards.length < 2) continue;
    const pairs = cards.map((card) => {
      const cardChildren = children(card);
      const markerElement =
        cardChildren.length === 2 && cardChildren[0].tagName === "SPAN"
          ? cardChildren[0]
          : null;
      const copy =
        cardChildren.length === 2 && cardChildren[1].tagName === "P"
          ? cardChildren[1]
          : cardChildren.length === 1 && cardChildren[0].tagName === "P"
            ? cardChildren[0]
            : null;
      const directText = Array.from(card.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent || "")
        .join("")
        .replace(/\s+/g, " ")
        .trim();
      const marker = clean(markerElement || { textContent: directText });
      return copy && statement(copy) && /^[—–-]$/.test(marker)
        ? [marker, copy]
        : null;
    });
    if (pairs.some((pair) => !pair)) continue;
    const list = document.createElement("ul");
    cards[0].before(list);
    for (const pair of pairs) {
      if (!pair) continue;
      const [marker, copy] = pair;
      const item = document.createElement("li");
      item.append(`${marker} `);
      while (copy.firstChild) item.append(copy.firstChild);
      list.append(item);
    }
    cards.forEach((card) => card.remove());
  }

  for (const parent of Array.from(
    importedMain.querySelectorAll("div, section, article, main"),
  ).sort((left, right) => {
    const depth = (element) => {
      let count = 0;
      for (let node = element.parentElement; node; node = node.parentElement)
        count += 1;
      return count;
    };
    return depth(right) - depth(left);
  })) {
    if (!importedMain.contains(parent)) continue;
    const nodes = children(parent);
    for (let index = 0; index < nodes.length;) {
      const pairs = [];
      while (markerOnly(nodes[index]) && statement(nodes[index + 1])) {
        pairs.push([nodes[index], nodes[index + 1]]);
        index += 2;
      }
      if (pairs.length < 2) {
        index += 1;
        continue;
      }
      const list = document.createElement("ul");
      pairs[0][0].before(list);
      for (const [marker, copy] of pairs) {
        const item = document.createElement("li");
        item.append(`${clean(marker)} `);
        while (copy.firstChild) item.append(copy.firstChild);
        list.append(item);
        marker.remove();
        copy.remove();
      }
    }
  }

  // The legacy thank-you flow renders the ordinal in its own span as well as
  // through the ordered list. Remove only that explicit decorative span. Text
  // that merely starts with a number remains untouched.
  for (const list of Array.from(importedMain.querySelectorAll("ol"))) {
    const items = directListItems(list);
    if (
      items.length < 2 ||
      !items.every(
        (item, index) =>
          item.firstElementChild?.tagName === "SPAN" &&
          clean(item.firstElementChild) === String(index + 1) &&
          Array.from(item.children)
            .slice(1)
            .some((child) => child.tagName === "SPAN" && clean(child)),
      )
    )
      continue;
    items.forEach((item) => item.firstElementChild?.remove());
  }
}
