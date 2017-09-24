import {calculateMove} from './calculateMove';
import {Bot, Human} from '../../constants';
import {generateBoard} from '../';

const size = 3;
const {board} = generateBoard(size);

describe('calculateMove', () => {
  it('should return a move', () => {
    expect(calculateMove(board, size)).toEqual({location: 4, score: 4});
  });

  it('should block human', () => {
    const _board = [...board];
    _board[0] = Human;
    _board[1] = Bot;
    _board[4] = Human;
    expect(calculateMove(_board, size)).toEqual({location: 8, score: 7});
  });

  it('should prioritize winning over blocking human', () => {
    const _board = [...board];
    _board[1] = Human;
    _board[2] = Bot;
    _board[4] = Human;
    _board[5] = Bot;
    expect(calculateMove(_board, size)).toEqual({location: 8, score: 8});
  });
});
