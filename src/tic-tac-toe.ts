import {
  __,
  all,
  head,
  map,
  nth,
  range,
  reduce,
  tail,
  update,
  zipWith,
} from 'ramda';
import {
  Empty,
  Human,
  Bot,
  None,
  Draw,
  TileType,
  Winner,
  BoardState,
} from './constants';

// range creates an array with values from up to.
export const emptyBoard = map(() => Empty, range(0, 9));

// if index is Empty, return new array with TileType added
export const updateBoard = (
  index: number,
  player: TileType,
  board: BoardState = emptyBoard
) => (board[index] === Empty ? update(index, player, board) : board);

// if a player has filled any one of these combinations they've won
const rowsToCheck = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// check a single row
export const matches = (board: BoardState, row: number[]): Winner => {
  const values = row.map((n) => nth(n, board));
  if (all((v) => v === Human, values)) {
    return Human;
  }
  if (all((v) => v === Bot, values)) {
    return Bot;
  }
  return None;
};

// traverse all the rows recursively
export const checkBoard = (
  board: BoardState,
  rows: number[][] = rowsToCheck
): Winner => {
  const row = head(rows);
  const moves = getMoves(board);
  if (!row) {
    return moves.length ? None : Draw;
  }
  const match = matches(board, row);
  if (match === None) {
    return checkBoard(board, tail(rows));
  }
  return match;
};

export const getMoves = (tiles: BoardState) =>
  tiles.reduce(
    (acc, cur, idx) => (cur === Empty ? acc.concat(idx) : acc),
    [] as number[]
  );

// calculate moves for Bot, where player equals the last move
export const minMax = async (
  board: TileType[],
  player: TileType,
  scores: number[] = map(() => 0, range(0, 9)),
  move?: number
): Promise<number[]> => {
  const moves = getMoves(board);
  if (typeof move === 'number') {
    const winner = checkBoard(board);
    switch (winner) {
      case Bot:
        return update(move, 1, scores);

      case Human:
        return update(move, 1, scores);

      case None:
      case Draw:
      default:
        if (!moves.length) {
          return scores;
        }
    }
  }
  if (moves.length) {
    const nextPlayer = player === Bot ? Human : Bot;
    const scoreLists = await Promise.all(
      moves.map(async (nextMove) =>
        minMax(
          updateBoard(nextMove, nextPlayer, board),
          nextPlayer,
          scores,
          nextMove
        )
      )
    );

    return reduce(
      (c: number[], d: number[]) =>
        zipWith((a: number, b: number) => a + b, c, d),
      scores,
      scoreLists
    );
  }
  return scores;
};

export const calculateMove = async (board: TileType[]) => {
  const weights = await minMax(board, Human);
  const max = Math.max(...weights);
  const moves: number[] = weights.reduce(
    (acc: number[], cur, index) => (cur === max ? acc.concat([index]) : acc),
    []
  );
  return moves[Math.floor(Math.random() * moves.length)];
};

export const getBotMove = (board: BoardState) => {
  if (all((v: TileType) => v === Empty, board)) {
    return 4;
  } else {
    return calculateMove(board);
  }
};
