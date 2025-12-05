import { test, expect } from "bun:test";
import { main } from "./lib";

const testInput = 
`3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

test("test input", () => {
  expect(main(testInput)).toBe(14);
});


test("test pathological", () => {
  const input = `10-11
  9-12
  8-13
  
  `;
  expect(main(input)).toBe(6);
})
