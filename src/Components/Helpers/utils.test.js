import { calculateMathSolution } from './utils';

describe('calculateMathSolution', () => {
  const PLUS = '+';
  const MINUS = '-';

  it('should calculate small addition', () => {
    const operands = [10, 5];
    const actual = calculateMathSolution({ operands, sign: PLUS });
    expect(actual).toBe(15);
  });

  it('should calculate big addition', () => {
    const operands = [99, 98];
    const actual = calculateMathSolution({ operands, sign: PLUS });
    expect(actual).toBe(197);
  });

  it('should calculate simple subtraction', () => {
    const operands = [10, 5];
    const actual = calculateMathSolution({ operands, sign: MINUS });
    expect(actual).toBe(5);
  });

  it('should calculate subtraction with negative sign', () => {
    const operands = [5, 15];
    const actual = calculateMathSolution({ operands, sign: MINUS });
    expect(actual).toBe(-10);
  });
});
