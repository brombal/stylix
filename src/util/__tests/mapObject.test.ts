import { mapObject } from '../mapObject';

describe('mapObject', () => {
  test('should map keys and values', () => {
    const result = mapObject(
      {
        a: 1,
        b: 'foo',
        c: false,
      },
      (key, value, target) => {
        const targetObject = target as Record<string, unknown>;
        targetObject[key] = value;
        if (typeof value === 'number') {
          targetObject[`${key}-mapped`] = value * 2;
        }
        if (typeof value === 'string') {
          targetObject[`${key}-mapped`] = `${value}-mapped`;
        }
      },
    );

    expect(result).toEqual({
      a: 1,
      'a-mapped': 2,
      b: 'foo',
      'b-mapped': 'foo-mapped',
      c: false,
    });
  });

  test('should map arrays', () => {
    const result = mapObject([1, 2, 3], (_key, value, target) => {
      const targetArray = target as unknown[];
      targetArray.push(value);
      targetArray.push((value as number) * 2);
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
      (key, value, target, _arg, mapRecursive) => {
        const targetObject = target as Record<string, unknown>;
        targetObject[key] = typeof value === 'number' ? value * 2 : mapRecursive(value);
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
      (key, value, target, ctx, mapRecursive) => {
        ctx.prefix = `${ctx.prefix}${key}`;
        const targetObject = target as Record<string, unknown>;
        targetObject[key] =
          typeof value === 'number' ? `${ctx.prefix}-${value}` : mapRecursive(value as object);
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

  test('should return input if not object or array', () => {
    expect(
      // @ts-expect-error testing invalid input
      mapObject('foo', () => {}),
    ).toEqual('foo');

    expect(
      // @ts-expect-error testing invalid input
      mapObject(1, () => {}),
    ).toEqual(1);
  });

  test('should correctly map nested mixed object/array', () => {
    expect(
      mapObject(
        [
          {
            a: 'a',
          },
          [{ b: 'b' }, { c: 'c' }],
        ],
        (key, value, target, _context, mapRecursive) => {
          if (typeof key === 'string') {
            const targetObject = target as Record<string, unknown>;
            targetObject[`${key}-mapped`] = mapRecursive(value as object);
          } else {
            const targetArray = target as unknown[];
            targetArray[key] = mapRecursive(value as object);
          }
        },
      ),
    ).toEqual([
      {
        'a-mapped': 'a',
      },
      [{ 'b-mapped': 'b' }, { 'c-mapped': 'c' }],
    ]);
  });
});
