import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e", // テストディレクトリ
  use: {
    headless: true, // ヘッドレスモード
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
