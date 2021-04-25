import { isPlainObject } from './isPlainObject';

/**
 * Invokes a callback on `object`, and on every property of `object` that is a plain object, and continues recursively.
 * `cb` will receive the key as the second argument (it will be `null` on the first call).
 */
export function visitRecursive(object: any, cb: (object: any, key: string) => void): void {
  const _visitRecursive = function _visitRecursive(object: any, key: string) {
    cb(object, key);
    Object.entries(object).forEach(([key, value]) => {
      if (Array.isArray(value) || isPlainObject(value)) _visitRecursive(value, key);
    });
  };
  _visitRecursive(object, null);
}
