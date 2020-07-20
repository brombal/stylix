import { isCSSProperty } from './classifyProps';
import { camelToHyphen, isPlainObject } from './utils';
/**
 * Converts a value to a postcss-compatible string.
 * - Strings are returned as-is
 * - Arrays of plain strings/numbers are treated as inline media queries (for postcss-inline-media)
 * - Arrays of any other value are treated as media query blocks
 * - Returns non-plain objects using .toString()
 * - Returns plain objects by recursively converting to postcss
 *
 * ctx is only required if using array or function interpolation (which need access to the theme object or media array
 * in the context).
 */
export default function serializeToPostcss(obj, stylixCtx, themeCtx) {
    var _a;
    if (obj === null || obj === undefined)
        return '';
    if (typeof obj === 'string')
        return obj.trim();
    if (Array.isArray(obj)) {
        return serializeArrayToPostcss(obj, undefined, stylixCtx, themeCtx);
    }
    if (typeof obj === 'function') {
        if (!stylixCtx || !themeCtx)
            console.error('Stylix error: interpolating functions into a css-like object requires access to the StylixContext.');
        return serializeToPostcss(obj(themeCtx.theme, themeCtx.media), stylixCtx, themeCtx);
    }
    if (isPlainObject(obj)) {
        return Object.keys(obj).reduce((memo, key) => {
            const value = obj[key];
            if (typeof value === 'undefined')
                return memo;
            // $css values can be strings, objects, or arrays.
            // Strings and objects are treated normally;
            // arrays elements are serialized individually and concatenated.
            if (key === '$css') {
                if (Array.isArray(value)) {
                    return (memo + value.reduce((memo, v) => memo + serializeToPostcss(v, stylixCtx, themeCtx), ''));
                }
                else {
                    return memo + serializeToPostcss(value, stylixCtx, themeCtx);
                }
            }
            let css;
            const isProperty = isCSSProperty(key, stylixCtx);
            if (Array.isArray(value)) {
                css = serializeArrayToPostcss(value, isProperty, stylixCtx, themeCtx);
            }
            else {
                css = serializeToPostcss(value, stylixCtx, themeCtx);
            }
            // Assume this key is a selector if the value is an object or if the key is not a CSS property.
            if (isPlainObject(value) || !isProperty) {
                return memo + `${key}{${css}}`;
            }
            return memo + `${camelToHyphen(key)}:${css};`;
        }, '');
    }
    return ((_a = obj === null || obj === void 0 ? void 0 : obj.toString) === null || _a === void 0 ? void 0 : _a.call(obj).trim()) || '';
}
function serializeArrayToPostcss(arr, inlineHint, stylixCtx, themeCtx) {
    if (!stylixCtx)
        console.error('Stylix error: interpolating arrays into a css-like object requires access to the StylixContext.');
    const isInline = inlineHint !== null && inlineHint !== void 0 ? inlineHint : arr.every((s) => typeof s === 'string' || typeof s === 'number');
    const mediaStyles = [];
    const otherStyles = [];
    arr.forEach((styles, i) => {
        var _a;
        styles = (_a = serializeToPostcss(styles, stylixCtx, themeCtx)) === null || _a === void 0 ? void 0 : _a.trim();
        if (!styles)
            return;
        if (themeCtx.media[i]) {
            mediaStyles.push(isInline
                ? `@(${themeCtx.media[i]}) ${styles}`
                : `@media ${themeCtx.media[i]} { ${styles} }`);
        }
        else {
            otherStyles.push(styles);
        }
    });
    const sep = isInline ? ' ' : '\n';
    return (otherStyles.join(sep) + ' ' + mediaStyles.join(sep)).trim();
}
//# sourceMappingURL=serializeToPostcss.js.map