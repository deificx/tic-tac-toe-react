import {checkBoard} from './checkBoard';
import {Bot, Draw, Empty, Human, None} from '../../constants';
import {generateBoard} from '../';

const size = 3;
const {board} = generateBoard(size);

describe('check board for winning positions or draw', () => {
  it('should have no winner', () => {
    expect(checkBoard(board, size)).toBe(None);
  });

  it('should be a human win', () => {
    const _board = [...board];
    _board[0] = Human;
    _board[1] = Human;
    _board[2] = Human;
    expect(checkBoard(_board, size)).toBe(Human);
  });

  it('should be a Bot win', () => {
    const _board = [...board];
    _board[3] = Bot;
    _board[4] = Bot;
    _board[5] = Bot;
    expect(checkBoard(_board, size)).toBe(Bot);
  });

  it('should be a Draw', () => {
    const _board: Board = [];
    _board.push(Bot);
    _board.push(Human);
    _board.push(Bot);
    _board.push(Human);
    _board.push(Human);
    _board.push(Bot);
    _board.push(Human);
    _board.push(Bot);
    _board.push(Human);
    expect(checkBoard(_board, size)).toBe(Draw);
  });
});
