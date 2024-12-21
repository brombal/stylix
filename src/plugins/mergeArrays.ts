import { isPlainObject } from '../util/isPlainObject';
import type { StylixPlugin } from './index';

/**
 * Merges arrays into flat objects recursively throughout the styles object.
 */
export const mergeArrays: StylixPlugin = {
  name: 'mergeArrays',
  type: 'processStyles',
  plugin: (_ctx, styles) =>
    Array.isArray(styles)
      ? mergeObjects(styles)
      : isPlainObject(styles)
        ? recursivelyMergeArrayValues(styles)
        : styles,
};

/**
 * Given a plain object, iterates over each key and merges any array values into a single object. Recursively descends
 * into plain object values.
 */
export function recursivelyMergeArrayValues(obj: Record<string, any>): unknown {
  for (const key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
      obj[key] = mergeObjects(value.flat());
    } else if (isPlainObject(value)) {
      obj[key] = recursivelyMergeArrayValues(value) as any;
    }
  }

  return obj;
}

/**
 * Given an array of objects, iterates over every available key, and merges all the values of the same key into a single value.
 * The first object in the array will be modified and used as the return value. You should flatten the array before passing it, if necessary.
 */
export function mergeObjects(objects: any[]) {
  const keys = new Set<string | symbol>();

  const result = objects[0] || {};

  for (const object of objects) {
    if (!object) continue;
    for (const key in object) {
      if (keys.has(key)) continue;
      keys.add(key);

      // Get all non-undefined values for key from all objects
      const values = objects
        .filter(Boolean)
        .map((object) => object[key])
        .filter((v) => v !== undefined)
        .flat();

      const mergedValue = getMergeableValues(values);
      result[key] = Array.isArray(mergedValue) ? mergeObjects(mergedValue) : mergedValue;
    }
  }

  return result;
}

/**
 * Given a list of values, will return the last series of objects or arrays, or the last value of the
 * array if it is a primitive. You should flatten the array before if necessary.
 * e.g.:
 *   getMergeableValues([{ a: 1 }, 2, { b: 2 }, { c: 3 }]) => [{ b: 2 }, { c: 3 }]
 *   getMergeableValues([{ a: 1 }, { b: 2 }, 2, 3]) => [3]
 */
export function getMergeableValues(values: any[]) {
  const consistentValues: any[] = [];

  const lastValue = values[values.length - 1];
  if (!isPlainObject(lastValue) && !Array.isArray(lastValue)) {
    return lastValue;
  }

  for (let i = values.length - 1; i >= 0; i--) {
    const value = values[i];
    if (isPlainObject(value)) {
      consistentValues.unshift(value);
    } else {
      break;
    }
  }

  return consistentValues;
}
