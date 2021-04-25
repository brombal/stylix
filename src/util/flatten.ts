/**
 * Flatten an array recursively.
 */
export function flatten<TEntryType>(array: unknown[]): TEntryType[] {
  const result: unknown[] = [];
  _flatten(array, result);
  return result as TEntryType[];
}

function _flatten(array: unknown[], result: unknown[]): void {
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    Array.isArray(value) ? _flatten(value as any, result) : result.push(value);
  }
}
