import { isPlainObject } from './isPlainObject';

/**
 * Deeply clones a value.
 */
export function cloneDeep<T>(value: T): T {
  if (!value || typeof value !== 'object') return value;
  if (Array.isArray(value)) {
    const clone: any = [];
    for (let index = 0; index < value.length; ++index) {
      clone.push(cloneDeep(value[index]));
    }
    return clone;
  }
  if (isPlainObject(value)) {
    const clone: any = {};
    for (const key in value) {
      clone[key] = cloneDeep(value[key]);
    }
    return clone;
  }
  return value;
}
