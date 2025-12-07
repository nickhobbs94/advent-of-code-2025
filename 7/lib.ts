import assert from "node:assert/strict";

export function parseData(data: string) {
    return data.split('\n').filter(row => !!row).reverse();
}

export function main(data: string) {
    const rows = parseData(data);

    let row = rows.pop().split('');
    let positions = new Set();
    positions.add(row.findIndex(s => s === 'S'));

    let splitcount = 0;
    while (rows.length) {
        row = rows.pop().split('');
        for (let i=0; i<row.length; i++) {
            if (positions.has(i) && row[i] === '^') {
                positions.delete(i);
                positions.add(i+1);
                positions.add(i-1);
                row[i-1] = '|';
                splitcount++;
            }
            row[i] = positions.has(i) ? '|' : row[i];
        }
        console.log(row.join(''));
    }

    return splitcount;
}

