import { cloneDeep } from './cloneDeep';
import { isPlainObject } from './isPlainObject';

/**
 * Invokes `map` on each key/value pair in `object`. The key/value pair is deleted from the object and replaced by
 * merging in the object returned from `map`. Recursively descends into all object and array values.
 * The `map` function will receive the key, the value, the current object being mapped, and a context object.
 * The context object is a plain object that you can modify as needed. The value will persist to subsequent calls to
 * `map` on child properties of `value`.
 */
export function mapObjectRecursive(
  object: any,
  map: (
    key: string | number,
    value: any,
    object: any,
    context: any,
  ) => Record<string | number, any>,
): any {
  const _mapObjectRecursive = function _mapObjectRecursive(
    object: any,
    map: (
      key: string | number,
      value: any,
      object: any,
      context: any,
    ) => Record<string | number, any>,
    context: any,
  ) {
    const clone = Array.isArray(object) ? [] : {};
    Object.entries(object).forEach(([key, value]: [number | string, any]) => {
      if (Array.isArray(object)) key = +key;
      const contextClone = cloneDeep(context);
      let result = map(key, value, object, contextClone);
      if (typeof result !== 'undefined' && typeof result !== 'object' && !Array.isArray(result))
        throw new Error(
          'mapObjectRecursive: return value of map function must be undefined, object, or array!',
        );
      if (typeof result === 'undefined') {
        result = { [key]: value };
      }
      Object.entries(result).forEach(([key, value]: [number | string, any]) => {
        if (isPlainObject(value) || Array.isArray(value))
          value = _mapObjectRecursive(value, map, contextClone);
        if (typeof value !== 'undefined') clone[key] = value;
      });
    });
    return clone;
  };
  return _mapObjectRecursive(object, map, {});
}
