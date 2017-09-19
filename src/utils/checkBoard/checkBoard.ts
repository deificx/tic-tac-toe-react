import {None, Draw, Empty, Human, Bot} from '../../constants';
import {wins} from '../';

const tileTypeToWinner = (tile: TileType): Winner => {
  switch (tile) {
    case Empty:
      return None;
    case Human:
      return Human;
    case Bot:
      return Bot;
  }
  return None;
};

export const checkBoard = (board: Board): Winner => {
  const winner: Winner =
    wins
      .map(win => {
        if (
          board[win[0]] !== Empty &&
          board[win[0]] === board[win[1]] &&
          board[win[1]] === board[win[2]]
        ) {
          return tileTypeToWinner(board[win[0]]);
        }
        return None;
      })
      .filter(w => w !== None)
      .shift() || None;
  if (winner === None && !board.some(b => b === Empty)) {
    return Draw;
  }
  return winner;
};
