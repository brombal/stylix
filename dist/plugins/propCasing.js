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
        return mapObjectRecursive_1.mapObjectRecursive(styles, (key, value) => {
            if (typeof key === 'string' && ctx.styleProps[classifyProps_1.simplifyStylePropName(key)]) {
                return { [ctx.styleProps[classifyProps_1.simplifyStylePropName(key)]]: value };
            }
        });
    },
};
const propCasingMap = (key, value, object, context) => {
    if (typeof key === 'string' && context.ctx.styleProps[classifyProps_1.simplifyStylePropName(key)]) {
        return { [context.ctx.styleProps[classifyProps_1.simplifyStylePropName(key)]]: value };
    }
};
//# sourceMappingURL=propCasing.js.map