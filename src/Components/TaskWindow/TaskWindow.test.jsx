import { shallow } from 'enzyme';
import React from 'react';
import TaskWindow, {
  convertTaskToStringQuestion, FAIL,
  generateWindowClassName, INITIAL_WINDOW_CLASS_NAME,
  NOT_ANSWERED, SUCCESS,
  validateSolution,
} from './TaskWindow';

describe('TaskWindow', () => {
  const emptyFunction = () => ({});
  const task = {
    type: 'math',
    math: {
      operands: [1, 2],
      sign: '+',
      solution: 3,
    },
  };

  it('should render form with input', () => {
    const wrapper = shallow(
      <TaskWindow
        onSuccess={emptyFunction}
        onFail={emptyFunction}
        onClose={emptyFunction}
        task={task}
      />,
    );
    expect(wrapper).toContainMatchingElement('form');
    expect(wrapper).toContainMatchingElement('input');
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

describe('generateWindowClassName', () => {
  it('should return initial class if type is not answered', () => {
    expect(generateWindowClassName(NOT_ANSWERED)).toBe(INITIAL_WINDOW_CLASS_NAME);
  });

  it('should return initial class and success if type is success', () => {
    const actual = generateWindowClassName(SUCCESS);
    expect(actual).toMatch(INITIAL_WINDOW_CLASS_NAME);
    expect(actual).toMatch(SUCCESS);
  });

  it('should return initial class and fail if type is fail', () => {
    const actual = generateWindowClassName(FAIL);
    expect(actual).toMatch(INITIAL_WINDOW_CLASS_NAME);
    expect(actual).toMatch(FAIL);
  });

  it('should throw nice error if type is wrong 1', () => {
    expect(() => generateWindowClassName()).toThrow(/undefined/);
  });

  it('should throw nice error if type is wrong 2', () => {
    expect(() => generateWindowClassName('wrong type')).toThrow(/wrong type/);
  });
});
