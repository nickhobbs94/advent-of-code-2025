import assert from "node:assert/strict";

export function parseData(data: string) {
    return data.split('\n').filter(row => !!row).reverse();
}

export function main(data: string) {
    const rows = parseData(data);

    let row = rows.pop().split('');
    let positions = [];
    positions[row.findIndex(s => s === 'S')] = 1;

    while (rows.length) {
        row = rows.pop().split('');
        let newpos = positions.slice();
        for (let i=0; i<row.length; i++) {
            if (row[i] === '^') {
                newpos[i-1] ??= 0;
                newpos[i+1] ??= 0;
                newpos[i-1] += positions[i];
                newpos[i+1] += positions[i];
                newpos[i] = 0;
            }
        }
        positions = newpos;
    }

    return positions.reduce((acc, e) => acc + e, 0);
}

