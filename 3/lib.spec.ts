import { test, expect } from "bun:test";
import { main } from "./lib";

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

test("test input", () => {
  expect(main(testInput)).toBe(357);
});
