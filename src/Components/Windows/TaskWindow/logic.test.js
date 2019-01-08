import {
  calculateSolution, generateCalculateTimeTask,
  generateCapitalTask,
  generateChooseImageTask,
  generateCountryTask,
  generateGreaterLessOrEqualTask,
  generateImageTask,
  generateListeningTask,
  generateLogoTask,
  generateMathTask,
  generateMissedSignTask,
  generateMissedWordTask,
  generateNumberToStringTask,
  generateTranslateTask,
  generateTrueFalseTask,
  getGreaterLessOrEqualSolution,
  validateSolution,
} from './logic';

describe('generateMathTask', () => {
  it('should have right types', () => {
    const task = generateMathTask();
    expect(task.type).toBe('math');
    expect(task.operands).toBeArrayOfSize(2);
    expect(task.operands[0]).toBeNumber();
    expect(task.operands[1]).toBeNumber();
    expect(task.sign).toBeString();
    expect(task.sign).toBeOneOf(['+', '-']);
    expect(task.solution).toBeNumber();
  });
});

describe('generateListeningTask', () => {
  it('should have right types', () => {
    const task = generateListeningTask();
    expect(task.type).toBe('listening');
    expect(task.name).toBeString();
    expect(task.solution).toBeString();
  });
});

describe('generateTranslateTask', () => {
  it('should have right types with toEng lang', () => {
    const task = generateTranslateTask('toEng');
    expect(task.type).toBe('translate');
    expect(task.toLang).toBe('toEng');
    expect(task.word).toBeString();
    expect(task.solutions).toBeArray();
    expect(task.solutions[0]).toBeString();
  });

  it('should have right types with toRus lang', () => {
    const task = generateTranslateTask('toRus');
    expect(task.type).toBe('translate');
    expect(task.toLang).toBe('toRus');
    expect(task.word).toBeString();
    expect(task.solutions).toBeArray();
    expect(task.solutions[0]).toBeString();
  });
});

describe('generateImageTask', () => {
  it('should have right types', () => {
    const task = generateImageTask();
    expect(task.type).toBe('image');
    expect(task.name).toBeString();
    expect(task.solutions).toBeArray();
    expect(task.solutions[0]).toBeString();
  });
});

describe('generateLogoTask', () => {
  it('should have right types', () => {
    const task = generateLogoTask();
    expect(task.type).toBe('logo');
    expect(task.name).toBeString();
  });
});

describe('generateCapitalTask', () => {
  it('should have right types', () => {
    const task = generateCapitalTask();
    expect(task.type).toBe('capital');
    expect(task.country).toBeString();
    expect(task.solution).toBeString();
  });
});

describe('generateCountryTask', () => {
  it('should have right types', () => {
    const task = generateCountryTask();
    expect(task.type).toBe('country');
    expect(task.capital).toBeString();
    expect(task.solution).toBeString();
  });
});

describe('generateTrueFalseTask', () => {
  it('should have right types', () => {
    const task = generateTrueFalseTask();
    expect(task.type).toBe('trueFalse');
    expect(task.question).toBeString();
    expect(task.solution).toBeString();
  });
});

describe('generateGreaterLessOrEqualTask', () => {
  it('should have right types', () => {
    const task = generateGreaterLessOrEqualTask();
    expect(task.type).toBe('greaterLessOrEqual');
    expect(task.operands).toBeArray();
    expect(task.operands[0]).toBeNumber();
    expect(task.solution).toBeString();
  });
});

describe('getGreaterLessOrEqualSolution', () => {
  it('should find greater solution', () => {
    expect(getGreaterLessOrEqualSolution(15, 10)).toBe('>');
  });

  it('should find less solution', () => {
    expect(getGreaterLessOrEqualSolution(10, 15)).toBe('<');
  });

  it('should find equal solution', () => {
    expect(getGreaterLessOrEqualSolution(10, 10)).toBe('=');
  });
});

describe('generateMissedWordTask', () => {
  it('should have right types', () => {
    const task = generateMissedWordTask();
    expect(task.type).toBe('missedWord');
    expect(task.parts).toBeArrayOfSize(2);
    expect(task.parts[0]).toBeString();
    expect(task.suggestions).toBeArray();
    expect(task.suggestions[0]).toBeString();
    expect(task.solution).toBeString();
  });
});

describe('generateMissedSignTask', () => {
  it('should have right types', () => {
    const task = generateMissedSignTask();
    expect(task.type).toBe('missedSign');
    expect(task.operands).toBeArrayOfSize(2);
    expect(task.operands[0]).toBeNumber();
    expect(task.equals).toBeNumber();
    expect(task.solution).toBeString();
    expect(task.solution).toBeOneOf(['+', '-']);
  });
});

describe('generateNumberToStringTask', () => {
  it('should have right types', () => {
    const task = generateNumberToStringTask();
    expect(task.type).toBe('numberToString');
    expect(task.number).toBeNumber();
  });
});

describe('generateChooseImageTask', () => {
  it('should have right types', () => {
    const task = generateChooseImageTask();
    expect(task.type).toBe('chooseImage');
    expect(task.object).toBeString();
    expect(task.suggestions).toBeArray();
    expect(task.suggestions[0]).toBeString();
  });
});

describe('generateCalculateTimeTask', () => {
  it('should have right types', () => {
    const task = generateCalculateTimeTask();
    expect(task.type).toBe('calculateTime');
    expect(task.hours).toBeNumber();
    expect(task.hours).toBeLessThan(24);
    expect(task.minutes).toBeNumber();
    expect(task.minutes).toBeLessThan(60);
    expect(task.solution).toBeNumber();
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
      solution: 10,
    };
    const response = validateSolution(task, '10');
    expect(response).toBeTruthy();
  });

  it('should throw error for unknown types', () => {
    const task = {
      type: 'unknown type',
      solution: 10,
    };
    expect(() => validateSolution(task, '10')).toThrow(/unknown type/);
  });

  it('should return false if solution is wrong', () => {
    const task = {
      type: 'math',
      solution: 5,
    };
    const response = validateSolution(task, '10');
    expect(response).toBeFalsy();
  });

  it('should validate listening task as true', () => {
    const task = {
      type: 'listening',
      name: 'hello',
      solution: 'hello',
    };
    const response = validateSolution(task, 'hello');
    expect(response).toBeTruthy();
  });

  it('should validate listening task as false', () => {
    const task = {
      type: 'listening',
      name: 'hello',
      solution: 'hello',
    };
    const response = validateSolution(task, 'star');
    expect(response).toBeFalsy();
  });

  it('should validate translate task as true', () => {
    const task = {
      type: 'translate',
      toLang: 'toRus',
      word: 'mouse',
      solutions: ['мышь', 'мышка'],
    };
    expect(validateSolution(task, 'мышь')).toBeTruthy();
    expect(validateSolution(task, 'мышка')).toBeTruthy();
  });

  it('should validate translate task as false', () => {
    const task = {
      type: 'translate',
      toLang: 'toRus',
      word: 'mouse',
      solutions: ['мышь', 'мышка'],
    };
    expect(validateSolution(task, 'дом')).toBeFalsy();
  });

  it('should validate image task as true', () => {
    const task = {
      type: 'image',
      name: 'car',
      solutions: ['car', 'auto'],
    };
    expect(validateSolution(task, 'car')).toBeTruthy();
  });

  it('should validate image task as false', () => {
    const task = {
      type: 'image',
      name: 'car',
      solutions: ['car', 'auto'],
    };
    expect(validateSolution(task, 'mouse')).toBeFalsy();
  });

  it('should validate logo task as true', () => {
    const task = {
      type: 'logo',
      name: 'bmw',
    };
    expect(validateSolution(task, 'bmw')).toBeTruthy();
  });

  it('should validate logo task as false', () => {
    const task = {
      type: 'logo',
      name: 'logo',
    };
    expect(validateSolution(task, 'apple')).toBeFalsy();
  });

  it('should validate capital task case insensitively as true', () => {
    const task = {
      type: 'capital',
      country: 'Belarus',
      solution: 'Minsk',
    };
    expect(validateSolution(task, 'minsk')).toBeTruthy();
  });

  it('should validate capital task as false', () => {
    const task = {
      type: 'capital',
      country: 'Belarus',
      solution: 'Minsk',
    };
    expect(validateSolution(task, 'Moscow')).toBeFalsy();
  });

  it('should validate country task case insensitively as true', () => {
    const task = {
      type: 'country',
      capital: 'Minsk',
      solution: 'Belarus',
    };
    expect(validateSolution(task, 'belarus')).toBeTruthy();
  });

  it('should validate country task as false', () => {
    const task = {
      type: 'country',
      capital: 'Minsk',
      solution: 'Belarus',
    };
    expect(validateSolution(task, 'russia')).toBeFalsy();
  });

  it('should validate trueFalse task as true', () => {
    const task = {
      type: 'trueFalse',
      question: 'it is true',
      solution: 'true',
    };
    expect(validateSolution(task, 'true')).toBeTruthy();
  });

  it('should validate trueFalse task as false', () => {
    const task = {
      type: 'trueFalse',
      question: 'it is true',
      solution: 'true',
    };
    expect(validateSolution(task, 'false')).toBeFalsy();
  });

  it('should validate greaterLessOrEqual task as true', () => {
    const task = {
      type: 'greaterLessOrEqual',
      operands: [10, 15],
      solution: '<',
    };
    expect(validateSolution(task, '<')).toBeTruthy();
  });

  it('should validate greaterLessOrEqual task as false', () => {
    const task = {
      type: 'greaterLessOrEqual',
      operands: [10, 15],
      solution: '<',
    };
    expect(validateSolution(task, '>')).toBeFalsy();
  });

  it('should validate missedWord task as true', () => {
    const task = {
      type: 'missedWord',
      parts: ['test', 'of smth'],
      suggestions: ['string', 'number'],
      solution: 'string',
    };
    expect(validateSolution(task, 'string')).toBeTruthy();
  });

  it('should validate missedWord task as false', () => {
    const task = {
      type: 'missedWord',
      parts: ['test', 'of smth'],
      suggestions: ['string', 'number'],
      solution: 'string',
    };
    expect(validateSolution(task, 'number')).toBeFalsy();
  });

  it('should validate missedSign task as true', () => {
    const task = {
      type: 'missedSign',
      operands: [10, 5],
      equals: 15,
      solution: '+',
    };
    expect(validateSolution(task, '+')).toBeTruthy();
  });

  it('should validate missedSign task as false', () => {
    const task = {
      type: 'missedSign',
      operands: [10, 5],
      equals: 15,
      solution: '+',
    };
    expect(validateSolution(task, '-')).toBeFalsy();
  });

  it('should validate numberToString task as true', () => {
    const task = {
      type: 'numberToString',
      number: 10,
    };
    expect(validateSolution(task, 'ten')).toBeTruthy();
  });

  it('should validate numberToString task as false', () => {
    const task = {
      type: 'numberToString',
      number: 10,
    };
    expect(validateSolution(task, 'eight')).toBeFalsy();
  });

  it('should validate chooseImage task as true', () => {
    const task = {
      type: 'chooseImage',
      object: 'ship',
      suggestions: [
        'ship', 'flower',
      ],
    };
    expect(validateSolution(task, 'ship')).toBeTruthy();
  });

  it('should validate chooseImage task as false', () => {
    const task = {
      type: 'chooseImage',
      object: 'ship',
      suggestions: [
        'ship', 'flower',
      ],
    };
    expect(validateSolution(task, 'flower')).toBeFalsy();
  });

  it('should validate calculateTime task as true', () => {
    const task = {
      type: 'calculateTime',
      hours: 7,
      minutes: 20,
      solution: 440,
    };
    expect(validateSolution(task, '440')).toBeTruthy();
  });

  it('should validate calculateTime task as false', () => {
    const task = {
      type: 'calculateTime',
      hours: 7,
      minutes: 20,
      solution: 440,
    };
    expect(validateSolution(task, '400')).toBeFalsy();
  });
});
