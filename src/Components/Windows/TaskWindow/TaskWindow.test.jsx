import {
  generateWindowClassName,
  INITIAL_WINDOW_CLASS_NAME, NOT_ANSWERED, SUCCESS, FAIL,
} from './TaskWindow';

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
