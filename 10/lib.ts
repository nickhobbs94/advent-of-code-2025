function assert(b: boolean) {
    if (!b) throw new Error("Failed assert");
}

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

function parseJoltage(s: string) {
    assert(s[0] === '{' && s[s.length-1] === '}');
    s = s.slice(1,s.length-1);
    return s.split(',').map(i => parseInt(i));
}

export function parseData(data: string){
    return data.split('\n').filter(row => !!row)
        .map(row => {
            const items = row.split(' ');
            return [
                parseGoal(items[0]), 
                parseConnections(items.slice(1,items.length-1)),
                parseJoltage(items[items.length-1]),
            ]}
        ) as [number, number[][], number[]][];
}

export class Lights {
    private arrayLen: number;
    constructor(private buttons: number[][]){
        this.arrayLen = buttons.reduce((acc,e) => Math.max(
            e.reduce((acc2, e2) => Math.max(acc2, e2), 0)
            ,acc), 0);
    }

    private button(i: number, output: number[]): number[] {
        for (let b of this.buttons[i]) {
            output[b] ??= 0;
            output[b]++;
        }
        return output;
    }

    switch(inputs: number[]): number[] {
        let output = Array(this.arrayLen+1).fill(0);
        for (let i=0; i<inputs.length; i++) {
            this.button(inputs[i], output);
        }
        return output;
    }
}

export class ButtonPresser {
    private i: number;
    constructor(private buttons: unknown[]){
        this.i = 0;
    }

    iter(): number[] {
        let ans = this.get();
        this.i++;
        return ans;
    }

    set(i: number) {
        this.i = i;
    }

    private get(): number[] {
        if (this.i === 0) return [0];
        let result = [];

        let x = this.i

        let d = this.buttons.length;
        while (x) {
            let r = x % d;
            result.push(r);
            x = Math.floor(x / d);
        }
        
        return result;
    }
}

function goalHit(goal: number[], lights: number[]) {
    // console.log(goal, lights)
    for (let i=0; i<goal.length; i++) {
        if (goal[i] !== (lights[i] ?? 0)) return false;
    }
    return true;
}

export function solve(goal: number[], buttons: number[][]) {
    const lights = new Lights(buttons);
    const presser = new ButtonPresser(buttons);
    while (true) {
        let i = presser.iter();
        const output = lights.switch(i);
        if (goalHit(goal, output)) {
            return i.length;
        }
    }
}

export function main(data: string) {
    const inputs = parseData(data);
    
    let sum = 0;
    for (let i of inputs) {
        const result = solve(i[2], i[1]);
        console.log(result);
        sum += result;
    }
    return sum;
}


