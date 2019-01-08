import generate from './MathQuestion';

describe('generateMathTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('math');
    expect(task.operands).toBeArrayOfSize(2);
    expect(task.operands[0]).toBeNumber();
    expect(task.operands[1]).toBeNumber();
    expect(task.sign).toBeString();
    expect(task.sign).toBeOneOf(['+', '-']);
    expect(task.solution).toBeNumber();
  });
});
