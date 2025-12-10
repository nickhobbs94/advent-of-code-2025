import { test, expect } from "bun:test";
import { main, parseData, solve } from "./lib";

const testInput = 
`[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
`;

test("test input", () => {
  expect(main(testInput)).toBe(7);
});


test("test parser 1", () => {
  expect(parseData(testInput)[0][0]).toBe(6);
});

test("test parser 2", () => {
  expect(parseData(testInput)[0][1])
  .toEqual([[3], [1,3], [2], [2,3], [0,2], [0,1]]);
});


// test("test parser internal len", () => {
//   expect(parseData(testInput)[0].length).toBe(4);
// });

