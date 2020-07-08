"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_camelcase_1 = __importDefault(require("lodash.camelcase"));
const postcss_1 = __importDefault(require("postcss"));
const postcss_default_unit_1 = __importDefault(require("postcss-default-unit"));
const postcss_discard_duplicates_1 = __importDefault(require("postcss-discard-duplicates"));
const postcss_inline_media_1 = __importDefault(require("postcss-inline-media"));
const postcss_nested_1 = __importDefault(require("postcss-nested"));
const stringifier_1 = __importDefault(require("postcss/lib/stringifier"));
const context_1 = require("./context");
const css_props_json_1 = __importDefault(require("./css-props.json"));
/**
 * Cheap string hashing, suitable for generating css class names
 */
function hashString(str) {
    let hash = 5381, i = str.length;
    while (i)
        hash = (hash * 33) ^ str.charCodeAt(--i);
    return '_' + (hash >>> 0).toString(36);
}
exports.hashString = hashString;
function camelToHyphen(str) {
    return str
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase();
}
exports.camelToHyphen = camelToHyphen;
/**
 * Indicates that an object is most likely just an object literal.
 */
function isPlainObject(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.__proto__) === Object.prototype;
}
/**
 * Converts a value to a postcss-compatible string.
 * - Strings are returned as-is
 * - Arrays of plain strings/numbers are treated as inline media queries (for postcss-inline-media)
 * - Arrays of any other value are treated as media query blocks
 * - Returns non-plain objects using .toString()
 * - Returns plain objects by recursively converting to postcss
 *
 * getStylixContext is only required if using array interpolation (which needs access to the media array in the
 * context). You can pass the context object directly, or you may pass a callback that returns the context object.
 * The callback will only be invoked if the context is needed, but be aware that it may be invoked multiple times.
 */
function postcssSerialize(obj, getStylixContext) {
    var _a;
    if (obj === null || obj === undefined)
        return '';
    if (typeof obj === 'string')
        return obj;
    if (Array.isArray(obj)) {
        const ctx = typeof getStylixContext === 'function' ? getStylixContext() : getStylixContext;
        if (!ctx)
            console.error('Stylix error: interpolating arrays into a css-like object requires access to the StylixContext.');
        const isInline = obj.every((s) => typeof s === 'string' || typeof s === 'number');
        const styles = obj.map((mediaStyles, i) => {
            mediaStyles = postcssSerialize(mediaStyles, getStylixContext);
            return ctx.media[i]
                ? isInline
                    ? `@${ctx.media[i]} ${mediaStyles}`
                    : `@media ${ctx.media[i]} { ${mediaStyles} }`
                : mediaStyles;
        });
        const mediaStyles = styles.slice(0, ctx.media.length);
        const otherStyles = styles.slice(ctx.media.length);
        const sep = isInline ? ' ' : '\n';
        return otherStyles.join(sep) + ' ' + mediaStyles.join(sep);
    }
    if (typeof obj === 'function') {
        const ctx = typeof getStylixContext === 'function' ? getStylixContext() : getStylixContext;
        if (!ctx)
            console.error('Stylix error: interpolating functions into a css-like object requires access to the StylixContext.');
        return postcssSerialize(obj(ctx.theme, ctx.media), ctx);
    }
    if (isPlainObject(obj)) {
        return Object.keys(obj).reduce((memo, key) => {
            const value = postcssSerialize(obj[key], getStylixContext);
            if (key === '$css') {
                return memo + value;
            }
            // An object value assumes that this key is a rule and not a property
            if (isPlainObject(obj[key]) ||
                (Array.isArray(obj[key]) &&
                    !obj[key].some((v) => typeof v === 'string' || typeof v === 'number'))) {
                return memo + `${key}{${value}}`;
            }
            return memo + `${camelToHyphen(key)}:${value};`;
        }, '');
    }
    return ((_a = obj === null || obj === void 0 ? void 0 : obj.toString) === null || _a === void 0 ? void 0 : _a.call(obj)) || '';
}
exports.postcssSerialize = postcssSerialize;
/**
 * Converts a postcss-compatible string to an array of rules (suitable for passing to StyleSheet#insertRule()
 */
function postcssToRuleArray(css, plugins) {
    return __awaiter(this, void 0, void 0, function* () {
        const rules = [''];
        yield postcss_1.default([
            postcss_nested_1.default,
            postcss_inline_media_1.default,
            postcss_default_unit_1.default,
            postcss_discard_duplicates_1.default,
            ...(plugins || []),
        ]).process(css, {
            // Dummy value that shows in debugger
            from: 'stylix-source',
            // We use postcss' built-in stringifier, but instead of stringifying, we append each root rule to an array.
            stringifier: (node, builder) => {
                let stackSize = 0;
                let currentRule = 0;
                const stringifier = new stringifier_1.default((part, node, type) => {
                    if (type === 'start' && stackSize++ === 0) {
                        rules[++currentRule] = '';
                    }
                    rules[currentRule] += part;
                    if (type === 'end')
                        stackSize -= 1;
                });
                stringifier.stringify(node, builder);
            },
        });
        return rules.map((r) => r.trim()).filter(Boolean);
    });
}
exports.postcssToRuleArray = postcssToRuleArray;
/**
 * A tagged template literal that has several helpers for media queries and stringifying various types.
 * If your string contains an array (for media queries), or function (for theme access), you must treat this like a
 * React hook because it needs access to the current Stylix context.
 */
function css(str, ...args) {
    const strParts = [...str];
    let ctx;
    for (let i = args.length - 1; i >= 0; i--) {
        const value = postcssSerialize(args[i], () => ctx || (ctx = context_1.useStylixThemeContext()));
        strParts.splice(i + 1, 0, value);
    }
    return { $css: strParts.join('') };
}
exports.css = css;
/**
 * Applies all the rules from the current Stylix context (only updates if they have changed)
 */
function applyContextRules(ctx) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const allStyles = Object.values(ctx.styles)
            .map((s) => s.styles)
            .join('');
        const newRules = yield postcssToRuleArray(allStyles, ctx.plugins);
        if (!newRules.every((v, i) => ctx.currentRules[i] === newRules[i])) {
            const container = ctx.devMode ? ctx.styleElement : ctx.stylesheet;
            ctx.currentRules = newRules;
            if (container instanceof HTMLStyleElement && ((_a = container.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'style') {
                container.innerHTML = ctx.currentRules.join('');
            }
            else if (container instanceof CSSStyleSheet) {
                while (container.rules.length) {
                    container.deleteRule(0);
                }
                ctx.currentRules
                    .filter((r) => !!r.trim())
                    .forEach((rule, i) => container.insertRule(rule, i));
            }
        }
    });
}
exports.applyContextRules = applyContextRules;
function classifyProps(ctx, props) {
    const styles = {};
    const other = {};
    Object.keys(props).forEach((key) => {
        var _a;
        if (css_props_json_1.default.includes(lodash_camelcase_1.default(key)) || ((_a = ctx.customProps) === null || _a === void 0 ? void 0 : _a.includes(key))) {
            styles[key] = props[key];
        }
        else {
            other[key] = props[key];
        }
    });
    return [styles, other];
}
exports.classifyProps = classifyProps;
//# sourceMappingURL=utils.js.map