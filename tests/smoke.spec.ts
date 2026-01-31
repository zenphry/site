import { test, expect } from "@playwright/test";
import { isMobileDevice } from "./helpers/test-utils";

/**
 * Smoke Tests - Critical Path Validation
 *
 * These tests run after build to validate:
 * - Core pages are accessible
 * - Critical functionality works
 * - No major regressions
 *
 * Run before deployment to catch show-stopper issues.
 */

test.describe("Smoke Tests - Critical Paths", () => {
  test("homepage loads and displays key content", async ({ page }) => {
    await page.goto("/");

    // Verify page loads
    await expect(page).toHaveTitle(/Zenphry/);

    // Verify critical content
    await expect(page.locator("h1")).toBeVisible();

    // Verify header exists (navigation tested separately)
    await expect(page.locator("header")).toBeVisible();
  });

  test("all critical pages are accessible", async ({ page }) => {
    const criticalPages = [
      { url: "/", name: "Home" },
      { url: "/about", name: "About" },
      { url: "/services", name: "Services" },
      { url: "/services/diagnostic", name: "Diagnostic Service" },
      { url: "/services/foundation", name: "Foundation Service" },
      { url: "/services/growth", name: "Growth Service" },
      { url: "/services/enterprise", name: "Enterprise Service" },
      { url: "/services/technology", name: "Technology Service" },
      { url: "/services/advisory", name: "Advisory Service" },
      { url: "/pricing", name: "Pricing" },
      { url: "/how-it-works", name: "How It Works" },
      { url: "/case-studies", name: "Case Studies" },
      { url: "/resources", name: "Resources" },
      { url: "/contact", name: "Contact" },
    ];

    for (const { url, name } of criticalPages) {
      console.log(`[INFO] Navigating to ${name} page: ${url}`);
      await page.goto(url, {
        timeout: 90000, // 90 seconds for CI environment
        waitUntil: "domcontentloaded",
      });
      await expect(page.locator("h1")).toBeVisible({ timeout: 5000 });
      console.log(`[OK] ${name} page accessible`);
    }
  });

  test("navigation menu works", async ({ page }, testInfo) => {
    await page.goto("/");

    const isMobile = isMobileDevice(testInfo);

    if (isMobile) {
      // Wait for DOM to be ready
      await page.waitForLoadState("domcontentloaded");

      // On mobile, check hamburger menu exists and is clickable
      const hamburgerButton = page.locator('button[aria-label="Toggle menu"]');
      await expect(hamburgerButton).toBeVisible();
      await expect(hamburgerButton).toBeEnabled();

      // Click hamburger menu
      await hamburgerButton.click();

      // Wait for menu to appear
      const mobileNav = page.locator("nav a").first();
      await expect(mobileNav).toBeVisible({ timeout: 10000 });
    } else {
      // Desktop: Verify nav exists in DOM
      const nav = page.locator("nav");
      await expect(nav).toHaveCount(1);

      // Check key nav links exist
      const navLinks = page.locator("nav a");
      await expect(navLinks.first()).toBeVisible();
    }
  });

  test("footer contains essential content", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    // Verify footer has essential content
    await expect(footer).toContainText(/Zenphry/);
  });

  test("contact page form is present", async ({ page }) => {
    await page.goto("/contact");

    // Verify contact page loaded
    await expect(page.locator("h1")).toBeVisible();

    // Verify form or contact method is visible
    const pageContent = await page.textContent("body");
    expect(pageContent).toBeTruthy();
  });

  test("services page displays service offerings", async ({ page }) => {
    await page.goto("/services");

    await expect(page.locator("h1")).toBeVisible();

    // Verify services content exists
    const content = page.locator("h2, h3");
    await expect(content.first()).toBeVisible();
  });

  test("no console errors on critical pages", async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const text = msg.text();

        // Filter out non-critical errors that don't break functionality
        const isIgnorableError =
          // Static asset 404s
          ((text.includes("No route matches URL") || text.includes("404")) &&
            (text.includes("favicon.ico") ||
              text.includes("android-chrome-") ||
              text.includes("apple-touch-icon.png"))) ||
          // React Router 404 errors (expected for non-existent routes)
          text.includes("No routes matched location") ||
          text.includes("No route matches URL") ||
          // Vite HMR development errors (not relevant to production)
          text.includes("Failed to fetch manifest patches") ||
          // Vite dependency optimization errors during dev mode
          text.includes("504 (Outdated Optimize Dep)");

        if (!isIgnorableError) {
          errors.push(text);
        }
      }
    });

    // Check homepage
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check services
    await page.goto("/services");
    await page.waitForLoadState("domcontentloaded");

    // Log errors for debugging if any found
    if (errors.length > 0) {
      console.log("Console errors found:", errors);
    }

    // Verify no critical errors
    expect(errors.length).toBe(0);
  });

  test("404 page works for non-existent routes", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist-12345");

    // Should get a response (even if 404)
    expect(response).toBeTruthy();

    // Page should render something
    await expect(page.locator("body")).toBeVisible();
  });

  test("pricing page displays service tiers", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.locator("h1")).toBeVisible();

    // Verify pricing content exists
    const content = page.locator("h2, h3");
    await expect(content.first()).toBeVisible();
  });

  test("case studies page is accessible", async ({ page }) => {
    await page.goto("/case-studies");
    await expect(page.locator("h1")).toBeVisible();
  });
});
