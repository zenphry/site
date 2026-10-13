(function () {
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-site-nav]");

  root.classList.add("js");

  function setTheme(theme) {
    root.dataset.theme = theme;
    if (toggle) {
      var label =
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
      toggle.setAttribute("aria-label", label);
      toggle.setAttribute("title", label);
    }
  }

  if (toggle) {
    setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    toggle.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      try {
        localStorage.setItem("zenphry-theme", nextTheme);
      } catch {
        // The preference still applies for the current page when storage is unavailable.
      }
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      if (!isOpen) nav.querySelector("a")?.focus();
    });
    nav.addEventListener("click", function (event) {
      if (event.target instanceof HTMLAnchorElement) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        navToggle.getAttribute("aria-expanded") === "true"
      ) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  var contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    var status = contactForm.querySelector("[data-contact-status]");
    var submit = contactForm.querySelector('button[type="submit"]');

    function clearContactErrors() {
      contactForm
        .querySelectorAll("[data-contact-error-for]")
        .forEach(function (element) {
          element.textContent = "";
        });
      contactForm
        .querySelectorAll("input, textarea")
        .forEach(function (element) {
          element.removeAttribute("aria-invalid");
          element.setCustomValidity("");
        });
    }

    contactForm.addEventListener("input", clearContactErrors);

    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      clearContactErrors();
      submit.disabled = true;
      status.textContent = "Sending…";
      status.classList.remove("is-error", "is-success");

      try {
        var formValues = new URLSearchParams();
        new FormData(contactForm).forEach(function (value, key) {
          if (typeof value === "string") formValues.append(key, value);
        });
        var response = await fetch(contactForm.action, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: formValues,
        });
        var result;
        try {
          result = await response.json();
        } catch {
          throw new Error(
            "We could not send your enquiry. Please try again shortly.",
          );
        }
        if (!response.ok || !result.ok) {
          if (result.errors) {
            Object.entries(result.errors).forEach(function (entry) {
              var input = contactForm.elements.namedItem(entry[0]);
              var error = contactForm.querySelector(
                '[data-contact-error-for="' + entry[0] + '"]',
              );
              if (input && input instanceof HTMLElement) {
                input.setAttribute("aria-invalid", "true");
                input.setCustomValidity(entry[1]);
              }
              if (error) error.textContent = entry[1];
            });
            contactForm.reportValidity();
          }
          throw { contactMessage: result.message };
        }
        contactForm.reset();
        status.textContent = result.message;
        status.classList.add("is-success");
      } catch (error) {
        status.textContent =
          error && typeof error === "object" && "contactMessage" in error
            ? error.contactMessage
            : "We could not send your enquiry. Please try again shortly.";
        status.classList.add("is-error");
      } finally {
        submit.disabled = false;
      }
    });
  }

  function isLinkOnlyParagraph(element) {
    var links = element ? Array.from(element.querySelectorAll("a")) : [];
    var permittedWrappers = new Set([
      "A",
      "STRONG",
      "EM",
      "B",
      "I",
      "SPAN",
      "BR",
    ]);
    return (
      element &&
      element.tagName === "P" &&
      links.length > 0 &&
      !hasProseOutsideLinks(element) &&
      Array.from(element.querySelectorAll("*")).every(function (node) {
        return (
          permittedWrappers.has(node.tagName) || Boolean(node.closest("a"))
        );
      })
    );
  }

  function hasProseOutsideLinks(element) {
    var clone = element.cloneNode(true);
    clone.querySelectorAll("a").forEach(function (link) {
      link.remove();
    });
    return clone.textContent.trim().length > 0;
  }

  function hasFeatureLabel(item) {
    return Boolean(item.querySelector(":scope > strong, :scope > a > strong"));
  }

  function featureAction(item) {
    return Array.from(item.querySelectorAll(":scope > a"))
      .reverse()
      .find(function (link) {
        return !link.querySelector("strong");
      });
  }

  function directLists(section) {
    return Array.from(section.children).filter(function (child) {
      return child.tagName === "UL" || child.tagName === "OL";
    });
  }

  function hasOnlyLinkedFeatureItems(list) {
    var items = Array.from(list.children);
    return (
      items.length > 0 &&
      items.every(function (item) {
        var link = item.querySelector(":scope > a");
        return (
          link &&
          item.children.length === 1 &&
          item.firstElementChild === link &&
          Array.from(item.childNodes).every(function (node) {
            return (
              node.nodeType === Node.ELEMENT_NODE ||
              node.nodeType === Node.COMMENT_NODE ||
              node.textContent.trim() === ""
            );
          }) &&
          Boolean(link.querySelector("strong"))
        );
      })
    );
  }

  function createSection(content, heading) {
    var section = document.createElement("section");
    section.className = "component-section";
    heading.before(section);
    var node = heading;

    while (node) {
      var next = node.nextElementSibling;
      section.append(node);
      if (next && next.tagName === "H2") break;
      node = next;
    }

    return section;
  }

  function enhanceCatalog(content) {
    var firstSectionHeading = content.querySelector(":scope > h2");
    var candidates = Array.from(content.querySelectorAll(":scope > h3")).filter(
      function (heading) {
        return (
          !firstSectionHeading ||
          heading.compareDocumentPosition(firstSectionHeading) &
            Node.DOCUMENT_POSITION_FOLLOWING
        );
      },
    );

    var hasCatalogShape =
      candidates.length >= 3 &&
      candidates.every(function (heading) {
        var paragraphs = [];
        var node = heading.nextElementSibling;
        while (node && node.tagName !== "H2" && node.tagName !== "H3") {
          if (node.tagName === "P") paragraphs.push(node);
          node = node.nextElementSibling;
        }
        return paragraphs.length >= 4 && isLinkOnlyParagraph(paragraphs.at(-1));
      });
    if (!hasCatalogShape) return;

    var catalog = document.createElement("section");
    catalog.className = "component-catalog";
    var grid = document.createElement("div");
    grid.className = "component-card-grid";
    catalog.append(grid);
    candidates[0].before(catalog);

    candidates.forEach(function (heading) {
      var card = document.createElement("article");
      card.className = "component-card";
      grid.append(card);
      var node = heading.nextElementSibling;
      card.append(heading);

      while (node && node.tagName !== "H2" && node.tagName !== "H3") {
        var next = node.nextElementSibling;
        card.append(node);
        node = next;
      }
    });
  }

  function enhanceStoryGroups(content) {
    var firstSectionHeading = content.querySelector(":scope > h2");
    var nodes = Array.from(content.children).filter(function (node) {
      return (
        !firstSectionHeading ||
        node.compareDocumentPosition(firstSectionHeading) &
          Node.DOCUMENT_POSITION_FOLLOWING
      );
    });
    var groups = [];
    var current = [];
    var collecting = false;

    nodes.forEach(function (node) {
      if (!collecting && node.tagName !== "H3") return;
      collecting = true;
      current.push(node);
      if (isLinkOnlyParagraph(node)) {
        if (
          current.some(function (item) {
            return item.tagName === "H3";
          })
        ) {
          groups.push(current);
        }
        current = [];
        collecting = false;
      }
    });

    if (groups.length < 2) return;

    var grid = document.createElement("section");
    grid.className = "component-story-grid";
    groups[0][0].before(grid);
    groups.forEach(function (group) {
      var card = document.createElement("article");
      card.className = "component-story-card";
      grid.append(card);
      group.forEach(function (node) {
        card.append(node);
      });
    });
  }

  function enhanceFaq(section) {
    var heading = section.querySelector(":scope > h2");
    var questions = Array.from(section.querySelectorAll(":scope > h3"));
    if (!heading || questions.length === 0) return;

    var accordion = document.createElement("div");
    accordion.className = "component-accordion";
    questions[0].before(accordion);

    questions.forEach(function (question) {
      var detail = document.createElement("details");
      var summary = document.createElement("summary");
      var questionId = question.id;
      if (questionId) summary.id = questionId;
      while (question.firstChild) summary.append(question.firstChild);
      detail.append(summary);
      accordion.append(detail);

      var node = question.nextElementSibling;
      question.remove();
      while (node && node.tagName !== "H3" && node.tagName !== "H2") {
        var next = node.nextElementSibling;
        if (isLinkOnlyParagraph(node)) break;
        detail.append(node);
        node = next;
      }
    });
  }

  function enhancePillars(container) {
    var children = Array.from(container.children);
    var enhanced = false;
    var nativeContentBlocks = ["P", "UL", "OL", "FIGURE", "BLOCKQUOTE", "HR"];

    for (var index = 0; index < children.length; index += 1) {
      var run = [];
      while (children[index] && children[index].tagName === "H3") {
        var group = [children[index]];
        index += 1;
        while (
          children[index] &&
          nativeContentBlocks.includes(children[index].tagName)
        ) {
          group.push(children[index]);
          index += 1;
        }
        if (
          !group.some(function (node) {
            return node.tagName === "UL";
          })
        ) {
          break;
        }
        run.push(group);
      }
      if (run.length < 3) continue;

      var pillars = document.createElement("ol");
      pillars.className = "component-pillars";
      run[0][0].before(pillars);
      run.forEach(function (group, pillarIndex) {
        var item = document.createElement("li");
        item.className = "component-pillar";
        item.dataset.pillar = String(pillarIndex + 1);
        pillars.append(item);
        group.forEach(function (node) {
          item.append(node);
        });
      });
      enhanced = true;
    }

    return enhanced;
  }

  function enhanceTopLevelSteps(content) {
    Array.from(content.querySelectorAll(":scope > ol")).forEach(
      function (list) {
        if (list.classList.contains("component-pillars")) return;
        var section = document.createElement("section");
        section.className = "component-section component-steps";
        list.before(section);
        section.append(list);
        list.classList.add("component-list-steps");
      },
    );
  }

  function enhanceTopLevelLinkedCards(content) {
    Array.from(content.querySelectorAll(":scope > ul")).forEach(
      function (list) {
        if (!hasOnlyLinkedFeatureItems(list)) return;

        var section = document.createElement("section");
        section.className =
          "component-section component-feature-cards component-compact-list";
        list.before(section);
        section.append(list);
        list.classList.add("component-list-feature", "component-linked-list");
      },
    );
  }

  function enhanceTopLevelLists(content) {
    var children = Array.from(content.children);
    children.forEach(function (list, index) {
      if (list.tagName !== "UL") return;
      var hasStructuredPredecessor = children
        .slice(0, index)
        .some(function (node) {
          return node.tagName === "H2" || node.tagName === "H3";
        });
      if (hasStructuredPredecessor) return;
      var section = document.createElement("section");
      section.className =
        "component-section component-checklist component-compact-list";
      list.before(section);
      section.append(list);
      list.classList.add("component-list-checklist");
    });
  }

  function enhanceMarkerPairs(section) {
    var children = Array.from(section.children);
    var runs = [];
    var current = [];

    for (var index = 0; index < children.length; index += 1) {
      var node = children[index];
      var next = children[index + 1];
      var marker =
        node.tagName === "P" && /^[—–-]$/.test(node.textContent.trim());
      var statement =
        marker &&
        next &&
        next.tagName === "P" &&
        !isLinkOnlyParagraph(next) &&
        hasProseOutsideLinks(next) &&
        !/^[—–-]$/.test(next.textContent.trim()) &&
        next.textContent.trim().length > 0;

      if (statement) {
        current.push([node, next]);
        index += 1;
        continue;
      }
      if (current.length) {
        runs.push(current);
        current = [];
      }
    }
    if (current.length) runs.push(current);

    runs.forEach(function (pairs) {
      if (pairs.length < 2) return;
      var list = document.createElement("ul");
      list.className = "component-marker-list component-literal-markers";
      pairs[0][0].before(list);
      pairs.forEach(function (pair) {
        var item = document.createElement("li");
        item.append(document.createTextNode(pair[0].textContent.trim() + " "));
        while (pair[1].firstChild) item.append(pair[1].firstChild);
        list.append(item);
        pair[0].remove();
        pair[1].remove();
      });
      section.classList.add("component-exclusions");
    });
  }

  function markLiteralMarkers(content) {
    content.querySelectorAll("ul").forEach(function (list) {
      var items = Array.from(list.children);
      if (
        items.length > 0 &&
        items.every(function (item) {
          return (
            (item.tagName === "LI" &&
              item.textContent.trim().startsWith("•")) ||
            (item.tagName === "LI" &&
              /^[—–-](?:\s|$)/.test(item.textContent.trim()))
          );
        })
      ) {
        list.classList.add("component-literal-markers");
      }
    });
  }

  function enhanceSection(section) {
    var heading = section.querySelector(":scope > h2");
    if (!heading) return;
    var headingId = heading.id || "";

    if (
      /^\/resources\/faq\/?$/.test(window.location.pathname) ||
      /faq|frequently-asked-questions/.test(headingId)
    ) {
      section.classList.add("component-faq");
      enhanceFaq(section);
      return;
    }

    enhanceMarkerPairs(section);
    if (enhancePillars(section)) return;

    directLists(section).forEach(function (list) {
      if (list.tagName === "OL") {
        section.classList.add("component-steps");
        list.classList.add("component-list-steps");
      } else if (
        /(^|-)not(-|$)/.test(headingId) ||
        /\bnot\b/i.test(heading.textContent)
      ) {
        section.classList.add("component-exclusions");
        list.classList.add("component-list-exclusions");
      } else if (
        Array.from(list.children).some(function (item) {
          return item.tagName === "LI" && hasFeatureLabel(item);
        })
      ) {
        section.classList.add("component-feature-cards");
        list.classList.add("component-list-feature");
        if (hasOnlyLinkedFeatureItems(list)) {
          list.classList.add("component-linked-list");
        } else {
          Array.from(list.children).forEach(function (item) {
            var action = featureAction(item);
            if (action) action.classList.add("component-card-action");
          });
        }
        if (list.children.length === 2)
          list.classList.add("component-grid-two");
        if (list.children.length === 4)
          list.classList.add("component-grid-four");
      } else {
        section.classList.add("component-checklist");
        list.classList.add("component-list-checklist");
      }
    });

    if (headingId.includes("other-solutions")) {
      section.classList.add("component-link-chips");
    }
  }

  function enhanceEditableContent() {
    if (/^\/privacy-policy\/?$/.test(window.location.pathname)) {
      return;
    }
    document
      .querySelectorAll(
        ".service-page .page-content, .content-page .page-content, .booking-page .page-content",
      )
      .forEach(function (content) {
        if (content.dataset.componentsReady) return;
        content.dataset.componentsReady = "true";
        markLiteralMarkers(content);
        enhanceCatalog(content);
        enhanceStoryGroups(content);
        enhanceTopLevelLinkedCards(content);
        enhanceTopLevelLists(content);
        Array.from(content.querySelectorAll(":scope > h2")).forEach(
          function (heading) {
            enhanceSection(createSection(content, heading));
          },
        );
        enhancePillars(content);
        enhanceTopLevelSteps(content);
        content
          .querySelectorAll(":scope > p, .component-section > p")
          .forEach(function (paragraph) {
            if (isLinkOnlyParagraph(paragraph))
              paragraph.classList.add("component-cta");
          });
      });
  }

  enhanceEditableContent();
})();
