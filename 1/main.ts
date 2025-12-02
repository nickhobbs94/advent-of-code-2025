import { readFileSync } from "fs";
import {species, isDial, interpret} from "./lib";

const lines = readFileSync("input.txt", "utf-8");

const trace = [];

let inputs = lines.split('\n')
  .filter(l => !!l)
  .map(interpret);


let count = 0;
let pos = inputs.reduce((acc,e) => {
  const t = {input: e >= 0 ? `+${e}\t` : `${e}\t`, positions: [], count: 0, dial: false};
  let n1 = acc[acc.length-1];
  const n2 = n1 + e;
  t.positions.push(n2);
  const species1 = species(n1);
  const species2 = species(n2);
  t.positions.push(species2);

  t.count = Math.abs(species1 - species2);

  if (e<0 && isDial(n1)) t.count--;
  if (e<0 && isDial(n2)) t.count++;

  t.dial = isDial(n2);

  count += t.count;
  
  trace.push(t);
  acc.push(n2);
  return acc;
}, [50]);

console.log("0\t", 0, '50');
for (const t of trace) {
  console.log(t.input, t.count, t.positions.join('\t'), '\t', t.dial);
}

console.log(count);




