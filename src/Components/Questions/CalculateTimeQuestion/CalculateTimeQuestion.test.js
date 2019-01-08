import { generate } from './CalculateTimeQuestion';

describe('generateCalculateTimeTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('calculateTime');
    expect(task.hours).toBeNumber();
    expect(task.hours).toBeLessThan(24);
    expect(task.minutes).toBeNumber();
    expect(task.minutes).toBeLessThan(60);
    expect(task.solution).toBeNumber();
  });
});
