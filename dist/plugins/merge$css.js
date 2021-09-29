"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._merge$css = exports.merge$css = void 0;
const flatten_1 = require("../util/flatten");
const isPlainObject_1 = require("../util/isPlainObject");
/**
 * Merges $css property into parent styles
 */
exports.merge$css = {
    name: 'merge$css',
    type: 'processStyles',
    plugin(ctx, styles) {
        const result = {};
        _merge$css(styles, result);
        return result;
    },
};
function _merge$css(obj, ctx) {
    if (!isPlainObject_1.isPlainObject(obj))
        return;
    for (const key in obj) {
        if (key === '$css') {
            const $css = obj[key];
            if (Array.isArray($css)) {
                const flat$css = flatten_1.flatten($css);
                for (const val of flat$css) {
                    _merge$css(val, ctx);
                }
            }
            else {
                _merge$css($css, ctx);
            }
        }
        else {
            let value = obj[key];
            if (isPlainObject_1.isPlainObject(value)) {
                value = ctx[key] || {};
                _merge$css(obj[key], value);
            }
            ctx[key] = value;
        }
    }
}
exports._merge$css = _merge$css;
//# sourceMappingURL=merge$css.js.map