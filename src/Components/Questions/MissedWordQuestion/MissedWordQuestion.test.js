import { createShortcutCode } from './MissedWordQuestion';

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
