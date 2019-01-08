import { generate } from './LogoQuestion';

describe('generateLogoTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('logo');
    expect(task.name).toBeString();
  });
});
