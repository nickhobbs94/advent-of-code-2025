import assert from "node:assert/strict";

export function parseData(data: string) {
    const rows = data.split('\n').filter(row => !!row);
    const separators = [];
    for (let i=0; i<rows[0].length; i++) {
        let found = true;
        for (let y=0; y<rows.length; y++) {
            if (rows[y][i] !== ' ') found = false;
        }
        if (found) separators.push(i);
    }
    separators.push(rows[0].length)

    const groups = [];
    for (let i=0; i<separators.length; i++) {
        const max = separators[i] ?? rows[0].length;
        let min = separators[i-1];
        if (min) min++;
        min ??= 0;

        const group = [];
        for (let col = min; col<max; col++) {
            let s = '';
            for (let y=0; y<rows.length-1; y++) {
                s += rows[y][col];
            }
            group.push(parseInt(s));
        }
        group.push(rows[rows.length-1].slice(min,max).replace(/\s+/g, ''));
        groups.push(group);
    }
    return groups;
}

export function main(data: string) {
    const inputs = parseData(data);

    return inputs.reduce((sum, g) => {
        const cmd = g.pop() as string;

        const n = g.map(e => parseInt(e));
        
        if (cmd === '*') return sum +n.reduce((a,e) => a*e,1);
        if (cmd === '+') return sum +n.reduce((a,e) => a+e,0);

        throw new Error(`New cmd ${cmd}`)
    }, 0)

    
}

