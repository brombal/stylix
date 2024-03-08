import { cloneDeep } from '../src/util/cloneDeep';
import { flatten } from '../src/util/flatten';
import { hashString } from '../src/util/hashString';
import { isPlainObject } from '../src/util/isPlainObject';
import { mapObjectRecursive } from '../src/util/mapObjectRecursive';
import { merge } from '../src/util/merge';
import { visitRecursive } from '../src/util/visitRecursive';

describe('merge', () => {
  it('should work', () => {
    const symbol1 = Symbol('foo');
    const symbol2 = Symbol('foo');
    const result = merge(
      { a: 1, c: { x: 1, y: 2 }, [symbol1]: 4 },
      { a: 5, b: 2, c: { z: 3 }, [symbol2]: 5, q: undefined },
    );
    expect(result).toEqual({ a: 5, b: 2, c: { x: 1, y: 2, z: 3 }, [symbol1]: 4, [symbol2]: 5 });
    expect('q' in result).toEqual(false);
  });

  it('should ignore empty values', () => {
    const result = merge({ a: 1 }, null, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });
});

describe('hashString', () => {
  it('should work', () => {
    expect(hashString('test string 1')).toEqual('stylix-1v1gxef');
    expect(hashString('test string 2')).toEqual('stylix-1oz2d5g');
    expect(hashString('test string 3')).toEqual('stylix-14r3rpx');
  });
});

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

describe('cloneDeep', () => {
  it('should work', () => {
    const value = {
      number: 1,
      string: 'string',
      object: {
        a: 1,
        b: 2,
        c: 3,
        d: { a: 1, b: 2, c: 3 },
      },
      array: [1, 2, 3, 4],
      emptyishArray: Array(5),
    };
    const clone = cloneDeep(value);
    expect(clone).toEqual(value);
    expect(clone).not.toBe(value);
    expect(clone.object).toEqual(value.object);
    expect(clone.object).not.toBe(value.object);
    expect(clone.array).toEqual(value.array);
    expect(clone.array).not.toBe(value.array);
  });
});

describe('visitRecursive', () => {
  it('should work', () => {
    const value = {
      number: 1,
      string: 'string',
      object: {
        a: 1,
        b: 2,
        c: 3,
        d: { a: 1, b: 2, c: 3 },
      },
      array: [1, 2, 3, 4],
    };
    const cb = jest.fn();
    visitRecursive(value, cb);
    expect(cb.mock.calls).toEqual([
      [value, null],
      [value.object, 'object'],
      [value.object.d, 'd'],
      [value.array, 'array'],
    ]);
  });
});

describe('mapObjectRecursive', () => {
  it('should work', () => {
    const value = {
      number: 1,
      string: 'value',
      object: {
        a: 1,
        b: 2,
        c: 3,
        d: { a: 1, b: 2, c: 3 },
      },
      ignoreMe: {
        ignore: 'ignore',
      },
      deleteMe: 1,
      array: [1, 2, 3, 4],
    };
    const result = mapObjectRecursive(value, (key: string | number, value: any, object: any) => {
      if (key === 'ignoreMe') {
        return; // no return value will leave key/value unchanged in result
      }
      if (key === 'deleteMe') {
        return { [key]: undefined }; // undefined value will omit key from result
      }
      let newValue: any = value;
      if (typeof value === 'string') newValue = value + '-mapped';
      if (typeof value === 'number') newValue = value + 1;
      const newKey = typeof key === 'string' ? key + '-mapped' : key;
      return { [newKey]: newValue };
    });
    expect(result).toEqual({
      'number-mapped': 2,
      'string-mapped': 'value-mapped',
      'object-mapped': {
        'a-mapped': 2,
        'b-mapped': 3,
        'c-mapped': 4,
        'd-mapped': {
          'a-mapped': 2,
          'b-mapped': 3,
          'c-mapped': 4,
        },
      },
      ignoreMe: { 'ignore-mapped': 'ignore-mapped' },
      'array-mapped': [2, 3, 4, 5],
    });
  });
});

describe('flatten', () => {
  it('should work', () => {
    const value = flatten([[1, 2, 3], [[[4, 5], 6], 7], 8]);
    expect(value).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
