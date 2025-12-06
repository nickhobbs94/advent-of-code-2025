import assert from "node:assert/strict";

export function parseData(data: string) {
    return data.split('\n')
        .filter(row => !!row)
        .map(row => row
            .replace(/^\s+/, '')
            .replace(/\s+/g, ' ')
            .split(' '));

}

function transpose<T>(grid: T[][]): T[][] {
    let height = grid.length;
    let width = grid[0].length;

    const result = [];
    for (let x=0; x<width; x++) {
        if (!grid[0][x]) continue;
        result.push([]);
        for (let y=0; y<height; y++) {
            result[x][y] = grid[y][x];
        }
    }

    return result;
}

export function main(data: string) {
    const inputs = parseData(data);

    const ops = transpose(inputs);

    return ops.reduce((sum, g) => {
        const cmd = g.pop() as string;

        const n = g.map(e => parseInt(e));
        
        if (cmd === '*') return sum +n.reduce((a,e) => a*e,1);
        if (cmd === '+') return sum +n.reduce((a,e) => a+e,0);

        throw new Error(`New cmd ${cmd}`)
    }, 0)

    
}

