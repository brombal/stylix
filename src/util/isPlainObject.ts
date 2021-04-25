/**
 * Indicates that an object is most likely just an object literal.
 */
export function isPlainObject(obj: any): boolean {
  return obj?.__proto__ === Object.prototype;
}
