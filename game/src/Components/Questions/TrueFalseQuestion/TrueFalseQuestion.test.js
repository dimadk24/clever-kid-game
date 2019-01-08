import generate from './TrueFalseQuestion';

describe('generateTrueFalseTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('trueFalse');
    expect(task.question).toBeString();
    expect(task.solution).toBeString();
  });
});
