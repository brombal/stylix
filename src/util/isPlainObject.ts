/**
 * Indicates that an object is most likely just an object literal.
 */
export function isPlainObject(value: any): value is Record<string, any> {
  if (!value || typeof value !== 'object') return false;
  return Object.getPrototypeOf(value) === Object.prototype;
}
