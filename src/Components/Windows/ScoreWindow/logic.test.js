import { sortScores, updateLocalScore } from './logic';

describe('updateLocalScore', () => {
  const scores = [{ id: '1', name: 'DimaDK', score: 100 }];

  it('should push new score if not found', () => {
    const actual = updateLocalScore(scores, { id: '2', name: 'test', score: 50 });
    const expected = [
      { id: '1', name: 'DimaDK', score: 100 },
      { id: '2', name: 'test', score: 50 },
    ];
    expect(actual).toEqual(expected);
  });

  it('should update old score if found', () => {
    const actual = updateLocalScore(scores, { id: '1', name: 'DimaDK', score: 101 });
    const expected = [
      { id: '1', name: 'DimaDK', score: 101 },
    ];
    expect(actual).toEqual(expected);
  });
});

describe('sortScores', () => {
  it('should sort scores desc', () => {
    const scores = [
      { id: '2', name: 'test', score: 50 },
      { id: '1', name: 'DimaDK', score: 100 },
    ];
    const actual = sortScores(scores);
    const expected = [
      { id: '1', name: 'DimaDK', score: 100 },
      { id: '2', name: 'test', score: 50 },
    ];
    expect(actual).toEqual(expected);
  });
});
