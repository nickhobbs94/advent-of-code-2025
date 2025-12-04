
const dirs = [
  [-1,-1], [0,-1], [1,-1],
  [-1,0], [1,0],
  [-1,1], [0,1], [1,1],
];

export function main(data: string) {
  const banks = data.split('\n').map(row => row.split(''));
  const ans = data.split('\n').map(row => row.split(''));

  const width = banks[0].length;
  const height = banks.length;

  const rollLimit = 4;

  let count = 0;
  for (let y=0; y<height; y++) {
    for (let x=0; x<width; x++) {
      if (banks[y][x] !== '@') continue;
      let rolls = 0;

      for (let d of dirs) {
        const p = banks[y+d[1]]?.[x+d[0]];
        console.log(x,y,d,p);
        if (p === '@') {
          rolls++;
        }
      }

      if (rolls < rollLimit) {
        count++;
      }
      ans[y][x] = `${rolls}`;
    }
  }

  console.log(banks.map(row => row.join('')).join('\n'));
  return count;
}

