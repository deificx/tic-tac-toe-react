import {
  checkBoard,
  matches,
  minMax,
  updateBoard,
  getMoves,
  calculateMove,
} from './tic-tac-toe';
import {Human, Empty, Bot, None} from './constants';

describe('set()', () => {
  it('sets a value to the board', () => {
    expect(updateBoard(0, Human)[0]).toBe(Human);
  });

  it('Sets a value to an already started board', () => {
    const a = [Empty, Human, Empty, Bot, Empty, Human, Bot, Empty, Human];
    const b = [Bot, Human, Empty, Bot, Empty, Human, Bot, Empty, Human];
    expect(updateBoard(0, Bot, a)).toEqual(b);
  });

  it('Cannot overwrite a non-Empty value', () => {
    const a = [Empty, Human, Empty, Bot, Empty, Human, Bot, Empty, Human];
    expect(updateBoard(1, Bot, a)).toEqual(a);
  });
});

describe('matches()', () => {
  it('should return Bot', () => {
    const board = [Bot, Human, Empty, Bot, Empty, Human, Bot, Empty, Human];
    expect(matches(board, [0, 3, 6])).toBe(Bot);
  });

  it('should return Human', () => {
    const board = [Bot, Human, Empty, Empty, Human, Bot, Bot, Human, Empty];
    expect(matches(board, [1, 4, 7])).toBe(Human);
  });
});

describe('checkBoard()', () => {
  it('should verify no one won yet', () => {
    const board = [Empty, Human, Empty, Bot, Empty, Human, Bot, Empty, Human];
    expect(checkBoard(board)).toBe(None);
  });

  it('should verify Bot win', () => {
    const board = [Bot, Human, Empty, Bot, Empty, Human, Bot, Empty, Human];
    expect(checkBoard(board)).toBe(Bot);
  });

  it('should verify Human win', () => {
    const board = [Bot, Human, Empty, Empty, Human, Bot, Bot, Human, Empty];
    expect(checkBoard(board)).toBe(Human);
  });
});

describe('minMax()', () => {
  it('should find the win position on an almost complete board', () => {
    const board = [Bot, Human, Bot, Bot, Human, Human, Empty, Empty, Human];
    expect(checkBoard(board)).toBe(None);
    expect(minMax(board, Human)).toEqual([0, 0, 0, 0, 0, 0, 1, 0, 0]);
  });

  it('should find the win position on an almost empty board', () => {
    const board = [
      Empty,
      Empty,
      Empty,
      Empty,
      Human,
      Empty,
      Empty,
      Empty,
      Empty,
    ];
    expect(minMax(board, Human)).toEqual([
      3342,
      1974,
      3342,
      1974,
      0,
      1974,
      3342,
      1974,
      3342,
    ]);
  });
});

describe('getMoves', () => {
  it('returns legal moves', () => {
    const board = [Bot, Human, Bot, Bot, Human, Human, Empty, Empty, Human];
    expect(getMoves(board)).toEqual([6, 7]);
  });
});

describe('calculateMove()', () => {
  it('should select one of the best moves', () => {
    const board = [
      Empty,
      Empty,
      Empty,
      Empty,
      Human,
      Empty,
      Empty,
      Empty,
      Empty,
    ];
    expect([0, 2, 6, 8]).toContain(calculateMove(board));
  });
});
