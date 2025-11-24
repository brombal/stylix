export function classifyProps(
  props: Record<string, unknown>,
  knownStyleProps: Record<string, string>,
): [any, any] {
  const styles = {} as any;
  const other = {} as any;

  for (const prop in props) {
    // If prop is not a valid JSX prop, it must be a CSS selector.
    // If prop has a style prop name and the value is likely a style value, it's a style prop.
    if (!isValidJSXProp(prop) || isStyleProp(prop, knownStyleProps)) {
      styles[prop] = props[prop];
    } else {
      other[prop] = props[prop];
    }
  }

  return [styles, other];
}

/**
 * Determines if `value` is a recognized CSS property (can be standard CSS or custom Stylix prop).
 * If it is, the simplified prop name is returned. Otherwise, false is returned.
 */
export function isStyleProp(
  prop: unknown,
  knownStyleProps: Record<string, string>,
): string | false {
  if (isValidJSXProp(prop)) {
    const simplified = simplifyStylePropName(prop);
    return simplified in knownStyleProps ? simplified : false;
  }
  return false;
}

export function isValidJSXProp(value: unknown): value is string {
  // Not an exact check, but mostly rules out complex css selectors
  return typeof value === 'string' && /^[a-z$][a-z0-9_-]*$/i.test(value);
}

export function simplifyStylePropName(value: string) {
  return value.toLowerCase().replace(/[^a-z]/g, '');
}
