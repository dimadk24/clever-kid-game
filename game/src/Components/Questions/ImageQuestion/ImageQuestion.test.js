import generate from './ImageQuestion';

describe('generateImageTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('image');
    expect(task.name).toBeString();
    expect(task.solutions).toBeArray();
    expect(task.solutions[0]).toBeString();
  });
});
