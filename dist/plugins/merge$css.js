import { flatten } from '../util/flatten';
import { isPlainObject } from '../util/isPlainObject';
export function _merge$css(obj, ctx) {
    if (!isPlainObject(obj))
        return;
    Object.keys(obj).forEach((key) => {
        if (key === '$css') {
            const $css = obj[key];
            if (Array.isArray($css)) {
                flatten($css).forEach((val) => {
                    _merge$css(val, ctx);
                });
            }
            else {
                _merge$css($css, ctx);
            }
        }
        else {
            let value = obj[key];
            if (isPlainObject(value)) {
                value = ctx[key] || {};
                _merge$css(obj[key], value);
            }
            ctx[key] = value;
        }
    });
}
/**
 * Merges $css property into parent styles
 */
export const merge$css = {
    name: 'merge$css',
    type: 'processStyles',
    plugin(ctx, styles) {
        const result = {};
        _merge$css(styles, result);
        return result;
    },
};
//# sourceMappingURL=merge$css.js.map