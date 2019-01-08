import generate from './TranslateToEngQuestion';

describe('generateTranslateTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('translateToEng');
    expect(task.word).toBeString();
    expect(task.solutions).toBeArray();
    expect(task.solutions[0]).toBeString();
  });
});
