
function maxJolts(bank: string) {
  let best = 0;
  for (let i=0; i<bank.length-1; i++) {
    for (let j=i+1; j<bank.length; j++) {
      const jolts = parseInt(bank[i] + bank[j]);
      if (jolts > best) best = jolts;
    }
  }
  return best;
}


export function main(data: string) {
  const banks = data.split('\n');

  let sum = 0;
  for (let bank of banks) {
    sum += maxJolts(bank);
  }
  return sum;
}

