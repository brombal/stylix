import cssPropertyNames from './css-props.json';
import { StylixContext } from './StylixProvider';

/**
 * Determines which props are styles to be converted to css, or regular props to be passed down to the
 * underlying element.
 */
export function classifyProps(ctx: StylixContext, props: any): [any, any] {
  const styles = {} as any;
  const other = {} as any;

  Object.keys(props).forEach((key) => {
    if (isCSSProperty(key, ctx) || !isValidJSXProp(key)) {
      styles[key] = props[key];
    } else {
      other[key] = props[key];
    }
  });

  return [styles, other];
}

/**
 * Determines if `value` is a recognized (standard or custom Stylix) CSS property.
 */
export function isCSSProperty(value: string, ctx: StylixContext): boolean {
  if (!isValidJSXProp(value)) return false; // Not an exact check, but mostly rules out complex css selectors
  value = value.toLowerCase().replace(/[^a-z]/gi, '');
  return (
    cssPropertyNames.includes(value) ||
    [...ctx.customProps].map((s) => s.toLowerCase().replace(/[^a-z]/gi, '')).includes(value)
  );
}

function isValidJSXProp(value: string): boolean {
  return /^[a-z$][a-z0-9_-]*$/i.test(value);
}
