import { reduceArrays } from '../mergeArrays';

describe('mergeArrays', () => {
  it('should return collapsed object', () => {
    expect(reduceArrays({ a: 1, b: 2, c: { d: 3 } })).toEqual({ a: 1, b: 2, c: { d: 3 } });
  });

  test('should merge simple objects in array', () => {
    expect(reduceArrays([{ a: 1 }, { b: 2 }])).toEqual({ a: 1, b: 2 });
  });

  test('should overwrite previous values', () => {
    expect(reduceArrays([{ a: 1 }, { a: 2 }])).toEqual({ a: 2 });
  });

  test('should merge double-nested arrays', () => {
    expect(reduceArrays([[{ a: 1 }], [[{ b: 2 }, [{ c: 3 }]]]])).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('should merge double-nested arrays within object', () => {
    expect(
      reduceArrays([
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
      reduceArrays([
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
      reduceArrays({
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

  test('should let object values take precedence over primitives', () => {
    expect(reduceArrays([{ color: 'red' }, 'blue', { fontSize: 13 }])).toEqual({
      color: 'red',
      fontSize: 13,
    });
  });

  test('should let object values take precedence over primitives (nested)', () => {
    expect(
      reduceArrays([
        { div: { color: 'red' } },
        { div: { color: { mobile: 'green' } } },
        { div: { color: 'blue' } },
        { div: { color: { desktop: 'green' } } },
      ]),
    ).toEqual({
      div: { color: { desktop: 'green' } },
    });
  });

  test('should let primitives override previous values', () => {
    expect(reduceArrays([1, 2, 3] as any)).toEqual({});
  });

  test('should let primitives override previous values (nested)', () => {
    expect(
      reduceArrays([
        //
        { div: { color: 'red' } },
        { div: { color: 'blue' } },
      ]),
    ).toEqual({
      div: { color: 'blue' },
    });
  });

  test('should let objects override primitives', () => {
    expect(reduceArrays([1, { a: 1 }, 3] as any)).toEqual({ a: 1 });
  });

  test('should nullify previous values', () => {
    expect(reduceArrays([{ a: 1, b: { c: 2 } }, { b: null }])).toEqual({ a: 1, b: null });
  });

  test('should ignore undefined values', () => {
    expect(reduceArrays([{ a: 1, b: { c: 2 } }, { b: undefined }])).toEqual({ a: 1, b: { c: 2 } });
  });

  test('should merge nested arrays', () => {
    expect(
      reduceArrays([
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
          d: [[[[{ r: 4 }]]], [[[{ s: 4 }]]]],
        },
      ]),
    ).toEqual({
      a: { g: 1, h: 3, i: 5, j: 6 },
      b: { m: { n: 5, o: 7, p: 8 } },
      c: { p: 2, q: 3 },
      d: { r: 4, s: 4 },
    });
  });

  test('should ignore undefined values', () => {
    expect(
      reduceArrays([
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
      reduceArrays([
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

  it('should convert complex media objects', () => {
    expect(
      JSON.stringify(
        reduceArrays([
          {
            a: [
              [
                [
                  [
                    [
                      {
                        e: 3,
                      },
                    ],
                  ],
                  [
                    {
                      f: [
                        {
                          g: 4,
                        },
                      ],
                    },
                  ],
                ],
              ],
            ],
          },
        ]),
      ),
    ).toEqual(
      JSON.stringify({
        a: {
          e: 3,
          f: {
            g: 4,
          },
        },
      }),
    );
  });
});
