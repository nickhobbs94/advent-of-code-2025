import { test, expect } from "bun:test";
import { main } from "./lib";

const testInput = `
`;

test("test input", () => {
  expect(main(testInput)).toBe(undefined);
});
