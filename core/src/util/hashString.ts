/**
 * Cheap string hashing, suitable for generating css class names
 */
export function hashString(str: string): string {
  let hash = 5381;
  let i = str.length;
  while (i-- > 0) hash = (hash * 33) ^ str.charCodeAt(i);
  return 'stylix-' + (hash >>> 0).toString(36);
}
