import { _mergeArrays } from '../mergeArrays';

describe('mergeArrays', () => {
  it('should return collapsed object', () => {
    expect(_mergeArrays({ a: 1, b: 2, c: { d: 3 } })).toEqual({ a: 1, b: 2, c: { d: 3 } });
  });

  test('should merge simple objects in array', () => {
    expect(_mergeArrays([{ a: 1 }, { b: 2 }])).toEqual({ a: 1, b: 2 });
  });

  test('should merge double-nested arrays', () => {
    expect(_mergeArrays([[{ a: 1 }], [[{ b: 2 }, [{ c: 3 }]]]])).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('should merge double-nested arrays within object', () => {
    expect(
      _mergeArrays([
        {
          a: [
            [
              [
                {
                  b: 1,
                },
              ],
              [
                {
                  c: { d: 2 },
                },
              ],
            ],
          ],
        },
      ]),
    ).toEqual({
      a: {
        b: 1,
        c: { d: 2 },
      },
    });
  });

  test('should merge complex top-level array', () => {
    expect(
      _mergeArrays([
        {
          a: 1,
          b: {
            c: 1,
            d: [
              { e: 1, f: 1 },
              { f: 2, g: 2 },
            ],
          },
        },
        {
          a: 2,
          b: { c: 2, e: 2 },
          e: [
            { e: 1, f: 1 },
            { f: 2, g: 2 },
          ],
        },
      ]),
    ).toEqual({
      a: 2,
      b: { c: 2, d: { e: 1, f: 2, g: 2 }, e: 2 },
      e: { e: 1, f: 2, g: 2 },
    });
  });

  test('should merge complex top-level object', () => {
    expect(
      _mergeArrays({
        a: 1,
        b: {
          c: 1,
          d: [
            { e: 1, f: 1 },
            { f: 2, g: 2 },
          ],
        },
        d: [
          { e: 1, f: 1 },
          { f: 2, g: 2 },
        ],
      }),
    ).toEqual({
      a: 1,
      b: { c: 1, d: { e: 1, f: 2, g: 2 } },
      d: { e: 1, f: 2, g: 2 },
    });
  });

  test('should let object values take precedence over primitives (nested)', () => {
    expect(
      _mergeArrays([
        { div: { color: 'red' } },
        { div: { color: { mobile: 'green' } } },
        { div: { color: 'blue' } },
        { div: { color: { desktop: 'green' } } },
      ]),
    ).toEqual({
      div: { color: { desktop: 'green', mobile: 'green' } },
    });
  });

  test('should let primitives override previous values', () => {
    expect(_mergeArrays([1, 2, 3] as any)).toEqual(3);
  });

  test('should let primitives override previous values (nested)', () => {
    expect(
      _mergeArrays([
        //
        { div: { color: 'red' } },
        { div: { color: 'blue' } },
      ]),
    ).toEqual({
      div: { color: 'blue' },
    });
  });

  test('should let objects override primitives', () => {
    expect(_mergeArrays([1, { a: 1 }, 3] as any)).toEqual({ a: 1 });
  });

  test('should merge nested arrays', () => {
    expect(
      _mergeArrays([
        {
          a: [
            { g: 1, h: 2 },
            { h: 3, i: 4 },
          ],
          b: [{ m: [{ n: 5, o: 6 }] }],
          c: [{ p: 2, q: 3 }],
        },
        {
          a: [{ i: 5 }, { j: 6 }],
          b: [{ m: [{ o: 7, p: 8 }] }],
          d: [{ r: 4 }],
        },
      ]),
    ).toEqual({
      a: { g: 1, h: 3, i: 5, j: 6 },
      b: { m: { n: 5, o: 7, p: 8 } },
      c: { p: 2, q: 3 },
      d: { r: 4 },
    });
  });

  test('should ignore undefined values', () => {
    expect(
      _mergeArrays([
        //
        { b: [{ m: 1 }] },
        { b: undefined },
      ]),
    ).toEqual({
      b: { m: 1 },
    });
  });

  test('should use merged final objects', () => {
    expect(
      _mergeArrays([
        //
        { b: [{ m: 1 }] },
        { b: 5 },
        { b: { m: 2, n: 4 } },
        { b: { m: 3 } },
      ]),
    ).toEqual({
      b: { m: 3, n: 4 },
    });
  });

  it('should convert simple media objects', () => {
    expect(
      JSON.stringify(
        _mergeArrays([
          [{ color: 'color-default' }, { fontWeight: 'fw-default' }],
          [
            {
              '@media (max-width: 600px)': [{ color: 'color-mobile' }, { fontWeight: 'fw-mobile' }],
            },
          ],
          [{ 'html[theme="dark"] &': [{ color: 'color-dark' }, { fontWeight: 'fw-dark' }] }],
        ]),
      ),
    ).toEqual(
      JSON.stringify({
        color: 'color-default',
        fontWeight: 'fw-default',
        '@media (max-width: 600px)': { color: 'color-mobile', fontWeight: 'fw-mobile' },
        'html[theme="dark"] &': { color: 'color-dark', fontWeight: 'fw-dark' },
      }),
    );
  });
});
