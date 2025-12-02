export const interpret = (cmd: string) => ({'L':-1,'R':1}[cmd[0]]) * parseInt(cmd.slice(1));

export const isDial = (n: number) => ((n%100)+100)%100 === 0;
export const species = (n: number) => n < 0 ? Math.ceil((n+1)/100)-1 : Math.floor(n/100);

