import { expect, test } from "vitest";
import { hello } from "../hello";

test("adds 1 + 2 to equal 3", () => {
  expect(hello("John")).toBe("Hello, John!");
  expect(hello("Jane")).toBe("Hello, Jane!");
});
