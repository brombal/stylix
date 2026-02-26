import { applyPlugins } from './plugins';
import type { StylixContext } from './stylixContext';
import type { StylixObject } from './types';
import { isEmpty } from './util/isEmpty';
import { isPlainObject } from './util/isPlainObject';

/**
 * Serialize selector and styles to css rule string
 */
function serialize(selector: string, styles: StylixObject) {
  if (selector.startsWith('@') && Array.isArray(styles)) {
    return `${selector} ${styles.join(', ')};`;
  }
  const lines: string[] = [];
  for (const key in styles) {
    const value = styles[key];
    if (isPlainObject(value)) lines.push(serialize(key, value));
    else lines.push(`  ${key}: ${value};`);
  }
  return `${selector} {\n${lines.join('\n')} }`;
}

/**
 * Converts a Stylix CSS object to an array of rules, suitable for passing to StyleSheet#insertRule.
 */
export default function stylesToRuleArray(
  styles: StylixObject,
  className: string,
  context: StylixContext,
): string[] {
  if (isEmpty(styles)) return [];
  try {
    const processedStyles = applyPlugins(
      'processStyles',
      styles,
      className,
      context,
    ) as StylixObject;

    const result: string[] = [];

    // Handle @layer rules first
    if (processedStyles['@layer']) {
      result.push(serialize('@layer', processedStyles['@layer'] as StylixObject));
      delete processedStyles['@layer'];
    }
    for (const key in processedStyles) {
      const value = processedStyles[key] as StylixObject;
      result.push(serialize(key, value));
    }
    return result;
  } catch (e: any) {
    if (e.name && e.reason) {
      console.error(
        `${e.name}: ${e.reason}\n`,
        `${e.source.replace('\n', ' ').substring(Math.max(0, e.column - 20), Math.max(0, e.column - 20) + 100)}\n`,
        `${' '.repeat(20)}^`,
      );
    } else {
      console.error(e);
    }
    return [];
  }
}
