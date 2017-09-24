/// <reference path="./generateBoard.d.ts" />

import {Empty} from '../../constants';

const arr = (n: number): void[] => Array.apply(null, Array(n));
const isEdge = (a: number, b: number): boolean => a === 0 || a === b - 1;

function set(fn: (a: number, edge?: boolean) => any, n: number = 3) {
  return arr(n).map((_: any, index: number) => fn(index, isEdge(index, n)));
}

function add(a: number, operation: Operation): (b: number) => number {
  return (b: number) => {
    return operation(a, b);
  };
}

// horizontals
function h(size: BoardSize): Operation {
  return (a: number, b: number): number => a * size + b;
}

// verticals
function v(size: BoardSize): Operation {
  return (a: number, b: number): number => a + b * size;
}

// diagonals
function d(size: BoardSize): Operation {
  return (a: number, b: number) => {
    const itteration = a ? a : size + 1;
    return a + b * itteration;
  };
}

// returns a row, column and maybe diagonal based on index
function build(size: BoardSize) {
  return function builder(a: number, edge: boolean) {
    return [
      set(add(a, h(size)), size),
      set(add(a, v(size)), size),
      edge ? set(add(a, d(size)), size) : null,
    ];
  };
}

// flatten the build results
const combine = (a: any[], b: any[]): any[] => a.concat(b);
const clean = (a: any) => a !== null;

// don't regenerate when not needed
const memory: {[key: number]: Generated} = {};

// initial score system for next bot move
function calculateWeights(wins: nnn, size: BoardSize): nn {
  const weights: {
    [key: number]: number;
  } = wins.reduce((acc: {[key: number]: number}, cur: nn) => {
    cur.forEach((val: number) => {
      if (Object.hasOwnProperty.call(acc, val)) {
        acc[val] += 1;
      } else {
        acc[val] = 1;
      }
    });
    return acc;
  }, {});
  return set((a: number) => 0, Math.pow(size, 2)).map((_, index) => {
    if (Object.hasOwnProperty.call(weights, index)) {
      return weights[index];
    } else {
      return 0;
    }
  });
}

export function generateBoard(size: BoardSize): Generated {
  if (Object.hasOwnProperty.call(memory, size)) {
    return memory[size];
  }

  const wins = set(build(size), size)
    .reduce(combine, [])
    .filter(clean);

  memory[size] = {
    board: set((a: number) => Empty, Math.pow(size, 2)),
    weights: calculateWeights(wins, size),
    wins,
  };

  return memory[size];
}
