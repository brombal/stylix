import { applyPlugins } from './plugins';
import { StylixContext } from './StylixProvider';
import { isPlainObject } from './util/isPlainObject';

/**
 * Converts a Stylix CSS object to an array of rules, suitable for passing to StyleSheet#insertRule.
 */
export default function stylesToRuleArray(
  styles: any,
  hash: string,
  context: StylixContext,
): string[] {
  try {
    const processedStyles = applyPlugins('processStyles', styles, hash, context);

    // serialize to css rules array
    const serialize = function serialize(selector, styles) {
      const lines: string[] = [];
      for (const key in styles) {
        const value = styles[key];
        if (isPlainObject(value)) lines.push(serialize(key, value));
        else lines.push(`  ${key}: ${value};`);
      }
      return `${selector} {\n${lines.join('\n')} }`;
    };

    const result: string[] = [];
    for (const key in processedStyles) {
      const value = processedStyles[key];
      result.push(serialize(key, value));
    }
    return result;
  } catch (e) {
    if (e.name && e.reason) {
      console.error(
        `${e.name}: ${e.reason}\n`,
        e.source.replace('\n', ' ').substr(Math.max(0, e.column - 20), 100) + '\n',
        ' '.repeat(20) + '^',
      );
    } else {
      console.error(e);
    }
    return [];
  }
}
