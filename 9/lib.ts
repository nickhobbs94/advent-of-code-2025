import assert from "node:assert/strict";

export function parseData(data: string): [number, number][]{
    return data.split('\n').filter(row => !!row)
        .map(row => row.split(',').map(e=>parseInt(e))) as [number, number][];
}

function fillGreenLines(corners: [number, number][], green: Set<string>) {
    for (let i=0; i<corners.length; i++) {
        const a = corners[i];
        const b = corners[(i+1)% corners.length];

        const dx = b[0] - a[0];
        const dy = b[1] - a[1];

        for (let x=1; x<dx; x++) {green.add(`${a[0]+x},${a[1]}`);}
        for (let x=-1; x>dx; x--) {green.add(`${a[0]+x},${a[1]}`);}
        for (let y=1; y<dy; y++) {green.add(`${a[0]},${a[1]+y}`);}
        for (let y=-1; y>dy; y--) {green.add(`${a[0]},${a[1]+y}`);}
    }
}


function fillGreenSpace(corners: [number, number][], greenSet: Set<string>, width: number, height: number) {
    const redSet = new Set(corners.map(c => `${c[0]}, ${c[1]}`));
    const red = (x,y) => redSet.has(`${x},${y}`);
    const green = (x,y) => greenSet.has(`${x},${y}`);
    const boundary = (x: number,y:number) => red(x,y) || green(x,y);

    for (let y=0; y<height; y++) {
        console.log("Line", y, "/", height);
        let inside = false;
        let edge = false;
        let lastred = false;
        for (let x=0; x<width; x++) {
            if (!boundary(x,y) && !inside) continue;
            if (inside && !boundary(x,y)) {
                greenSet.add(`${x},${y}`);
            }
            if (inside && edge && !red(x,y)) {
                continue;
            }
            if (inside && edge && red(x,y)) {
                edge = false;
                lastred = true;
                continue;
            }
            if (lastred && green(x,y)) {
                edge = true;
                lastred = false;
                continue;
            }

            if (boundary(x,y) && !inside) {
                lastred = true;
                inside = true;
                continue;
            }

            throw new Error(`Unhandled ${JSON.stringify({inside, edge, lastred, x, y, red: red(x,y), green: green(x,y)})}`);
        }
    }
}

function printGrid(corners: [number, number][], green: Set<string>, width: number, height: number) {
    let s = '';
    for (let y=0; y<height; y++) {
        for (let x=0; x<width; x++) {
            if (green.has(`${x},${y}`)) {
                s += 'X';
            } else if (corners.filter(c => c[0] === x && c[1] === y).length) {
                s += '#';
            } else {
                s += '.';
            }
        }
        s += '\n';
    }
    console.log(s);
}

function area(a,b) {
    const X = Math.abs(b[0] - a[0]) + 1;
    const Y = Math.abs(b[1] - a[1]) + 1;
    return X*Y;
}

export function main(data: string) {
    const corners = parseData(data);
    const width = corners.reduce((acc, e) => Math.max(acc, e[0]), 0) + 1;
    const height = corners.reduce((acc, e) => Math.max(acc, e[1]), 0) + 1;
    const green = new Set<string>();
    fillGreenLines(corners, green);
    console.log("Lines done");
    fillGreenSpace(corners, green, width, height);
    console.log("Space done");
    
    const valid = (a, b, corners: [number, number][], greenSet: Set<string>) => {
        const redSet = new Set(corners.map(c => `${c[0]}, ${c[1]}`));
        const red = (x,y) => redSet.has(`${x},${y}`);
        const green = (x,y) => greenSet.has(`${x},${y}`);
        const inside = (x: number,y:number) => red(x,y) || green(x,y);
        let W = b[0] - a[0];
        let H = b[1] - a[1];
        let dx = 1;
        let dy = 1;

        if (W < 0) dx = -1;
        if (H < 0) dy = -1;

        for (let y=a[1]; y!==b[1]; y+=dy) {
            for (let x=a[0]; x!==b[0]; x+=dx) {
                if (!inside(x,y)) return false;
            }
        }

        return true;

    }

    // printGrid(corners, green, width, height);

    let largest = 0;
    for (let i=0; i<corners.length-1; i++) {
        for (let j=i+1; j<corners.length; j++) {
            console.log(i,j);
            const a = corners[i];
            const b = corners[j];
            if (!valid(a,b, corners, green)) continue;
            largest = Math.max(area(a,b), largest);
        }
    }
    return largest;
}


