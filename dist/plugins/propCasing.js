"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propCasing = void 0;
const classifyProps_1 = require("../classifyProps");
const mapObjectRecursive_1 = require("../util/mapObjectRecursive");
/**
 * Fixes casing and hyphenation on known style props
 */
exports.propCasing = {
    name: 'normalizeStyleProps',
    type: 'processStyles',
    plugin(ctx, styles) {
        return (0, mapObjectRecursive_1.mapObjectRecursive)(styles, propCasingMap, { ctx });
    },
};
function propCasingMap(key, value, object, context) {
    if (typeof key === 'string' && context.ctx.styleProps[(0, classifyProps_1.simplifyStylePropName)(key)]) {
        return { [context.ctx.styleProps[(0, classifyProps_1.simplifyStylePropName)(key)]]: value };
    }
}
//# sourceMappingURL=propCasing.js.map