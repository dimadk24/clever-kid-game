import { generate } from './ChooseImageQuestion';

describe('generateChooseImageTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('chooseImage');
    expect(task.object).toBeString();
    expect(task.suggestions).toBeArray();
    expect(task.suggestions[0]).toBeString();
  });
});
