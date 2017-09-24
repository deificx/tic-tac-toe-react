import {Empty, Bot} from '../../constants';
import {generateBoard} from '../';

const scoreRow = (board: Board, size: BoardSize) => {
  return (row: nn): {locations: nn; score: number} => {
    const tiles: TileType[] = row.map((location: number) => board[location]);
    const players: TileType[] = tiles.filter((t: TileType) => t !== Empty);
    let score = 0;

    if (players.every((p: TileType) => p === players[0])) {
      score = Math.pow(players.length, 2);

      return {
        locations: row.filter((location: number) => board[location] === Empty),
        score,
      };
    }

    return {locations: [-1], score: -1};
  };
};

export const calculateMove = (board: Board, size: BoardSize): Move => {
  const {weights, wins} = generateBoard(size);
  const w = [...weights];
  const scorer = scoreRow(board, size);

  wins.forEach((win: nn) => {
    const test = scorer(win);
    if (test.score) {
      test.locations.forEach((location: number) => {
        w[location] = w[location] + test.score;
      });
    }
  });

  board.forEach((tile: TileType, index: number) => {
    if (tile !== Empty) {
      w[index] = -1;
    }
  });

  const moves: Move[] = w
    .map((score: number, location: number) => {
      return {location, score};
    })
    .filter((m: {score: number}) => m.score > 0)
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
