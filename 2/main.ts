import lines from "./input.txt" with { type: "text" };

let interpret = s => s.split('-').map(x => parseInt(x));
let inputs = lines.split(',')
.filter(l => !!l)
.map(interpret);

//console.log(inputs);

function validId(n) {
  const s = `${n}`;
  if (s.length === 1) return true;
  for (let seqLen = 1; seqLen <= s.length /2; seqLen++) {
    if (s.length % seqLen !== 0) continue;
    //if ((s.length / seqLen) % 2 !== 0) continue;
    const seq = s.slice(0,seqLen);
    let valid = false;
    for (let i=seqLen; i<s.length; i+=seqLen) {
      const part = s.slice(i, i+seqLen);
      if (part !== seq) valid = true;
    }
    if (!valid) return false;
  }
  return true;
}

let sum = 0;
for (const bounds of inputs) {
  for (let i = bounds[0]; i<=bounds[1]; i++) {
    if (!validId(i)) {
      sum+=i;
      console.log(i);
    }
  }
}
console.log(sum);


