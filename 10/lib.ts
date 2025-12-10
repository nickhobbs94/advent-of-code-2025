import assert from "node:assert/strict";

function parseGoal(s: string){
    let goal = 0;
    assert(s[0] === '[' && s[s.length-1] === ']');
    for (let i = 1; i<s.length-1; i++) {
        if (s[i] === '#') {
            goal += 2**(i-1);
        }
    }
    return goal;
}

function parseConnections(s: string[]) {
    return s.map(e => {
        assert(e[0] === '(' && e[e.length-1] === ')');
        e = e.slice(1,e.length-1);
        return e.split(',').map(i => parseInt(i));
    })
}

export function parseData(data: string){
    return data.split('\n').filter(row => !!row)
        .map(row => {
            const items = row.split(' ');
            return [
                parseGoal(items[0]), 
                parseConnections(items.slice(1,items.length-1)),
                [],
            ]}
        ) as [number, number[][], number[]][];
}

class Lights {
    constructor(private buttons: number[][]){}

    private button(i: number): number {
        let output = 0;
        for (let b of this.buttons[i]) {
            output += 2**b;
        }
        return output;
    }

    switch(input: number): number {
        let output = 0;
        for (let i=0; i<this.buttons.length; i++) {
            if (input & 2**i) {
                output ^= this.button(i);
            }
        }
        return output;
    }
}

const countbits = (n: number): number => !n ? 0 : (n & 1) + countbits(n >>= 1);

export function solve(goal: number, buttons: number[][]) {
    const lights = new Lights(buttons);
    let best;
    for (let i=0; i<2**buttons.length; i++) {
        const output = lights.switch(i);
        if (output === goal) {
            best ??= countbits(i);
            best = Math.min(countbits(i), best);
        }
    }
    return best;
}

export function main(data: string) {
    const inputs = parseData(data);
    
    let sum = 0;
    for (let i of inputs) {
        sum += solve(i[0], i[1]);
    }
    return sum;
}


