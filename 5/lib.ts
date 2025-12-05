import assert from "node:assert/strict";

export function main(data: string): number {
    const rows = data.split('\n');
    const newline = rows.findIndex(row => row === '');
    assert(newline);
    const ranges = rows.slice(0,newline)
      .filter(row => !!row)
      .map(row => row.split('-').map(n => parseInt(n)));
    
    const ids = rows
      .slice(newline)
      .filter(row => !!row)
      .map(n => parseInt(n));

    const inRange = id => !!ranges.find(range => range[0] <= id && range[1] >= id)

    return ids.map(id => inRange(id)).filter(e => e).length;
}

