import {checkBoard} from './checkBoard';
import {Bot, Draw, Empty, Human, None} from '../../constants';
import {newBoard} from '../';

describe('check board for winning positions or draw', () => {
  it('should have no winner', () => {
    expect(checkBoard(newBoard)).toBe(None);
  });

  it('should be a human win', () => {
    const board = [...newBoard];
    board[0] = Human;
    board[1] = Human;
    board[2] = Human;
    expect(checkBoard(board)).toBe(Human);
  });

  it('should be a Bot win', () => {
    const board = [...newBoard];
    board[3] = Bot;
    board[4] = Bot;
    board[5] = Bot;
    expect(checkBoard(board)).toBe(Bot);
  });

  it('should be a Draw', () => {
    const board: Board = [];
    board.push(Bot);
    board.push(Human);
    board.push(Bot);
    board.push(Human);
    board.push(Human);
    board.push(Bot);
    board.push(Human);
    board.push(Bot);
    board.push(Human);
    expect(checkBoard(board)).toBe(Draw);
  });
});
