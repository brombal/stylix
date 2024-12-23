import type { StylixObject, StylixStyles } from '../types';
import { isEmpty } from '../util/isEmpty';
import type { StylixPlugin } from './index';

/**
 * Merges arrays into flat objects, recursively throughout the styles object.
 */
export const mergeArrays: StylixPlugin = {
  name: 'mergeArrays',
  type: 'processStyles',
  plugin: (_ctx, styles) => _mergeArrays(styles),
};

export function _mergeArrays(obj: StylixStyles) {
  if (Array.isArray(obj)) return reduceArray(obj);
  return reduceObjectProperties(obj);
}

function reduceArray(arr: StylixStyles[]): StylixObject | undefined {
  arr = arr.flat();
  let target = arr[0] as StylixObject;

  for (let i = 1; i < arr.length; i++) {
    let source = arr[i] as StylixObject | undefined;

    if (Array.isArray(source)) {
      source = reduceArray(source);
    }

    // ignore falsy values
    if (typeof source === 'undefined') continue;

    // if both values are primitives, the source value takes precedence
    if (typeof target !== 'object' && typeof source !== 'object') {
      target = source;
      continue;
    }

    // if target is primitive but source is object, replace target with source
    if (typeof target !== 'object') {
      target = source;
      continue;
    }

    for (const key in source) {
      const value = source[key] as StylixStyles;
      // if the key does not exist in target, just add it
      if (!(key in target)) target[key] = value;
      // else, if the target value is an object or array:
      else if (typeof target[key] === 'object') {
        // if the source value is an object or array, convert target to array if necessary and push source value
        if (typeof value === 'object') {
          if (!Array.isArray(target[key])) target[key] = [target[key]];
          (target[key] as StylixStyles[]).push(value);
        }
        // else, ignore the source value (it's primitive; object values take precedence)
      }
      // else, target value is primitive, overwrite target value
      else {
        target[key] = value;
      }
    }
  }

  return reduceObjectProperties(target);
}

const _reduced = Symbol('reduced');

function reduceObjectProperties(
  obj: Exclude<StylixStyles, StylixStyles[]>,
): StylixObject | undefined {
  if (!obj || isEmpty(obj)) return undefined;
  if (typeof obj !== 'object') return obj;
  if (obj?.[_reduced as any]) {
    return obj;
  }

  for (const k in obj) {
    if (!obj[k] || typeof obj[k] !== 'object') continue;
    obj[k] = _mergeArrays(obj[k] as StylixStyles);
  }

  Object.defineProperty(obj, _reduced as any, { value: true, enumerable: false });
  return obj;
}
