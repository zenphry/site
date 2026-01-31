import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Configuration for Deployed Environments
 * Runs smoke tests against actual deployed URLs (dev.zenphry.com, zenphry.com)
 *
 * Usage:
 *   TEST_URL=https://dev.zenphry.com npx playwright test --config=playwright.config.deployed.ts
 *   TEST_URL=https://zenphry.com npx playwright test --config=playwright.config.deployed.ts
 */

// Get the test URL from environment variable (required)
const TEST_URL = process.env.TEST_URL;

if (!TEST_URL) {
  throw new Error(
    "TEST_URL environment variable is required. Example: TEST_URL=https://dev.zenphry.com",
  );
}

console.log(`Running smoke tests against: ${TEST_URL}`);

export default defineConfig({
  testDir: "./tests",

  // Only run smoke tests
  testMatch: "**/smoke.spec.ts",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ["html", { outputFolder: "playwright-report-deployed" }],
    ["list"],
  ],

  use: {
    // Use the deployed URL as base
    baseURL: TEST_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    // Longer timeouts for deployed sites and self-hosted runners
    actionTimeout: 30000, // 30s for click/type actions
    navigationTimeout: 60000, // 60s for page.goto()
  },

  // Longer overall timeout for deployed tests on self-hosted runners
  timeout: 120000, // 2 minutes per test

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  // No webServer - testing deployed site
});
