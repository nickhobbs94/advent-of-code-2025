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

function countPaths(network: Network, start: string, end: string) {
    if (start === end) return 1;
    let count = 0;

    let children = network.get(start);
    for (let child of children) {
        count += countPaths(network, child, end);
    }
    return count;
}

export function main(data: string) {
    const inputs = parseData(data);
    
    const network = new Network(inputs);

    return countPaths(network, 'you', 'out');
}


