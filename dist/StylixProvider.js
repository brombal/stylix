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
import postcssDefaultUnit from 'postcss-default-unit';
import postcssInlineMedia from 'postcss-inline-media';
import postcssNested from 'postcss-nested';
import React, { useContext, useRef } from 'react';
import { StylixTheme } from './StylixTheme';
const IS_DEV_ENV = process.env.NODE_ENV !== 'production';
// Creates a default empty StylixContext object
function defaultStylixSheetContext() {
    return {
        id: undefined,
        devMode: IS_DEV_ENV,
        plugins: [],
        styleElement: null,
        stylesheet: null,
        defs: new Map(),
        hashRefs: {},
        rules: {},
        postcssPlugins: [],
        customProps: new Set(),
        initialized: false,
    };
}
// The React context object
const stylixSheetContext = React.createContext(defaultStylixSheetContext());
// Convenience wrapper hook that returns the current Stylix context
export function useStylixContext() {
    return useContext(stylixSheetContext);
}
export function StylixProvider(_a) {
    var { id, devMode, plugins = [], stylixPluginSettings = {}, styleElement, children } = _a, other = __rest(_a, ["id", "devMode", "plugins", "stylixPluginSettings", "styleElement", "children"]) // `other` will be StylixTheme props
    ;
    const ctx = useRef();
    if (!ctx.current)
        ctx.current = defaultStylixSheetContext();
    if (id)
        ctx.current.id = id;
    if (devMode !== undefined)
        ctx.current.devMode = devMode;
    if (styleElement)
        ctx.current.styleElement = styleElement;
    if (stylixPluginSettings)
        ctx.current.stylixPluginSettings = stylixPluginSettings;
    if (!ctx.current.styleElement) {
        ctx.current.styleElement = document.createElement('style');
        ctx.current.styleElement.id = 'stylix-styles' + (ctx.current.id ? '-' + ctx.current.id : '');
        ctx.current.styleElement.className = 'stylix-styles';
        document.head.appendChild(ctx.current.styleElement);
    }
    ctx.current.stylesheet = ctx.current.styleElement.sheet;
    if (!ctx.current.initialized) {
        plugins.forEach((plugin) => {
            if (plugin.postcss) {
                ctx.current.postcssPlugins.push(plugin);
            }
            else {
                plugin(ctx.current);
            }
        });
        ctx.current.postcssPlugins.push(postcssNested(ctx.current.stylixPluginSettings.nested), postcssInlineMedia, postcssDefaultUnit(ctx.current.stylixPluginSettings.defaultUnit));
        ctx.current.initialized = true;
    }
    return (React.createElement(stylixSheetContext.Provider, { value: ctx.current },
        React.createElement(StylixTheme, Object.assign({}, other), children)));
}
//# sourceMappingURL=StylixProvider.js.map