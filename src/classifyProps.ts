export function classifyProps(props: any, knownProps: Record<string, string>): [any, any] {
  const styles = {} as any;
  const other = {} as any;

  for (const prop in props) {
    // If prop is not a valid JSX prop, it must be a CSS selector.
    // If prop has a style prop name and the value is likely a style value, it's a style prop.
    if (!isValidJSXProp(prop) || isStyleProp(prop, knownProps)) {
      styles[prop] = props[prop];
    } else {
      other[prop] = props[prop];
    }
  }

  return [styles, other];
}

/**
 * Determines if `value` is a recognized CSS property (can be standard CSS or custom Stylix prop).
 */
export function isStyleProp(prop: unknown, knownProps: Record<string, string>): prop is string {
  return isValidJSXProp(prop) && simplifyStylePropName(prop) in knownProps;
}

export function isValidJSXProp(value: unknown): value is string {
  // Not an exact check, but mostly rules out complex css selectors
  return typeof value === 'string' && /^[a-z$][a-z0-9_-]*$/i.test(value);
}

export function simplifyStylePropName(value: string) {
  return value.toLowerCase().replace(/[^a-z]/g, '');
}
