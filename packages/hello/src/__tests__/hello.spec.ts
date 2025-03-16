import { expect, test } from "vitest";
import { hello } from "../hello";

test("say hello", () => {
  expect(hello("John")).toBe("Hello, John!");
  expect(hello("Jane")).toBe("Hello, Jane!");
});
