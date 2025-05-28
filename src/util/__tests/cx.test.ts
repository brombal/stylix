import { cx } from '../cx';

describe('cx', () => {
  test('should include only truthy string arguments', () => {
    expect(cx('foo')).toBe('foo');
    expect(cx('foo', 'bar', 'baz')).toBe('foo bar baz');
    expect(cx('', 'foo', '', 'bar')).toBe('foo bar');
  });

  test('should ignore non-string primitives', () => {
    expect(cx(0, 1, false, true, null, undefined)).toBe('');
    expect(cx('a', 0, false, 'b')).toBe('a b');
  });

  test('should include object keys with truthy values', () => {
    const obj = {
      foo: true,
      bar: false,
      baz: 1,
      qux: 0,
      corge: '',
      grault: 'hi',
    };
    expect(cx(obj)).toBe('foo baz grault');
  });

  test('should flatten array arguments', () => {
    expect(cx(['foo', 'bar'])).toBe('foo bar');
    // nested arrays and objects should also flatten correctly
    expect(cx('foo', ['bar', 'baz'])).toBe('foo bar baz');
    expect(cx(['foo', ['bar', { baz: true }]])).toBe('foo bar baz');
  });

  test('should invoke functions and flatten their result', () => {
    // function returning string
    expect(cx(() => 'foo')).toBe('foo');
    // function returning object
    expect(cx(() => ({ foo: true, bar: false, baz: 'yes' }))).toBe('foo baz');
    // function returning undefined
    expect(cx(() => undefined)).toBe('');
    // function returning array
    expect(cx(() => ['foo', 'bar'])).toBe('foo bar');
    // nested function should be evaluated recursively
    expect(cx(() => () => 'foo')).toBe('foo');
  });
});
