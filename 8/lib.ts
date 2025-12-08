import assert from "node:assert/strict";

export function parseData(data: string): [number, number, number][] {
    return data.split('\n').filter(row => !!row)
    .map(row => row.split(',').map(e => parseInt(e))) as [number, number, number][];
}

function d(a: [number, number, number],b: [number, number, number]) {
    return Math.sqrt(
        (a[0] - b[0])**2 
        + (a[1] - b[1])**2 
        + (a[2] - b[2])**2 
    )
}

export function closest(boxes: [number, number, number][]) {
    let distances = [];
    for (let i=0; i<boxes.length-1; i++) {
        let a = boxes[i];
        for (let j=i+1; j<boxes.length; j++) {
            let b = boxes[j];
            let distance = d(a,b);
            distances.push({distance, pair: [a,b]});
        }
    }
    distances.sort((d1, d2) => d1.distance - d2.distance);
    return distances;
}

let idCounter=0;
const allcircs = [];
function newCircuit() {
    const c = {id: idCounter++, boxCount: 0, deleted: false}
    allcircs.push(c);
    return c;
}

function follow(c) {
    if (!c) return null;
    if (c.deleted) return follow(c.deleted);
    return c;
}

function connect(circuits, a, b) {
    // console.log('connecting', [a,b])
    let aptr = follow(circuits[`${a}`]);
    let bptr = follow(circuits[`${b}`]);
    if (aptr && bptr && (aptr !== bptr)) {
        aptr.boxCount += bptr.boxCount;
        bptr.deleted = aptr;
    } else if (!aptr && bptr) {
        aptr = bptr;
        aptr.boxCount++;
    } else if (aptr && !bptr) {
        aptr.boxCount++;
        bptr = aptr;
    } else if (!aptr && !bptr) {
        aptr = newCircuit();
        bptr = aptr;
        aptr.boxCount = 2;
    }

    circuits[`${a}`] = aptr;
    circuits[`${b}`] = aptr;
    // console.log(allcircs);
}

export function main(data: string) {
    const boxes = parseData(data);

    const circuits = {};

    const next = closest(boxes);

    const allconnected = () => {
        for (let box of boxes) {
            if (!circuits[`${box}`]) return false;
        }
        return true;
    }

    let last = null;
    for (const c of next) {
        const [a,b] = c.pair;
        connect(circuits, a, b);
        if (allconnected()) {
            console.log("ALLCON", a, b);
            return a[0] * b[0];
            break;
        }
    }
    
    return 0;
}

