import { expect, test } from "vitest";
import { goodbye, hello } from "../hello";

test("say hello", () => {
  expect(hello("John")).toBe("Hello, John!");
  expect(hello("Jane")).toBe("Hello, Jane!");
});

test("say goodbye", async () => {
  expect(await goodbye()).toBe("Goodbye, John Doe!");
});
