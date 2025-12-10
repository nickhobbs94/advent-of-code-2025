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

enum Direction {
    N = "N",
    E = "E",
    S = "S",
    W = "W",
}

enum Corner {
    Straight,
}

function dir(a,b) {
    if (a[1] < b[1]) return Direction.S;
    if (a[1] > b[1]) return Direction.N;
    if (a[0] < b[0]) return Direction.E;
    if (a[0] > b[0]) return Direction.W;
    throw new Error("Unhandled exception");
}

export function main(data: string) {
    const corners = parseData(data);
    const augmentedCorners = [];

    for (let i=0; i<corners.length; i++) {
        let prev = corners[(i-1+corners.length) % corners.length];
        let curr = corners[i];
        let next = corners[(i+1) % corners.length];

        let before = dir(prev, curr);
        let after = dir(curr, next);

        const turns = {
            [Direction.N]: {
                [Direction.N]: "Straight",
                [Direction.S]: "IMPOSSIBLE",
                [Direction.E]: "Right",
                [Direction.W]: "Left",
            },
            [Direction.S]: {
                [Direction.N]: "IMPOSSIBLE",
                [Direction.S]: "Straight",
                [Direction.E]: "Left",
                [Direction.W]: "Right",
            },
            [Direction.E]: {
                [Direction.N]: "Left",
                [Direction.S]: "Right",
                [Direction.E]: "Straight",
                [Direction.W]: "IMPOSSIBLE",
            },
            [Direction.W]: {
                [Direction.N]: "Right",
                [Direction.S]: "Left",
                [Direction.E]: "IMPOSSIBLE",
                [Direction.W]: "Straight",
            },
        };

        console.log(prev, curr, next, turns[before][after], before, after)
        
    }

}


