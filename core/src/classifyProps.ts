import { useStylixContext } from './StylixProvider';

export function classifyProps(props: any, knownProps: Record<string, string>): [any, any] {
  const styles = {} as any;
  const other = {} as any;

  for (const prop in props) {
    // If prop is not a valid JSX prop, it must be a CSS selector
    if (!isValidJSXProp(prop) || (isStyleProp(prop, knownProps) && isStyleValue(props[prop]))) {
      styles[prop] = props[prop];
    } else {
      other[prop] = props[prop];
    }
  }

  return [styles, other];
}

export function useClassifyProps(props: any) {
  const ctx = useStylixContext();
  const [styles, other] = classifyProps(props, ctx.styleProps);
  return [styles, other];
}

/**
 * Determines if `value` is a recognized CSS property (can be standard CSS or custom Stylix prop).
 */
export function isStyleProp(prop: string, knownProps: Record<string, string>): boolean {
  return isValidJSXProp(prop) && simplifyStylePropName(prop) in knownProps;
}

export function isValidJSXProp(value: string): boolean {
  // Not an exact check, but mostly rules out complex css selectors
  return /^[a-z$][a-z0-9_-]*$/i.test(value);
}

export function simplifyStylePropName(value: string) {
  return value.toLowerCase().replace(/[^a-z]/gi, '');
}

/**
 * Tries to determine if `value` is likely to be a valid CSS property value.
 * We can't be 100% sure, but this should catch most cases.
 * There is a check here to make sure React elements do not pass the test, as this
 * has turned out to be a common case where a property like 'content' means something
 * to a component, but is also a valid CSS property.
 */
export function isStyleValue(value: any): boolean {
  return (
    typeof value === 'function' ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    Array.isArray(value) ||
    // Check for plain objects, and make sure it doesn't have the $$typeof property (react elements are never valid as style values)
    (typeof value === 'object' && value.constructor === Object && !('$$typeof' in value))
  );
}
