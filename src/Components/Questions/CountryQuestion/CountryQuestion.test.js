import generate from './CountryQuestion';

describe('generateCountryTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('country');
    expect(task.capital).toBeString();
    expect(task.solution).toBeString();
  });
});
