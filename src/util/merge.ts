import { isPlainObject } from './isPlainObject';

export function merge<A>(a?: A): A;
export function merge<A, B>(a: A, b: B): A & B;
export function merge<A, B, C>(a: A, b: B, c: C): A & B & C;
export function merge<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
export function merge<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;

export function merge(...items: any[] | undefined) {
  items = items.filter((item) => typeof item !== 'undefined' && item !== null);
  if (!items?.length) return undefined;

  if (items.length === 1) return items[0];

  // If items are not all objects/arrays, return the last object/array if possible, otherwise last non-undefined value
  if (!items.every((item) => Array.isArray(item) || isPlainObject(item))) {
    items.reverse();
    return (
      items.find((item) => Array.isArray(item) || isPlainObject(item)) ||
      items.find((item) => typeof item !== 'undefined')
    );
  }

  return items.reduce(
    (merged, item) => {
      if (!Array.isArray(item) && !isPlainObject(item)) return merged;

      [...Object.keys(item), ...Object.getOwnPropertySymbols(item)].forEach((key: any) => {
        const result = merge(merged[key], item[key]);
        if (typeof result !== 'undefined') merged[key] = result;
      });
      return merged;
    },
    Array.isArray(items[0]) ? [] : {},
  );
}
