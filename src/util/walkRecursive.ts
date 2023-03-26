import { cloneDeep } from './cloneDeep.ts';
import { isPlainObject } from './isPlainObject.ts';

/**
 * Invokes a callback for each key/value pair in `object`, and continues recursively on each value that is an array or a
 * plain object. Returns `object`.
 * The `cb` function will receive the key, the value, the current object being mapped, and a context object.
 * The context object is a plain object that you can modify as needed. The value will persist to subsequent calls to
 * `map` on child properties of `value`.
 */
export function walkRecursive<T extends Record<string, any> = any>(
  object: T,
  cb: (key: string, value: any, currentObject: any, context: any) => void,
  context?: any,
): T {
  const keys = Object.keys(object);
  for (const key of keys) {
    const value = object[key];
    cb(key, value, object, context);
    if (Array.isArray(value) || isPlainObject(value)) {
      const contextClone = cloneDeep(context);
      walkRecursive(value, cb, contextClone);
    }
  }
  return object;
}
