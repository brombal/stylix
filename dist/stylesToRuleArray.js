import { applyPlugins } from './plugins';
import { isPlainObject } from './util/isPlainObject';
/**
 * Converts a Stylix CSS object to an array of rules, suitable for passing to StyleSheet#insertRule.
 */
export default function stylesToRuleArray(styles, hash, context) {
    try {
        const processedStyles = applyPlugins('processStyles', styles, hash, context);
        // serialize to css rules array
        const serialize = function serialize(selector, styles) {
            const block = Object.entries(styles)
                .map(([key, value]) => {
                if (isPlainObject(value))
                    return serialize(key, value);
                return `  ${key}: ${value};`;
            })
                .join('\n');
            return `${selector} {\n${block} }`;
        };
        return Object.entries(processedStyles).map(([key, value]) => serialize(key, value));
    }
    catch (e) {
        if (e.name && e.reason) {
            console.error(`${e.name}: ${e.reason}\n`, e.source.replace('\n', ' ').substr(Math.max(0, e.column - 20), 100) + '\n', ' '.repeat(20) + '^');
        }
        else {
            console.error(e);
        }
        return [];
    }
}
//# sourceMappingURL=stylesToRuleArray.js.map