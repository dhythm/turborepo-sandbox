const path = require("node:path");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.spec.json" }],
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: [
    "**/__tests__/**/*.(ts|tsx)",
    "**/?(*.)+(spec|test).(ts|tsx)",
    "!**/*.playwright-ct.(ts|tsx)",
  ],
  setupFilesAfterEnv: [path.resolve(__dirname, "./jest.setup.js")],
};
