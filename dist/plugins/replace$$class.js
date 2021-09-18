"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace$$class = void 0;
const mapObjectRecursive_1 = require("../util/mapObjectRecursive");
/**
 * Replaces $$class with hash in string values
 */
exports.replace$$class = {
    name: 'replace$$class',
    type: 'processStyles',
    plugin(ctx, styles) {
        return mapObjectRecursive_1.mapObjectRecursive(styles, replace$$classMap, { ctx });
    },
};
const replace$$classMap = (key, value, object, context) => {
    value = typeof value === 'string' ? value.replace('$$class', context.ctx.hash) : value;
    key = typeof key === 'string' ? key.replace('$$class', context.ctx.hash) : key;
    return { [key]: value };
};
//# sourceMappingURL=replace$$class.js.map