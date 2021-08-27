import generate from './TranslateToRusQuestion';

describe('generateTranslateTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('translateToRus');
    expect(task.word).toBeString();
    expect(task.solutions).toBeArray();
    expect(task.solutions[0]).toBeString();
  });
});
