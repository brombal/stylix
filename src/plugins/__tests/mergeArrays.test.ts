import { getMergeableValues, mergeObjects, recursivelyMergeArrayValues } from '../mergeArrays';

describe('mergeArrays', () => {
  describe('getMergeableValues', () => {
    test('should return last primitive', () => {
      expect(getMergeableValues([1, 2, 3])).toEqual(3);
    });

    test('should return all objects', () => {
      expect(getMergeableValues([{ a: 1 }, { b: 2 }])).toEqual([{ a: 1 }, { b: 2 }]);
    });

    test('should return last primitive in mix', () => {
      expect(getMergeableValues([{ a: 1 }, { b: 2 }, 2, 3])).toEqual(3);
    });

    test('should return last objects in mix', () => {
      expect(getMergeableValues([{ a: 1 }, 2, { b: 2 }, { c: 3 }])).toEqual([{ b: 2 }, { c: 3 }]);
    });
  });

  describe('recursivelyMergeArrayValues', () => {
    test('should merge basic nested object', () => {
      const result = recursivelyMergeArrayValues({
        w: [{ a: 1 }, { b: 2 }, { c: 3 }],
        x: {
          y: {
            z: [{ a: 1 }, { b: 2 }, { c: 3 }],
          },
        },
      });
      expect(result).toEqual({
        w: { a: 1, b: 2, c: 3 },
        x: {
          y: {
            z: { a: 1, b: 2, c: 3 },
          },
        },
      });
    });
  });

  describe('mergeObjects', () => {
    test('should merge basic arrays', () => {
      const result = mergeObjects([
        //
        { a: 1 },
        { b: 2 },
        { c: 3 },
      ]);
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    test('should merge nested objects', () => {
      expect(
        mergeObjects([
          {
            a: 1,
            b: { g: 1, h: 2 },
            c: {
              m: { n: 1 },
            },
          },
          {
            c: {
              m: { n: 3 },
              o: 4,
            },
            d: 5,
          },
        ]),
      ).toEqual({
        a: 1,
        b: { g: 1, h: 2 },
        c: {
          m: { n: 3 },
          o: 4,
        },
        d: 5,
      });
    });

    test('should merge nested arrays', () => {
      expect(
        mergeObjects([
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
        mergeObjects([
          //
          { b: [{ m: 1 }] },
          { b: undefined },
        ]),
      ).toEqual({
        b: { m: 1 },
      });
    });

    test('should use primitives if last value', () => {
      expect(
        mergeObjects([
          //
          { b: [{ m: 1 }] },
          { b: 5 },
        ]),
      ).toEqual({
        b: 5,
      });
    });

    test('should use merged final objects', () => {
      expect(
        mergeObjects([
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

    test('should ignore falsy values', () => {
      const result = mergeObjects([
        //
        { a: 1 },
        null,
        { b: 2 },
      ]);
      expect(result).toEqual({ a: 1, b: 2 });
    });
  });
});
