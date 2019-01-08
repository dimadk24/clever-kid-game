import { generate, getSolution } from './GreaterLessOrEqualQuestion';

describe('generateGreaterLessOrEqualTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('greaterLessOrEqual');
    expect(task.operands).toBeArray();
    expect(task.operands[0]).toBeNumber();
    expect(task.solution).toBeString();
  });
});

describe('getGreaterLessOrEqualSolution', () => {
  it('should find greater solution', () => {
    expect(getSolution(15, 10)).toBe('>');
  });

  it('should find less solution', () => {
    expect(getSolution(10, 15)).toBe('<');
  });

  it('should find equal solution', () => {
    expect(getSolution(10, 10)).toBe('=');
  });
});
