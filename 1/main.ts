import lines from "./input.txt" with { type: "text" };

const interpret = cmd => ({'L':-1,'R':1}[cmd[0]]) * parseInt(cmd.slice(1));

let ans = lines.split('\n')
  .filter(l => !!l)
  .map(interpret);

console.log(ans);

ans = ans.reduce((acc,e) => {
  let n = acc[acc.length-1]+e;
  n = ((n%100)+100)%100;
  acc.push(n);
  return acc;
}, [50]);

console.log(ans);

console.log(ans.filter(e => e===0).length)

