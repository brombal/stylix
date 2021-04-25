export function classifyProps(props: any, knownProps: Record<string, string>): [any, any] {
  const styles = {} as any;
  const other = {} as any;

  Object.keys(props).forEach((key) => {
    // If prop is not a valid JSX prop, it must be a CSS selector
    if (!isValidJSXProp(key) || isStyleProp(key, knownProps)) {
      styles[key] = props[key];
    } else {
      other[key] = props[key];
    }
  });

  return [styles, other];
}

/**
 * Determines if `value` is a recognized CSS property (can be standard CSS or custom Stylix prop).
 */
export function isStyleProp(value: string, knownProps: Record<string, string>): boolean {
  return isValidJSXProp(value) && simplifyStylePropName(value) in knownProps;
}

export function isValidJSXProp(value: string): boolean {
  // Not an exact check, but mostly rules out complex css selectors
  return /^[a-z$][a-z0-9_-]*$/i.test(value);
}

export function simplifyStylePropName(value: string) {
  return value.toLowerCase().replace(/[^a-z]/gi, '');
}
