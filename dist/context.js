"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const react_1 = __importStar(require("react"));
const utils_1 = require("./utils");
const IS_DEV_ENV = process.env.NODE_ENV !== 'production';
const defaultStylixThemeContext = () => ({
    media: [],
    theme: {},
});
const stylixThemeContext = react_1.default.createContext(defaultStylixThemeContext());
function StylixTheme({ theme, media, children }) {
    const parent = react_1.useContext(stylixThemeContext);
    function generateCtx(obj) {
        obj.theme = lodash_merge_1.default({}, parent.theme, theme);
        obj.media = media || parent.media;
        return obj;
    }
    const ctx = react_1.useRef(generateCtx(defaultStylixThemeContext()));
    react_1.useEffect(() => {
        generateCtx(ctx.current);
    }, [parent, theme, JSON.stringify(media)]);
    return react_1.default.createElement(stylixThemeContext.Provider, { value: ctx.current }, children);
}
exports.StylixTheme = StylixTheme;
function useStylixThemeContext() {
    return react_1.useContext(stylixThemeContext);
}
exports.useStylixThemeContext = useStylixThemeContext;
const defaultStylixSheetContext = () => ({
    id: '',
    devMode: undefined,
    styleElement: null,
    stylesheet: null,
    styles: {},
    currentRules: [],
});
const stylixSheetContext = react_1.default.createContext(defaultStylixSheetContext());
/**
 * Returns the current Stylix context value.
 */
function useStylixSheetContext() {
    var _a;
    const ctx = react_1.useContext(stylixSheetContext);
    ctx.devMode = (_a = ctx.devMode) !== null && _a !== void 0 ? _a : IS_DEV_ENV;
    ctx.id = ctx.id || utils_1.hashString(Math.random().toString());
    if (ctx.devMode) {
        window.stylixSheet = ctx.stylesheet;
        window.stylixStyleElement = ctx.styleElement;
    }
    return ctx;
}
exports.useStylixSheetContext = useStylixSheetContext;
function StylixProvider({ id, devMode = undefined, styleElement, stylesheet, children, }) {
    const ctx = react_1.useRef(Object.assign(Object.assign({}, defaultStylixSheetContext()), { id, devMode: devMode !== null && devMode !== void 0 ? devMode : IS_DEV_ENV, styleElement,
        stylesheet }));
    if (!ctx.current.styleElement) {
        ctx.current.styleElement = document.createElement('style');
        ctx.current.styleElement.id = 'stylix-style-' + ctx.current.id;
        document.head.appendChild(ctx.current.styleElement);
        if (!ctx.current.stylesheet)
            ctx.current.stylesheet = ctx.current.styleElement.sheet;
    }
    // Update mutable values
    react_1.useEffect(() => {
        ctx.current.devMode = devMode !== null && devMode !== void 0 ? devMode : IS_DEV_ENV;
    }, [devMode]);
    return react_1.default.createElement(stylixSheetContext.Provider, { value: ctx.current }, children);
}
exports.StylixProvider = StylixProvider;
//# sourceMappingURL=context.js.map