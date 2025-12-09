import assert from "node:assert/strict";

export function parseData(data: string): [number, number][]{
    return data.split('\n').filter(row => !!row)
        .map(row => row.split(',').map(e=>parseInt(e))) as [number, number][];
}

export function main(data: string) {
    let largest = 0;
    const corners = parseData(data);
    for (let i=0; i<corners.length-1; i++) {
        for (let j=i+1; j<corners.length; j++) {
            const a = corners[i];
            const b = corners[j];
            const area = (Math.abs(a[0]-b[0])+1)*(Math.abs(a[1]-b[1])+1);
            largest = Math.max(area, largest);
        }
    }
    return largest;
}

