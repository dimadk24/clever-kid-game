import generate from './MissedSignQuestion';

describe('generateMissedSignTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('missedSign');
    expect(task.operands).toBeArrayOfSize(2);
    expect(task.operands[0]).toBeNumber();
    expect(task.equals).toBeNumber();
    expect(task.solution).toBeString();
    expect(task.solution).toBeOneOf(['+', '-']);
  });
});
