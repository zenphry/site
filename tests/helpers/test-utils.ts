/**
 * Shared test utilities for Playwright E2E tests
 */

import { test, type TestInfo } from "@playwright/test";

/**
 * Skip test if running on mobile device
 * Use in beforeEach: skipOnMobile(testInfo)
 */
export function skipOnMobile(testInfo: TestInfo) {
  const isMobile = testInfo.project.name.includes("mobile");
  if (isMobile) {
    test.skip();
  }
}

/**
 * Skip test if running on desktop device
 * Use in beforeEach: skipOnDesktop(testInfo)
 */
export function skipOnDesktop(testInfo: TestInfo) {
  const isMobile = testInfo.project.name.includes("mobile");
  if (!isMobile) {
    test.skip();
  }
}

/**
 * Check if current test is running on mobile device
 */
export function isMobileDevice(testInfo: TestInfo): boolean {
  return testInfo.project.name.includes("mobile");
}
