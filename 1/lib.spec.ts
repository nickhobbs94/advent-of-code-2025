
import { test, expect } from "bun:test";
import { species } from "./lib";

/*
-200:-101 species -2
-100:-1 species -1
0:99 species 0
100:199 species 1
*/

test("species test", () => {
  expect(species(-200)).toBe(-2);
  expect(species(-201)).toBe(-3);
  expect(species(-199)).toBe(-2);
});
