import { cloneDeep } from './cloneDeep';
import { isPlainObject } from './isPlainObject';

/**
 * Invokes a callback for each key/value pair in `object`, and continues recursively on each value that is an array or a
 * plain object. Returns `object`.
 * The `cb` function will receive the key, the value, the current object being mapped, and a context object.
 * The context object is a plain object that you can modify as needed. The value will persist to subsequent calls to
 * `map` on child properties of `value`.
 */
export function walkRecursive<T = any>(
  object: T,
  cb: (key: string, value: any, currentObject: any, context: any) => void,
  context?: any,
): T {
  Object.entries(object).forEach(([key, value]) => {
    cb(key, value, object, context);
    if (Array.isArray(value) || isPlainObject(value)) {
      const contextClone = cloneDeep(context);
      walkRecursive(value, cb, contextClone);
    }
  });
  return object;
}
