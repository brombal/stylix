/**
 * Indicates that an object is most likely just an object literal.
 */
export function isPlainObject(obj: any): obj is Record<string, any> {
  return typeof obj === 'object' && obj?.constructor === Object;
}
