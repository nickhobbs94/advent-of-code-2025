function assert(b: boolean) {if (!b) throw new Error("Failed assert");}

export function parseData(data: string){
    return data.split('\n')
        .filter(row => !!row)
        .map(row => {
            const [pre, post] = row.split(': ');
            return [pre, post.split(' ')];
        }) as [string, string[]][];
}

class Network {
    graph: Record<string, string[]>;
    constructor(inputs: [string, string[]][]) {
        this.graph = {};
        for (let [k, v] of inputs) {
            this.graph[k] = v;
        }
    }

    get(k: string) {
        return this.graph[k] ?? [];
    }
}

const memos: Record<string, number> = {};

function countPaths(network: Network, start: string, end: string) {
    const k = `${start}:${end}`;
    const mem = memos[k];
    if (mem !== undefined) return mem;

    if (start === end) {
        return 1;
    }

    let count = 0;

    let children = network.get(start);
    for (let child of children) {
        count += countPaths(network, child, end);
    }
    memos[k] = count;
    return count;
}

export function main(data: string) {
    const inputs = parseData(data);
    
    const network = new Network(inputs);

    const svr2dac = countPaths(network, 'svr', 'dac');
    console.log({svr2dac});
    const dac2fft = countPaths(network, 'dac', 'fft');
    console.log({dac2fft});
    const fft2out = countPaths(network, 'fft', 'out');
    console.log({fft2out});

    const svr2fft = countPaths(network, 'svr', 'fft');
    console.log({svr2fft});
    const fft2dac = countPaths(network, 'fft', 'dac');
    console.log({fft2dac});
    const dac2out = countPaths(network, 'dac', 'out');
    console.log({dac2out});

    return svr2dac*dac2fft*fft2out + svr2fft*fft2dac*dac2out;
}


