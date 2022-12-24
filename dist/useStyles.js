"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobalStyles = exports.useKeyframes = exports.useStyles = void 0;
const react_1 = require("react");
const applyRules_1 = __importDefault(require("./applyRules"));
const plugins_1 = require("./plugins");
const stylesToRuleArray_1 = __importDefault(require("./stylesToRuleArray"));
const StylixProvider_1 = require("./StylixProvider");
const hashString_1 = require("./util/hashString");
const useIsoLayoutEffect_1 = __importDefault(require("./util/useIsoLayoutEffect"));
function cleanup(ctx) {
    if (typeof ctx.cleanupRequest !== 'undefined')
        return;
    ctx.cleanupRequest = setTimeout(() => {
        let deleted = false;
        for (const i in ctx.rules) {
            const rule = ctx.rules[i];
            if (!rule.refs) {
                delete ctx.rules[rule.hash];
                deleted = true;
            }
        }
        deleted && (0, applyRules_1.default)(ctx);
        delete ctx.cleanupRequest;
    }, 100);
}
function compare(a, b) {
    if (a === b)
        return true;
    if (typeof a !== typeof b)
        return false;
    if (typeof a === 'object') {
        if (Array.isArray(a) && Array.isArray(b) && a.length !== b.length)
            return false;
        else if (Object.keys(a).length !== Object.keys(b).length)
            return false;
        for (const key in b) {
            if (!compare(a[key], b[key]))
                return false;
        }
    }
    return a === b;
}
/**
 * Accepts a Stylix CSS object and returns a unique className based on the styles' hash.
 * The styles are registered with the Stylix context and will be applied to the document.
 * If `global` is false, provided styles will be nested within the generated classname.
 * Returns the className hash if enabled, or an empty string.
 */
function useStyles(styles, options = { global: false, disabled: false }) {
    const stylixCtx = (0, StylixProvider_1.useStylixContext)();
    const prevRef = (0, react_1.useRef)({ styles: {}, hash: '' });
    const changed = !compare(styles, prevRef.current.styles);
    prevRef.current.styles = styles;
    if (changed) {
        // Preprocess styles with plugins
        if (!options.disabled && styles)
            styles = (0, plugins_1.applyPlugins)('preprocessStyles', styles, null, stylixCtx);
        // Serialize value and generate hash
        const json = !options.disabled && styles && JSON.stringify(styles);
        prevRef.current.hash =
            json && json !== '{}' && json !== '[]'
                ? (0, hashString_1.hashString)(JSON.stringify(stylixCtx.media || []) + json)
                : '';
    }
    const { hash } = prevRef.current;
    if (hash && changed && !stylixCtx.rules[hash]) {
        // If not global styles, wrap original styles with classname
        if (!options.global)
            styles = { ['.' + hash]: styles };
        stylixCtx.rules[hash] = {
            hash,
            rules: (0, stylesToRuleArray_1.default)(styles, hash, stylixCtx),
            refs: 1,
        };
        stylixCtx.requestApply = true;
    }
    // Apply styles if requested.
    // This runs on every render. We utilize useLayoutEffect so that it runs *after* all the other
    // renders have completed. stylixCtx.requestApply guards against multiple runs. This reduces the number of calls
    // to applyRules(), but prevents styles potentially being added to the DOM after other components force the
    // browser to compute styles.
    (0, useIsoLayoutEffect_1.default)(() => {
        if (!stylixCtx.requestApply)
            return;
        stylixCtx.requestApply = false;
        (0, applyRules_1.default)(stylixCtx);
    }, undefined, true);
    // When hash changes, add/remove ref count
    (0, useIsoLayoutEffect_1.default)(() => {
        if (!hash || !changed)
            return;
        if (stylixCtx.rules[hash]) {
            stylixCtx.rules[hash].refs++;
        }
        return () => {
            stylixCtx.rules[hash].refs--;
            cleanup(stylixCtx);
        };
    }, [hash], false);
    return hash;
}
exports.useStyles = useStyles;
function useKeyframes(keyframes, options = { disabled: false }) {
    return useStyles({ '@keyframes $$class': keyframes }, Object.assign({ global: true }, options));
}
exports.useKeyframes = useKeyframes;
function useGlobalStyles(styles, options = { disabled: false }) {
    return useStyles(styles, Object.assign(Object.assign({}, options), { global: true }));
}
exports.useGlobalStyles = useGlobalStyles;
//# sourceMappingURL=useStyles.js.map