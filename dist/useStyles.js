"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobalStyles = exports.useKeyframes = exports.useStyles = void 0;
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
        deleted && applyRules_1.default(ctx);
        delete ctx.cleanupRequest;
    }, 100);
}
/**
 * Accepts a Stylix CSS object and returns a unique className based on the styles' hash.
 * The styles are registered with the Stylix context and will be applied to the document.
 * If `global` is false, provided styles will be nested within the generated classname.
 * Returns the className hash if enabled, or an empty string.
 */
function useStyles(styles, options = { global: false, disabled: false }) {
    const stylixCtx = StylixProvider_1.useStylixContext();
    // Preprocess styles with plugins
    if (!options.disabled && styles)
        styles = plugins_1.applyPlugins('preprocessStyles', styles, null, stylixCtx);
    // Serialize value and generate hash
    const json = !options.disabled && styles && JSON.stringify(styles);
    const hash = json && json !== '{}' && json !== '[]'
        ? hashString_1.hashString(JSON.stringify(stylixCtx.media || []) + json)
        : '';
    // When hash changes, add/remove ref count
    useIsoLayoutEffect_1.default(() => {
        if (!hash)
            return;
        stylixCtx.rules[hash].refs++;
        return () => {
            stylixCtx.rules[hash].refs--;
            cleanup(stylixCtx);
        };
    }, [hash]);
    if (!hash) {
        return '';
    }
    // If css is not cached, process css and apply it.
    if (!stylixCtx.rules[hash]) {
        // If not global styles, wrap original styles with classname
        if (!options.global)
            styles = { ['.' + hash]: styles };
        stylixCtx.rules[hash] = {
            hash,
            rules: stylesToRuleArray_1.default(styles, hash, stylixCtx),
            refs: 0,
        };
        applyRules_1.default(stylixCtx);
    }
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