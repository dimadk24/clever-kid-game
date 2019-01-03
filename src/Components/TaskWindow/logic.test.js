import {
  generateMathTask,
  calculateSolution,
  validateSolution,
  convertTaskToStringQuestion,
} from './logic';

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

describe('validateSolution', () => {
  it('should compare solution and task.math.solution', () => {
    const task = {
      type: 'math',
      math: {
        solution: 10,
      },
    };
    const response = validateSolution(task, 10);
    expect(response).toBeTruthy();
  });

  it('should throw error for unknown types', () => {
    const task = {
      type: 'unknown type',
      math: {
        solution: 10,
      },
    };
    expect(() => validateSolution(task, 10)).toThrow(/unknown type/);
  });

  it('should return false if solution is wrong', () => {
    const task = {
      type: 'math',
      math: {
        solution: 5,
      },
    };
    const response = validateSolution(task, 10);
    expect(response).toBeFalsy();
  });
});

describe('convertTaskToStringQuestion', () => {
  it('should convert math task 1', () => {
    const task = {
      type: 'math',
      math: {
        operands: [1, 2],
        sign: '+',
      },
    };
    const questionString = '1+2';
    expect(convertTaskToStringQuestion(task)).toBe(questionString);
  });

  it('should convert math task 2', () => {
    const task = {
      type: 'math',
      math: {
        operands: [52, 90],
        sign: '*',
      },
    };
    const questionString = '52*90';
    expect(convertTaskToStringQuestion(task)).toBe(questionString);
  });

  it('should throw error if task type is unknown', () => {
    const task = {
      type: 'unknown',
    };
    expect(() => convertTaskToStringQuestion(task)).toThrow(/unknown/);
  });
});
