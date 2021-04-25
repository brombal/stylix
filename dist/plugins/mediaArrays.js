import { isPlainObject } from '../util/isPlainObject';
import { mapObjectRecursive } from '../util/mapObjectRecursive';
/**
 * Expands arrays as media queries.
 */
export const mediaArrays = {
    name: 'mediaArrays',
    type: 'processStyles',
    plugin(ctx, styles) {
        var _a;
        // Fill out ditto values
        styles = mapObjectRecursive(styles, (key, value) => {
            if (Array.isArray(value)) {
                value.forEach((v, i) => {
                    if (v === '@')
                        value[i] = value[i - 1];
                });
                return { [key]: value };
            }
        });
        const mediaStyles = {};
        let nonMediaStyles = styles;
        (_a = ctx.media) === null || _a === void 0 ? void 0 : _a.forEach((mediaQuery, i) => {
            if (!mediaQuery) {
                nonMediaStyles = mapObjectRecursive(styles, (key, value) => {
                    if (Array.isArray(value)) {
                        return { [key]: value[i] };
                    }
                });
            }
            else {
                mediaStyles[`@media ${mediaQuery}`] = mapObjectRecursive(styles, (key, value, object, context) => {
                    if (key.startsWith('@keyframes'))
                        context.keyframes = true;
                    if (Array.isArray(value)) {
                        return { [key]: value[i] };
                    }
                    if (isPlainObject(value) || context.keyframes) {
                        return;
                    }
                    // delete key/value pair if primitive
                    return { [key]: undefined };
                });
            }
        });
        return Object.assign(Object.assign({}, nonMediaStyles), mediaStyles);
    },
};
//# sourceMappingURL=mediaArrays.js.map