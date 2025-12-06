import { test, expect } from "bun:test";
import { main, parseData } from "./lib";

const testInput = 
`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

test("test input", () => {
  expect(main(testInput)).toBe(4277556);
});

// test("test parser", () => {
//   expect(parseData('12 34\n5 7')).toEqual([['12', '34'], ['5','7']]);
// });

// test("test parser len", () => {
//   expect(parseData(testInput).length).toBe(4);
// });

// test("test parser internal len", () => {
//   expect(parseData(testInput)[0].length).toBe(4);
// });

