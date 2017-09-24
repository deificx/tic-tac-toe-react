type Operation = (a: number, b: number) => number;
type BoardSize = 3 | 4 | 5;
type nn = number[];
type nnn = nn[];
interface Generated {
  board: Board;
  weights: nn;
  wins: nnn;
}
