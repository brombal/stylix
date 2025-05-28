type ClassNamePrimitive = string | number | boolean | null | undefined;
type ClassName =
  | ClassNamePrimitive
  | ClassName[]
  | { [key: string]: ClassNamePrimitive }
  | (() => ClassName);

// Internal helper to collect class name parts without joining
function cxArray(args: ClassName[]): string[] {
  const classNames: string[] = [];
  for (const arg of args) {
    if (arg && typeof arg === 'string') {
      classNames.push(arg);
    } else if (Array.isArray(arg)) {
      classNames.push(...cxArray(arg));
    } else if (typeof arg === 'function') {
      classNames.push(...cxArray([arg()]));
    } else if (typeof arg === 'object' && arg !== null) {
      for (const [key, value] of Object.entries(arg)) {
        if (value) {
          classNames.push(key);
        }
      }
    }
  }
  return classNames;
}

/**
 * A utility function to create a string of class names based on the provided parameters.
 * Accepts a variable number of arguments, each of which can be one of the following:
 *
 * - A string, which will be included in the class name string.
 * - An object, where the keys are class names and the values are booleans indicating whether to include the class name.
 * - An array of strings or objects, which will be flattened and processed as above.
 * - A function that returns a string, object, or array, which will be processed as above.
 * - Any other value will be ignored.
 */
export function cx(...args: ClassName[]): string {
  return cxArray(args).join(' ');
}
