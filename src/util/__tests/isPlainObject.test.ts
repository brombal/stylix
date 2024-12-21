import { isPlainObject } from '../isPlainObject';

describe('isPlainObject', () => {
  it('should work', () => {
    expect(isPlainObject('marginRight')).toEqual(false);
    expect(isPlainObject(1234)).toEqual(false);
    expect(isPlainObject(new Date())).toEqual(false);
    expect(isPlainObject([1, 2, 3])).toEqual(false);
    expect(isPlainObject(new (class Foo {})())).toEqual(false);
    expect(isPlainObject({ a: 1, b: 2 })).toEqual(true);
  });
});
