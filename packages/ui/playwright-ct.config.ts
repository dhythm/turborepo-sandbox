import { defineConfig, devices } from "@playwright/experimental-ct-react";
import baseConfig from "@repo/playwright-ct-utilities/playwright-ct.config";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...baseConfig,
  testDir: "./",
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: "./__snapshots__",
});
