import { generate } from './NumberToStringQuestion';

describe('generateNumberToStringTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('numberToString');
    expect(task.number).toBeNumber();
  });
});
