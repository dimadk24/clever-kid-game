import { generateMathTask, calculateSolution } from './logic';

describe('generateMathTask', () => {
  it('should have right types', () => {
    const task = generateMathTask();
    expect(task.type).toBe('math');
    const { math } = task;
    expect(math).toBeDefined();
    expect(math.operands).toBeArrayOfSize(2);
    expect(math.operands[0]).toBeNumber();
    expect(math.operands[1]).toBeNumber();
    expect(math.sign).toBeString();
    expect(math.sign).toBeOneOf(['+', '-']);
    expect(math.solution).toBeNumber();
  });
});

describe('calculateSolution', () => {
  const PLUS = '+';
  const MINUS = '-';

  it('should calculate small addition', () => {
    const operands = [10, 5];
    const actual = calculateSolution({ operands, sign: PLUS });
    expect(actual).toBe(15);
  });

  it('should calculate big addition', () => {
    const operands = [99, 98];
    const actual = calculateSolution({ operands, sign: PLUS });
    expect(actual).toBe(197);
  });

  it('should calculate simple subtraction', () => {
    const operands = [10, 5];
    const actual = calculateSolution({ operands, sign: MINUS });
    expect(actual).toBe(5);
  });

  it('should calculate subtraction with negative sign', () => {
    const operands = [5, 15];
    const actual = calculateSolution({ operands, sign: MINUS });
    expect(actual).toBe(-10);
  });
});
