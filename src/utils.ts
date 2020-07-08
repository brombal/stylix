import camelcase from 'lodash.camelcase';
import postcss, { AcceptedPlugin } from 'postcss';
import postcssDefaultUnit from 'postcss-default-unit';
import postcssDuplicates from 'postcss-discard-duplicates';
import postcssInlineMedia from 'postcss-inline-media';
import postcssNested from 'postcss-nested';
import Stringifier from 'postcss/lib/stringifier';

import { StylixSheetContext, StylixThemeContext, useStylixThemeContext } from './context';
import cssPropertyNames from './css-props.json';
import { StylixElProps } from './types';

/**
 * Cheap string hashing, suitable for generating css class names
 */
export function hashString(str) {
  let hash = 5381,
    i = str.length;
  while (i) hash = (hash * 33) ^ str.charCodeAt(--i);
  return '_' + (hash >>> 0).toString(36);
}

export function camelToHyphen(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}

/**
 * Indicates that an object is most likely just an object literal.
 */
function isPlainObject(obj: any): boolean {
  return obj?.__proto__ === Object.prototype;
}

/**
 * Converts a value to a postcss-compatible string.
 * - Strings are returned as-is
 * - Arrays of plain strings/numbers are treated as inline media queries (for postcss-inline-media)
 * - Arrays of any other value are treated as media query blocks
 * - Returns non-plain objects using .toString()
 * - Returns plain objects by recursively converting to postcss
 *
 * getStylixContext is only required if using array interpolation (which needs access to the media array in the
 * context). You can pass the context object directly, or you may pass a callback that returns the context object.
 * The callback will only be invoked if the context is needed, but be aware that it may be invoked multiple times.
 */
export function postcssSerialize(
  obj: any,
  getStylixContext: StylixThemeContext | (() => StylixThemeContext),
): string {
  if (obj === null || obj === undefined) return '';

  if (typeof obj === 'string') return obj;

  if (Array.isArray(obj)) {
    const ctx: StylixThemeContext =
      typeof getStylixContext === 'function' ? getStylixContext() : getStylixContext;
    if (!ctx)
      console.error(
        'Stylix error: interpolating arrays into a css-like object requires access to the StylixContext.',
      );
    const isInline = obj.every((s) => typeof s === 'string' || typeof s === 'number');
    const styles = obj.map((mediaStyles, i) => {
      mediaStyles = postcssSerialize(mediaStyles, getStylixContext);
      return ctx.media[i]
        ? isInline
          ? `@${ctx.media[i]} ${mediaStyles}`
          : `@media ${ctx.media[i]} { ${mediaStyles} }`
        : mediaStyles;
    });
    const mediaStyles = styles.slice(0, ctx.media.length);
    const otherStyles = styles.slice(ctx.media.length);
    const sep = isInline ? ' ' : '\n';
    return otherStyles.join(sep) + ' ' + mediaStyles.join(sep);
  }

  if (typeof obj === 'function') {
    const ctx: StylixThemeContext =
      typeof getStylixContext === 'function' ? getStylixContext() : getStylixContext;
    if (!ctx)
      console.error(
        'Stylix error: interpolating functions into a css-like object requires access to the StylixContext.',
      );
    return postcssSerialize(obj(ctx.theme, ctx.media), ctx);
  }

  if (isPlainObject(obj)) {
    return Object.keys(obj).reduce((memo, key) => {
      const value = postcssSerialize(obj[key], getStylixContext);
      if (key === '$css') {
        return memo + value;
      }
      // An object value assumes that this key is a rule and not a property
      if (
        isPlainObject(obj[key]) ||
        (Array.isArray(obj[key]) &&
          !obj[key].some((v) => typeof v === 'string' || typeof v === 'number'))
      ) {
        return memo + `${key}{${value}}`;
      }
      return memo + `${camelToHyphen(key)}:${value};`;
    }, '');
  }

  return obj?.toString?.() || '';
}

/**
 * Converts a postcss-compatible string to an array of rules (suitable for passing to StyleSheet#insertRule()
 */
export async function postcssToRuleArray(
  css: string,
  plugins?: AcceptedPlugin[],
): Promise<string[]> {
  const rules = [''];
  await postcss([
    postcssNested,
    postcssInlineMedia,
    postcssDefaultUnit,
    postcssDuplicates,
    ...(plugins || []),
  ]).process(css, {
    // Dummy value that shows in debugger
    from: 'stylix-source',

    // We use postcss' built-in stringifier, but instead of stringifying, we append each root rule to an array.
    stringifier: (node, builder) => {
      let stackSize = 0;
      let currentRule = 0;
      const stringifier = new Stringifier((part, node, type) => {
        if (type === 'start' && stackSize++ === 0) {
          rules[++currentRule] = '';
        }
        rules[currentRule] += part;
        if (type === 'end') stackSize -= 1;
      });
      stringifier.stringify(node, builder);
    },
  });
  return rules.map((r) => r.trim()).filter(Boolean);
}

/**
 * A tagged template literal that has several helpers for media queries and stringifying various types.
 * If your string contains an array (for media queries), or function (for theme access), you must treat this like a
 * React hook because it needs access to the current Stylix context.
 */
export function css(str: TemplateStringsArray, ...args: any[]): any {
  const strParts = [...str];
  let ctx: StylixThemeContext;
  for (let i = args.length - 1; i >= 0; i--) {
    const value = postcssSerialize(args[i], () => ctx || (ctx = useStylixThemeContext()));
    strParts.splice(i + 1, 0, value);
  }
  return { $css: strParts.join('') };
}

/**
 * Applies all the rules from the current Stylix context (only updates if they have changed)
 */
export async function applyContextRules(ctx: StylixSheetContext) {
  const allStyles = Object.values(ctx.styles)
    .map((s) => s.styles)
    .join('');
  const newRules = await postcssToRuleArray(allStyles, ctx.plugins);
  if (!newRules.every((v, i) => ctx.currentRules[i] === newRules[i])) {
    const container = ctx.devMode ? ctx.styleElement : ctx.stylesheet;
    ctx.currentRules = newRules;

    if (container instanceof HTMLStyleElement && container.tagName?.toLowerCase() === 'style') {
      container.innerHTML = ctx.currentRules.join('');
    } else if (container instanceof CSSStyleSheet) {
      while (container.rules.length) {
        container.deleteRule(0);
      }
      ctx.currentRules
        .filter((r) => !!r.trim())
        .forEach((rule, i) => container.insertRule(rule, i));
    }
  }
}

export function classifyProps(ctx: StylixSheetContext, props: StylixElProps<any>): [any, any] {
  const styles = {} as any;
  const other = {} as any;

  Object.keys(props).forEach((key) => {
    if (cssPropertyNames.includes(camelcase(key)) || ctx.customProps?.includes(key)) {
      styles[key] = props[key];
    } else {
      other[key] = props[key];
    }
  });

  return [styles, other];
}
