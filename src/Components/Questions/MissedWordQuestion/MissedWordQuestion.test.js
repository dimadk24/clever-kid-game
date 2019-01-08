import { createShortcutCode, generate } from './MissedWordQuestion';

describe('createShortcutCode', () => {
  it('should create shortcut code for 0 based index', () => {
    expect(createShortcutCode(0)).toBe('Digit1');
  });

  it('should create shortcut code for 1-8 indexes', () => {
    for (let i = 1; i < 9; i += 1) {
      expect(createShortcutCode(i)).toBe(`Digit${i + 1}`);
    }
  });

  it('should throw error for indexes bigger than 8', () => {
    expect(() => createShortcutCode(9)).toThrow(/9/);
  });
});

describe('generateMissedWordTask', () => {
  it('should have right types', () => {
    const task = generate();
    expect(task.type).toBe('missedWord');
    expect(task.parts).toBeArrayOfSize(2);
    expect(task.parts[0]).toBeString();
    expect(task.suggestions).toBeArray();
    expect(task.suggestions[0]).toBeString();
    expect(task.solution).toBeString();
  });
});
