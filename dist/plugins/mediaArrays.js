"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaArrays = void 0;
const isPlainObject_1 = require("../util/isPlainObject");
const mapObjectRecursive_1 = require("../util/mapObjectRecursive");
/**
 * Expands arrays as media queries.
 */
exports.mediaArrays = {
    name: 'mediaArrays',
    type: 'processStyles',
    plugin(ctx, styles) {
        // Fill out ditto values
        styles = mapObjectRecursive_1.mapObjectRecursive(styles, mapDittoValues);
        const mediaStyles = {};
        let nonMediaStyles = styles;
        for (const i in ctx.media) {
            const mediaQuery = ctx.media[i];
            if (!mediaQuery) {
                nonMediaStyles = mapObjectRecursive_1.mapObjectRecursive(styles, mapNonMedia, { i });
            }
            else {
                mediaStyles[`@media ${mediaQuery}`] = mapObjectRecursive_1.mapObjectRecursive(styles, mapMediaStyles, { i });
            }
        }
        return Object.assign(Object.assign({}, nonMediaStyles), mediaStyles);
    },
};
function mapDittoValues(key, value) {
    if (Array.isArray(value)) {
        for (const i in value) {
            const v = value[i];
            if (v === '@')
                value[i] = value[+i - 1];
        }
        return { [key]: value };
    }
}
function mapNonMedia(key, value, object, context) {
    if (Array.isArray(value)) {
        return { [key]: value[context.i] };
    }
}
function mapMediaStyles(key, value, object, context) {
    if (key.startsWith('@keyframes'))
        context.keyframes = true;
    if (Array.isArray(value)) {
        return { [key]: value[context.i] };
    }
    if (isPlainObject_1.isPlainObject(value) || context.keyframes) {
        return;
    }
    // delete key/value pair if primitive
    return { [key]: undefined };
}
//# sourceMappingURL=mediaArrays.js.map