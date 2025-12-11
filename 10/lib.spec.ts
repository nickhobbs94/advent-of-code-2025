import { test, expect } from "bun:test";
import { main, parseData, ButtonPresser, Lights, solve } from "./lib";

const testInput = 
`[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
`;

test("test input", () => {
  expect(main(testInput)).toBe(33);
});


test("test parser 1", () => {
  expect(parseData(testInput)[0][0]).toBe(6);
});

test("test parser 2", () => {
  expect(parseData(testInput)[0][1])
  .toEqual([[3], [1,3], [2], [2,3], [0,2], [0,1]]);
});

test("test parser 3", () => {
  expect(parseData(testInput)[0][2]).toEqual([3,5,4,7]);
});

test("test sequence t=0", () => {
  const p = new ButtonPresser(['0', '1', '2']);
  expect(p.iter()).toEqual([0]);
})

test("test sequence t=1", () => {
  const p = new ButtonPresser(['0', '1', '2']);
  let ans = [];
  for (let i=0; i<10; i++) {
    ans.push(p.iter());
  }
  expect(ans).toEqual([[0], [1], [2], [0,1], [1,1], [2,1], [0,2], [1,2], [2,2], [0,0,1]]);
})

test("test lights 1", () => {
  const l = new Lights([[3], [1,3], [2], [0,2]]);
  expect(l.switch([])).toEqual([0,0,0,0]);
})

test("test lights 2-1", () => {
  const l = new Lights([[3], [1,3], [2], [0,2]]);
  expect(l.switch([1])).toEqual([0,1,0,1]);
})

test("test lights 2-2", () => {
  const l = new Lights([[3], [1,3], [2], [0,2]]);
  expect(l.switch([2])).toEqual([0,0,1,0]);
})

test("test lights 2-3", () => {
  const l = new Lights([[3], [1,3], [2], [0,2]]);
  expect(l.switch([0,0])).toEqual([0,0,0,2]);
})

test("test lights 2-4", () => {
  const l = new Lights([[3], [1,3], [2], [0,2]]);
  expect(l.switch([0,1,3])).toEqual([1,1,1,2]);
})

test("test solve 1", () => {
  const data = parseData(testInput);
  const goal = data[0][2];
  const buttons = data[0][1];
  const result = solve(goal, buttons);
  expect(result).toBe(10);
})
