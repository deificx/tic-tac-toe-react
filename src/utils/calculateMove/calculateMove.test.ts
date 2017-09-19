import {calculateMove} from './calculateMove';
import {Bot, Human} from '../../constants';
import {newBoard} from '../';

describe('calculateMove', () => {
  it('should return a move', () => {
    expect(calculateMove(newBoard)).toEqual({location: 4, score: 5});
  });

  it('should block human', () => {
    const board = [...newBoard];
    board[0] = Human;
    board[1] = Bot;
    board[4] = Human;
    expect(calculateMove(board)).toEqual({location: 8, score: 4});
  });

  it('should prioritize winning over blocking human', () => {
    const board = [...newBoard];
    board[1] = Human;
    board[2] = Bot;
    board[4] = Human;
    board[5] = Bot;
    expect(calculateMove(board)).toEqual({location: 8, score: 7});
  });
});
