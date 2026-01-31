import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Configuration for Production Smoke Tests
 *
 * Minimal, lightweight tests for production deployment verification.
 * - Only 5 core pages
 * - Single browser (chromium)
 * - No retries
 * - No parallelization (reduce Worker load)
 *
 * Usage:
 *   TEST_URL=https://zenphry.com npx playwright test --config=playwright.config.prod.ts
 */

const TEST_URL = process.env.TEST_URL;

if (!TEST_URL) {
  throw new Error(
    "TEST_URL environment variable is required for production smoke tests. Example: TEST_URL=https://zenphry.com",
  );
}

console.log(`Running production smoke tests against: ${TEST_URL}`);

export default defineConfig({
  testDir: "./tests",

  // Only run lightweight production smoke tests
  testMatch: "**/smoke-prod.spec.ts",

  // Sequential execution to reduce Worker load
  fullyParallel: false,
  workers: 1,

  // No retries for production (fail fast)
  retries: 0,

  // Fail fast on first error
  forbidOnly: !!process.env.CI,

  reporter: [
    ["html", { outputFolder: "playwright-report-deployed" }],
    ["list"],
  ],

  use: {
    baseURL: TEST_URL,
    trace: "off", // No traces for lightweight tests
    screenshot: "only-on-failure",
    video: "off", // No video to reduce overhead

    // Reasonable timeouts
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  // 60 seconds per test max
  timeout: 60000,

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
