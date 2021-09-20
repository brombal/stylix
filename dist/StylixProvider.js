"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylixTheme = exports.StylixProvider = exports.useStylixTheme = exports.useStylixContext = void 0;
const react_1 = __importStar(require("react"));
const classifyProps_1 = require("./classifyProps");
const css_props_json_1 = __importDefault(require("./css-props.json"));
const plugins_1 = require("./plugins");
const styleCollector_1 = require("./styleCollector");
const flatten_1 = require("./util/flatten");
const merge_1 = require("./util/merge");
const useIsoLayoutEffect_1 = __importDefault(require("./util/useIsoLayoutEffect"));
const IS_DEV_ENV = process.env.NODE_ENV !== 'production';
const defaultStyleProps = {};
for (const value of css_props_json_1.default) {
    defaultStyleProps[classifyProps_1.simplifyStylePropName(value)] = value;
}
function createStylixContext(userValues = {}) {
    var _a, _b;
    const ctx = {
        id: userValues.id || Math.round(Math.random() * 10000).toString(10),
        devMode: (_a = userValues.devMode) !== null && _a !== void 0 ? _a : IS_DEV_ENV,
        styleProps: defaultStyleProps,
        theme: userValues.theme || null,
        media: userValues.media || null,
        styleElement: userValues.styleElement,
        plugins: flatten_1.flatten(Object.values(plugins_1.defaultPlugins)),
        rules: {},
        cleanupRequest: undefined,
    };
    if (!ctx.styleElement && typeof document !== 'undefined') {
        ctx.styleElement = document.createElement('style');
        if (ctx.id)
            ctx.styleElement.id = 'stylix-' + ctx.id;
        ctx.styleElement.className = 'stylix';
        document.head.appendChild(ctx.styleElement);
    }
    if (ctx.styleElement)
        ctx.stylesheet = ctx.styleElement.sheet;
    if ((_b = userValues.plugins) === null || _b === void 0 ? void 0 : _b.length) {
        const flatPlugins = flatten_1.flatten(userValues.plugins);
        for (const i in flatPlugins) {
            const plugin = flatPlugins[i];
            let pluginIndex = -1;
            if (plugin.before && ctx.plugins.includes(plugin.before))
                pluginIndex = ctx.plugins.indexOf(plugin.before);
            if (plugin.after && ctx.plugins.includes(plugin.after))
                pluginIndex = ctx.plugins.indexOf(plugin.after) + 1;
            if ('atIndex' in plugin)
                pluginIndex = plugin.atIndex;
            if (pluginIndex === -1)
                ctx.plugins.push(plugin);
            else
                ctx.plugins.splice(pluginIndex, 0, plugin);
        }
    }
    plugins_1.applyPlugins('initialize', null, null, ctx);
    return ctx;
}
// The React context object
const stylixContext = react_1.default.createContext(createStylixContext());
// Convenience wrapper hook that returns the current Stylix context
function useStylixContext() {
    return react_1.useContext(stylixContext);
}
exports.useStylixContext = useStylixContext;
// Convenience wrapper hook that returns just the current Stylix theme
function useStylixTheme() {
    return react_1.useContext(stylixContext).theme;
}
exports.useStylixTheme = useStylixTheme;
function StylixProvider(_a) {
    var { id, devMode, plugins, styleElement, children } = _a, themeProps = __rest(_a, ["id", "devMode", "plugins", "styleElement", "children"]);
    const ctx = react_1.useRef();
    if (!ctx.current)
        ctx.current = createStylixContext({ id, devMode, plugins, styleElement });
    ctx.current.styleCollector = react_1.useContext(styleCollector_1.styleCollectorContext);
    return (react_1.default.createElement(stylixContext.Provider, { value: ctx.current },
        react_1.default.createElement(StylixTheme, Object.assign({}, themeProps), children)));
}
exports.StylixProvider = StylixProvider;
function mergeContexts(contextA, contextB) {
    const obj = Object.assign({}, contextA);
    const themeB = contextB.theme;
    if (contextB) {
        for (const key in contextB) {
            const value = contextB[key];
            if (typeof value !== 'undefined')
                obj[key] = value;
        }
    }
    obj.theme = merge_1.merge(contextA.theme || {}, themeB);
    return obj;
}
function StylixTheme({ children, media, theme }) {
    const parentCtx = react_1.useContext(stylixContext);
    const [contextValue, setContextValue] = react_1.useState(() => mergeContexts(parentCtx, { media, theme }));
    // contextValue should only update (and cause re-renders) when relevant properties change.
    // `media` is treated as special because providing an array of strings is easier to do inline,
    // but we don't want to cause descendent re-renders if the values don't change.
    useIsoLayoutEffect_1.default(() => {
        setContextValue(mergeContexts(parentCtx, { media, theme }));
    }, [parentCtx, (media === null || media === void 0 ? void 0 : media.join('|')) || '', theme], false);
    return react_1.default.createElement(stylixContext.Provider, { value: contextValue }, children);
}
exports.StylixTheme = StylixTheme;
//# sourceMappingURL=StylixProvider.js.map