
function maxJolts(bank: string) {
  let best = 0;
  let remaining = 12;
  let prefix = '';
  let n = 9;
  while (n>0 && remaining > 0) {
    let next = bank.indexOf(`${n}`);
    if (next<0 || next+remaining > bank.length) {
      n--;
    } else {
      bank = bank.slice(next+1);
      prefix = `${prefix}${n}`;
      remaining--;
      n = 9;
    }
  }
  if (n===0 && remaining > 0) throw new Error(`Failed ${n}, ${remaining}, ${bank}, ${prefix}`);
  const result = parseInt(prefix);
  return result;
}


export function main(data: string) {
  const banks = data.split('\n').filter(line => !!line);

  let sum = 0;
  let count = 0;
  for (let bank of banks) {
    sum += maxJolts(bank);
  }
  return sum;
}

