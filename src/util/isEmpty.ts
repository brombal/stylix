export function isEmpty(obj: unknown) {
  if (!obj) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  for (const _ in obj) return false;
  if (typeof obj === 'object') return true;
  return false;
}
