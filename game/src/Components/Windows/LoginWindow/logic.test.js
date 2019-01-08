import { errorFromMapOrDefault } from './logic';

describe('errorFromMapOrDefault', () => {
  it('should return error with message from map 1', () => {
    const errors = {
      one: 'test message',
      two: 'another message',
    };
    const error = errorFromMapOrDefault(errors, 'one', '');
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('test message');
  });

  it('should return error with message from map 2', () => {
    const errors = {
      one: 'test message',
      two: 'another message',
    };
    const error = errorFromMapOrDefault(errors, 'two', '');
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('another message');
  });

  it('should return error with default message if not found in the map', () => {
    const errors = {
      one: 'test message',
      two: 'another message',
    };
    const error = errorFromMapOrDefault(errors, 'three', 'super error');
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('super error');
  });
});
