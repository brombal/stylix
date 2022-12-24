"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins_1 = require("./plugins");
const isPlainObject_1 = require("./util/isPlainObject");
/**
 * Converts a Stylix CSS object to an array of rules, suitable for passing to StyleSheet#insertRule.
 */
function stylesToRuleArray(styles, hash, context) {
    try {
        const processedStyles = (0, plugins_1.applyPlugins)('processStyles', styles, hash, context);
        // serialize to css rules array
        const serialize = function serialize(selector, styles) {
            const lines = [];
            for (const key in styles) {
                const value = styles[key];
                if ((0, isPlainObject_1.isPlainObject)(value))
                    lines.push(serialize(key, value));
                else
                    lines.push(`  ${key}: ${value};`);
            }
            return `${selector} {\n${lines.join('\n')} }`;
        };
        const result = [];
        for (const key in processedStyles) {
            const value = processedStyles[key];
            result.push(serialize(key, value));
        }
        return result;
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
exports.default = stylesToRuleArray;
//# sourceMappingURL=stylesToRuleArray.js.map