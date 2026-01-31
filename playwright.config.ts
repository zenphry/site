import { defineConfig, devices } from "@playwright/test";

// Use dynamic port for self-hosted runners to avoid conflicts
// Falls back to 5173 if not set
const port = process.env.PLAYWRIGHT_PORT || 5173;
const baseURL = `http://localhost:${port}`;

/**
 * Playwright E2E Test Configuration
 * Tests SEO features, navigation, and user interactions
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined, // Parallel execution for faster smoke tests
  reporter: "html",

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",

    // Increase timeouts for slower self-hosted runners
    actionTimeout: 30000, // 30s for click/type actions
    navigationTimeout: 60000, // 60s for page.goto()
  },

  // Increase overall test timeout for self-hosted runners
  timeout: 120000, // 2 minutes

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

  webServer: {
    // Serve deployment build from build/ directory using Wrangler
    // Smoke tests validate the exact artifact that will be deployed (downloaded from R2)
    // This ensures parity between tested code and deployed code
    // Use --host 0.0.0.0 to bind to all interfaces (needed for EKS runners)
    command: `npx wrangler dev --port ${port} --host 0.0.0.0`,
    url: baseURL,
    // Allow reusing existing server on self-hosted runners to avoid port conflicts
    reuseExistingServer: true,
    timeout: 120 * 1000, // 2 minutes should be enough
    stdout: "pipe",
    stderr: "pipe",
  },
});
