import assert from "node:assert/strict";

type R = [number, number];

export function main(data: string): number {
    const rows = data.split('\n');
    const newline = rows.findIndex(row => row === '');
    assert(newline);
    //@ts-ignore
    const ranges: [number, number][] = rows.slice(0,newline)
      .filter(row => !!row)
      .map(row => row.split('-').map(n => parseInt(n)));
  
    const disjoint = (r1: R,r2: R) => {
      if (r1[1] < r2[0]) return true;
      if (r2[1] < r1[0]) return true;
    }

    const intersection = (r1: R | null, r2: R | null): R | null => {
      if (disjoint(r1, r2)) return null;
      return [
        Math.max(r1[0], r2[0]),
        Math.min(r1[1], r2[1]),
      ]
    }

    const combine = (acc: R[], r: R): R[] => {
      const overlaps = acc.filter(e => !!intersection(e, r))
      const easy = acc.filter(e => !intersection(e, r));

      const min = overlaps.reduce((m, e) => m < e[0] ? m : e[0], r[0]);
      const max = overlaps.reduce((m, e) => m > e[1] ? m : e[1], r[1]);

      return [...easy, [min, max]];
    }

    const distinct = ranges.reduce(combine, []);

    const width = (r: R) => r[1] - r[0] + 1;

    return distinct.reduce((acc, r) => acc + width(r), 0)

}

