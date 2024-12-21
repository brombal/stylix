import { mapObject } from '../mapObject';

describe('mapObject', () => {
  test('should map keys and values', () => {
    const result = mapObject(
      {
        a: 1,
        b: 'foo',
        c: false,
      },
      (key, value) => {
        if (typeof value === 'number') return { [key]: value, [`${key}-mapped`]: value * 2 };
        if (typeof value === 'string') return { [`${key}-mapped`]: `${value}-mapped` };
        return undefined;
      },
    );

    expect(result).toEqual({
      a: 1,
      'a-mapped': 2,
      'b-mapped': 'foo-mapped',
    });
  });

  test('should map arrays', () => {
    const result = mapObject([1, 2, 3], (key, value) => {
      return [value, value * 2];
    });

    expect(result).toEqual([1, 2, 2, 4, 3, 6]);
  });

  test('should map object recursively', () => {
    const result = mapObject(
      {
        a: 1,
        b: {
          c: 2,
          d: 3,
        },
      },
      (key, value, _source, _arg, mapRecursive) => {
        return { [key]: typeof value === 'number' ? value * 2 : mapRecursive(value) };
      },
    );

    expect(result).toEqual({
      a: 2,
      b: {
        c: 4,
        d: 6,
      },
    });
  });

  test('should persist context object recursively', () => {
    const result = mapObject(
      {
        a: 1,
        b: {
          c: {
            d: 3,
            e: 4,
          },
          f: 2,
        },
      },
      (key, value, _source, ctx, mapRecursive) => {
        ctx.prefix = `${ctx.prefix}${key}`;
        return {
          [key]: typeof value === 'number' ? `${ctx.prefix}-${value}` : mapRecursive(value),
        };
      },
      {
        prefix: '',
      },
    );

    expect(result).toEqual({
      a: 'a-1',
      b: {
        c: {
          d: 'bcd-3',
          e: 'bce-4',
        },
        f: 'bf-2',
      },
    });
  });

  test('should error if return type is wrong', () => {
    expect(() => {
      mapObject(
        {
          a: 1,
          b: 2,
        },
        (key, value) => {
          return [];
        },
      );
    }).toThrow();

    expect(() => {
      mapObject([1, 2, 3], (key, value) => {
        return {};
      });
    }).toThrow();
  });

  test('should return input if not object or array', () => {
    expect(
      mapObject('foo', (key, value) => {
        return {};
      }),
    ).toEqual('foo');

    expect(
      mapObject(1, (key, value) => {
        return {};
      }),
    ).toEqual(1);
  });
});
