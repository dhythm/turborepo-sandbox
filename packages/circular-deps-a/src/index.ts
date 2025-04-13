import { b } from "@repo/circular-deps-b";

export const a = "a";
console.log(b);

export * from "./foo";
export * from "./bar";
