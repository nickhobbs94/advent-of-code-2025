import { test, expect } from "bun:test";
import { main } from "./lib";

const testInput = 
`svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out
`;

test("test input", () => {
  expect(main(testInput)).toBe(2);
});

