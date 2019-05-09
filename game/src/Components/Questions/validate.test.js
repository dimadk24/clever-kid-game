import { defaultValidator } from './validate';

describe('defaultValidator', () => {
  it('should compare userSolution and task.solution', () => {
    const task = {
      solution: '1',
    };
    expect(defaultValidator(task, '1')).toBeTruthy();
  });

  it('should parseInt if solution is int', () => {
    const task = {
      solution: 1,
    };
    expect(defaultValidator(task, '1')).toBeTruthy();
  });

  it('should find solution in array if solutions is array', () => {
    const task = {
      solutions: ['1', '2'],
    };
    expect(defaultValidator(task, '1')).toBeTruthy();
  });
});
