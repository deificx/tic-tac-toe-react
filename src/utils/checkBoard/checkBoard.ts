import {None, Draw, Empty, Human, Bot} from '../../constants';
import {generateBoard} from '../';

const compareValues = (board: Board): ((win: nn) => Winner) => {
  return (win: nn): Winner => {
    const player: TileType = board[win[0]];
    if (player === Empty) {
      return None;
    }
    return win
      .map((location: number) => board[location])
      .every((p: TileType) => p === player)
      ? player
      : None;
  };
};

export const checkBoard = (board: Board, size: BoardSize): Winner => {
  const {wins} = generateBoard(size);
  const winner: Winner =
    wins
      .map(compareValues(board))
      .filter(w => w !== None)
      .shift() || None;
  if (winner === None && !board.some(b => b === Empty)) {
    return Draw;
  }
  return winner;
};
