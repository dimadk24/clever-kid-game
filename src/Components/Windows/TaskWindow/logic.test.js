import {
  calculateSolution, generateCapitalTask, generateCountryTask,
  generateImageTask,
  generateListeningTask, generateLogoTask,
  generateMathTask,
  generateTranslateTask,
  validateSolution,
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

describe('generateListeningTask', () => {
  it('should have right types', () => {
    const task = generateListeningTask();
    expect(task.type).toBe('listening');
    const { listening } = task;
    expect(listening).toBeDefined();
    expect(listening.name).toBeString();
    expect(listening.solution).toBeString();
  });
});

describe('generateTranslateTask', () => {
  it('should have right types with toEng lang', () => {
    const task = generateTranslateTask('toEng');
    expect(task.type).toBe('translate');
    const { translate } = task;
    expect(translate).toBeDefined();
    expect(translate.toLang).toBe('toEng');
    expect(translate.word).toBeString();
    expect(translate.solutions).toBeArray();
    expect(translate.solutions[0]).toBeString();
  });

  it('should have right types with toRus lang', () => {
    const task = generateTranslateTask('toRus');
    expect(task.type).toBe('translate');
    const { translate } = task;
    expect(translate).toBeDefined();
    expect(translate.toLang).toBe('toRus');
    expect(translate.word).toBeString();
    expect(translate.solutions).toBeArray();
    expect(translate.solutions[0]).toBeString();
  });
});

describe('generateImageTask', () => {
  it('should have right types', () => {
    const task = generateImageTask();
    expect(task.type).toBe('image');
    const { image } = task;
    expect(image).toBeDefined();
    expect(image.name).toBeString();
    expect(image.solutions).toBeArray();
    expect(image.solutions[0]).toBeString();
  });
});

describe('generateLogoTask', () => {
  it('should have right types', () => {
    const task = generateLogoTask();
    expect(task.type).toBe('logo');
    const { logo } = task;
    expect(logo).toBeDefined();
    expect(logo.name).toBeString();
  });
});

describe('generateCapitalTask', () => {
  it('should have right types', () => {
    const task = generateCapitalTask();
    expect(task.type).toBe('capital');
    const { capital } = task;
    expect(capital).toBeDefined();
    expect(capital.country).toBeString();
    expect(capital.solution).toBeString();
  });
});

describe('generateCountryTask', () => {
  it('should have right types', () => {
    const task = generateCountryTask();
    expect(task.type).toBe('country');
    const { country } = task;
    expect(country).toBeDefined();
    expect(country.capital).toBeString();
    expect(country.solution).toBeString();
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
    const response = validateSolution(task, '10');
    expect(response).toBeTruthy();
  });

  it('should throw error for unknown types', () => {
    const task = {
      type: 'unknown type',
      math: {
        solution: 10,
      },
    };
    expect(() => validateSolution(task, '10')).toThrow(/unknown type/);
  });

  it('should return false if solution is wrong', () => {
    const task = {
      type: 'math',
      math: {
        solution: 5,
      },
    };
    const response = validateSolution(task, '10');
    expect(response).toBeFalsy();
  });

  it('should validate listening task as true', () => {
    const task = {
      type: 'listening',
      listening: {
        name: 'hello',
        solution: 'hello',
      },
    };
    const response = validateSolution(task, 'hello');
    expect(response).toBeTruthy();
  });

  it('should validate listening task as false', () => {
    const task = {
      type: 'listening',
      listening: {
        name: 'hello',
        solution: 'hello',
      },
    };
    const response = validateSolution(task, 'star');
    expect(response).toBeFalsy();
  });

  it('should validate translate task as true', () => {
    const task = {
      type: 'translate',
      translate: {
        toLang: 'toRus',
        word: 'mouse',
        solutions: ['мышь', 'мышка'],
      },
    };
    expect(validateSolution(task, 'мышь')).toBeTruthy();
    expect(validateSolution(task, 'мышка')).toBeTruthy();
  });

  it('should validate translate task as false', () => {
    const task = {
      type: 'translate',
      translate: {
        toLang: 'toRus',
        word: 'mouse',
        solutions: ['мышь', 'мышка'],
      },
    };
    expect(validateSolution(task, 'дом')).toBeFalsy();
  });

  it('should validate image task as true', () => {
    const task = {
      type: 'image',
      image: {
        name: 'car',
        solutions: ['car', 'auto'],
      },
    };
    expect(validateSolution(task, 'car')).toBeTruthy();
  });

  it('should validate image task as false', () => {
    const task = {
      type: 'image',
      image: {
        name: 'car',
        solutions: ['car', 'auto'],
      },
    };
    expect(validateSolution(task, 'mouse')).toBeFalsy();
  });

  it('should validate logo task as true', () => {
    const task = {
      type: 'logo',
      logo: {
        name: 'bmw',
      },
    };
    expect(validateSolution(task, 'bmw')).toBeTruthy();
  });

  it('should validate logo task as false', () => {
    const task = {
      type: 'logo',
      logo: {
        name: 'logo',
      },
    };
    expect(validateSolution(task, 'apple')).toBeFalsy();
  });

  it('should validate capital task case insensitively as true', () => {
    const task = {
      type: 'capital',
      capital: {
        country: 'Belarus',
        solution: 'Minsk',
      },
    };
    expect(validateSolution(task, 'minsk')).toBeTruthy();
  });

  it('should validate capital task as false', () => {
    const task = {
      type: 'capital',
      capital: {
        country: 'Belarus',
        solution: 'Minsk',
      },
    };
    expect(validateSolution(task, 'Moscow')).toBeFalsy();
  });

  it('should validate country task case insensitively as true', () => {
    const task = {
      type: 'country',
      country: {
        capital: 'Minsk',
        solution: 'Belarus',
      },
    };
    expect(validateSolution(task, 'belarus')).toBeTruthy();
  });

  it('should validate country task as false', () => {
    const task = {
      type: 'country',
      country: {
        capital: 'Minsk',
        solution: 'Belarus',
      },
    };
    expect(validateSolution(task, 'russia')).toBeFalsy();
  });
});
