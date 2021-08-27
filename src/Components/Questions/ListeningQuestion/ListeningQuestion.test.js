import generate from './ListeningQuestion';

describe('generateListeningTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('listening');
    expect(task.name).toBeString();
    expect(task.solution).toBeString();
  });
});
