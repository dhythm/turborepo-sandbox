import { expect, test } from "@playwright/test";

test("app", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/Turborepo Sandbox/);
});
