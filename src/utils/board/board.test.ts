import {newBoard, wins} from './board';
import {Empty} from '../../constants';

describe('newBoard', () => {
  it('should be 9 items long', () => {
    expect(newBoard.length).toBe(9);
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
    expect(newBoard).toEqual(empty);
  });
});

describe('wins', () => {
  it('should be 8 items long', () => {
    expect(wins.length).toBe(8);
  });

  it('should contain win positions', () => {
    expect(wins[0]).toEqual([0, 1, 2]);
    expect(wins[1]).toEqual([0, 3, 6]);
    expect(wins[2]).toEqual([0, 4, 8]);
    expect(wins[3]).toEqual([3, 4, 5]);
    expect(wins[4]).toEqual([1, 4, 7]);
    expect(wins[5]).toEqual([6, 7, 8]);
    expect(wins[6]).toEqual([2, 5, 8]);
    expect(wins[7]).toEqual([2, 4, 6]);
  });
});
