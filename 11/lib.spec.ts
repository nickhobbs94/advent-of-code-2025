import { test, expect } from "bun:test";
import { main, parseData, ButtonPresser, Lights, solve } from "./lib";

const testInput = 
`aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out
`;

test("test input", () => {
  expect(main(testInput)).toBe(5);
});

