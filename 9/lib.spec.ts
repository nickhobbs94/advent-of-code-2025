import { test, expect } from "bun:test";
import { main, parseData } from "./lib";

const testInput = 
`7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`;

test("test input", () => {
  expect(main(testInput)).toBe(24);
});


// test("test parser len", () => {
//   expect(parseData(testInput).length).toBe(4);
// });

// test("test parser internal len", () => {
//   expect(parseData(testInput)[0].length).toBe(4);
// });

