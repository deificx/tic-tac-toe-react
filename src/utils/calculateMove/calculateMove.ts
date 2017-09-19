import {Empty, Bot} from '../../constants';
import {wins} from '../';

// middle is weighted highest, then corners, then sides
const weights = [2, 1, 2, 1, 5, 1, 2, 1, 2];

const testRow = (row: TileType[]): {location: number; tile: TileType} => {
  const sorted = [...row].map(v => (v === Empty ? '' : v)).sort();
  if (!sorted[0] && sorted[1] && sorted[1] === sorted[2]) {
    return {
      location: row.findIndex(r => r === Empty),
      tile: row.reduce((acc, cur) => {
        return cur !== Empty ? cur : acc;
      }, 'Human'),
    };
  }
  return {location: -1, tile: Empty};
};

export const calculateMove = (board: Board): Move => {
  const w = [...weights];

  wins.forEach(win => {
    const test = testRow([board[win[0]], board[win[1]], board[win[2]]]);
    const score = test.tile === Bot ? 5 : 2;
    if (test.tile !== Empty) {
      w[win[test.location]] = w[win[test.location]] + score;
    }
  });

  board.forEach((tile: TileType, index: number) => {
    if (tile !== Empty) {
      w[index] = -1;
    }
  });

  const moves: Move[] = w
    .map((score, location) => {
      return {location, score};
    })
    .filter(m => m.score > 0)
    .reduce(
      (previous: Move[], current: Move) => {
        if (current.score > previous[0].score) {
          return [current];
        } else if (current.score === previous[0].score) {
          return previous.concat(current);
        }
        return previous;
      },
      [{score: 0, location: -1}]
    );

  return moves[Math.floor(Math.random() * moves.length)];
};
