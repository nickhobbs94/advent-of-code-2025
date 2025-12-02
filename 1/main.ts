import lines from "./input.txt" with { type: "text" };

const interpret = cmd => ({'L':-1,'R':1}[cmd[0]]) * parseInt(cmd.slice(1));

const trace = [];

let inputs = lines.split('\n')
  .filter(l => !!l)
//  .filter((_,i) => i<50)
  .map(interpret);


const isDial = n => ((n%100)+100)%100 === 0;
const species = n => n < 0 ? Math.ceil((n+1)/100)-1 : Math.floor(n/100);

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




