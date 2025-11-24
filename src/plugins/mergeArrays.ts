import type { StylixPlugin } from './index';

/**
 * Merges arrays into flat objects, recursively throughout the styles object.
 */
export const mergeArrays: StylixPlugin = {
  name: 'mergeArrays',
  type: 'processStyles',
  plugin: (_ctx, styles) => reduceArrays(styles),
};

export function reduceArrays(obj: any) {
  return _reduceArrays(obj);
}

export function _reduceArrays(obj: any, target: any = {}) {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (!item || typeof item !== 'object') continue;
      _reduceArrays(item, target);
    }
    return target;
  }

  for (const key in obj) {
    const value = obj[key];

    // If target[key] is an object
    if (target[key] && typeof target[key] === 'object') {
      // If value is an object, merge them
      if (value && typeof value === 'object') {
        _reduceArrays(value, target[key]);
      }
      // If value is not undefined, replace target[key]
      else if (value !== undefined) {
        target[key] = value;
      }
      // otherwise do nothing, keep target[key] as is
    }
    // If target[key] is not an object, process normally
    else {
      target[key] = _reduceArrays(value, {});
    }
  }
  return target;
}
