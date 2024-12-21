import { isEmpty } from '../isEmpty';

describe('isEmpty', () => {
  test('should work', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(1)).toBe(false);
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty('a')).toBe(false);
  });
});
