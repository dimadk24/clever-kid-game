import generate from './CapitalQuestion';

describe('generateCapitalTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('capital');
    expect(task.country).toBeString();
    expect(task.solution).toBeString();
  });
});
