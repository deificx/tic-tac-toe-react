// because just typing and exporting the values is just not as fun...
// also, how obscure can I make this?

import {Empty} from '../../constants';

function arr(n: number): any[] {
  return Array.apply(null, Array(n));
}

function set(fn: (a: number) => any, n: number = 3) {
  return arr(n).map((_: any, index: number) => fn(index));
}

function add(
  a: number,
  operation: (a: number, b: number) => number
): (b: number) => number {
  return (b: number) => {
    return operation(a, b);
  };
}

// horizontals
const h = (a: number, b: number) => a + b;

// verticals
const v = (a: number, b: number) => a + b * 3;

// diagonals
const d = (a: number, b: number) => a + b * (4 - a);

function build(a: number) {
  return [set(add(a * 3, h)), set(add(a, v)), set(add(a, d))];
}

// flatten the build results
function combine(a: any[], b: any[]): any[] {
  return a.concat(b);
}

// only works because the duplicates are next to each other
function clean(a: any[], b: any[]): any[] {
  if (a.slice(-1).join() === b.join()) {
    return a;
  }
  return a.concat([b]);
}

type nn = number[];
type nnn = nn[];

export const newBoard = set((a: number) => Empty, 9);
export const wins: nnn = set(build)
  .reduce(combine, [])
  .reduce(clean, []);
