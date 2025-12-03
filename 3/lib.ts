
function maxJolts(bank: string, best: number, remaining: number, prefix: string) {
  if (remaining === 0) return parseInt(prefix);

  for (let i=0; i<=bank.length-remaining; i++) {
    let newprefix = prefix + bank[i];
    let rbank = bank.slice(i+1);
    let rbest = maxJolts(rbank, best, remaining-1, newprefix);
    if (rbest > best) best = rbest;
  }

  return best;
}


export function main(data: string) {
  const banks = data.split('\n');

  let sum = 0;
  let count = 0;
  for (let bank of banks) {
    console.log(count++, banks.length);
    sum += maxJolts(bank, 0, 12, '');
  }
  return sum;
}

