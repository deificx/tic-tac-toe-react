import {generateBoard} from './generateBoard';
import {Empty} from '../../constants';

describe('newBoard', () => {
  it('should be 9 items long', () => {
    expect(generateBoard(3).board.length).toBe(9);
  });

  it('should be Empty', () => {
    const empty = [
      Empty,
      Empty,
      Empty,
      Empty,
      Empty,
      Empty,
      Empty,
      Empty,
      Empty,
    ];
    expect(generateBoard(3).board).toEqual(empty);
  });
});

describe('wins', () => {
  it('should be 8 items long', () => {
    expect(generateBoard(3).wins.length).toBe(8);
  });

  it('should contain win positions', () => {
    const {wins} = generateBoard(3);
    expect(wins[0]).toEqual([0, 1, 2]);
    expect(wins[1]).toEqual([0, 3, 6]);
    expect(wins[2]).toEqual([0, 4, 8]);
    expect(wins[3]).toEqual([3, 4, 5]);
    expect(wins[4]).toEqual([1, 4, 7]);
    expect(wins[5]).toEqual([6, 7, 8]);
    expect(wins[6]).toEqual([2, 5, 8]);
    expect(wins[7]).toEqual([2, 4, 6]);
  });

  it('should also do so for 4x4 board', () => {
    const {wins} = generateBoard(4);
    [
      [0, 1, 2, 3],
      [0, 4, 8, 12],
      [0, 5, 10, 15],
      [4, 5, 6, 7],
      [1, 5, 9, 13],
      [8, 9, 10, 11],
      [2, 6, 10, 14],
      [12, 13, 14, 15],
      [3, 7, 11, 15],
      [3, 6, 9, 12],
    ].forEach((win, index) => {
      expect(wins[index]).toEqual(win);
    });
  });

  // it('should also do so for a 5x5 board', () => {
  //   const {wins} = generateBoard(5);
  //   console.log(wins.map(a => a.map(i => i + 1)));
  //   expect(true).toBe(false);
  // });
});
