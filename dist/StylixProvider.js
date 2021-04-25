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
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { simplifyStylePropName } from './classifyProps';
import cssProps from './css-props.json';
import { applyPlugins, defaultPlugins } from './plugins';
import { flatten } from './util/flatten';
import { merge } from './util/merge';
const IS_DEV_ENV = process.env.NODE_ENV !== 'production';
const defaultStyleProps = cssProps.reduce((memo, value) => {
    memo[simplifyStylePropName(value)] = value;
    return memo;
}, {});
function createStylixContext(userValues = {}) {
    var _a, _b;
    const ctx = {
        id: userValues.id || Math.round(Math.random() * 10000).toString(10),
        devMode: (_a = userValues.devMode) !== null && _a !== void 0 ? _a : IS_DEV_ENV,
        styleProps: defaultStyleProps,
        theme: userValues.theme || null,
        media: userValues.media || null,
        styleElement: userValues.styleElement,
        plugins: flatten(Object.values(defaultPlugins)),
        rules: {},
        cleanupRequest: undefined,
    };
    if (!ctx.styleElement) {
        ctx.styleElement = document.createElement('style');
        if (ctx.id)
            ctx.styleElement.id = 'stylix-' + ctx.id;
        ctx.styleElement.className = 'stylix';
        document.head.appendChild(ctx.styleElement);
    }
    ctx.stylesheet = ctx.styleElement.sheet;
    if ((_b = userValues.plugins) === null || _b === void 0 ? void 0 : _b.length) {
        flatten(userValues.plugins).forEach((plugin) => {
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
        });
    }
    applyPlugins('initialize', null, null, ctx);
    return ctx;
}
// The React context object
const stylixContext = React.createContext(createStylixContext());
// Convenience wrapper hook that returns the current Stylix context
export function useStylixContext() {
    return useContext(stylixContext);
}
// Convenience wrapper hook that returns just the current Stylix theme
export function useStylixTheme() {
    return useContext(stylixContext).theme;
}
export function StylixProvider(_a) {
    var { id, devMode, plugins, styleElement, children } = _a, themeProps = __rest(_a, ["id", "devMode", "plugins", "styleElement", "children"]);
    const ctx = useRef();
    if (!ctx.current)
        ctx.current = createStylixContext({ id, devMode, plugins, styleElement });
    return (React.createElement(stylixContext.Provider, { value: ctx.current },
        React.createElement(StylixTheme, Object.assign({}, themeProps), children)));
}
function mergeContexts(contextA, contextB) {
    const obj = Object.assign({}, contextA);
    const themeB = contextB.theme;
    if (contextB)
        Object.entries(contextB).forEach(([key, value]) => {
            if (typeof value !== 'undefined')
                obj[key] = value;
        });
    obj.theme = merge(contextA.theme || {}, themeB);
    return obj;
}
export function StylixTheme({ children, media, theme }) {
    const parentCtx = useContext(stylixContext);
    const [contextValue, setContextValue] = useState(() => mergeContexts(parentCtx, { media, theme }));
    // contextValue should only update (and cause re-renders) when relevant properties change.
    // `media` is treated as special because providing an array of strings is easier to do inline,
    // but we don't want to cause descendent re-renders if the values don't change.
    useLayoutEffect(() => {
        setContextValue(mergeContexts(parentCtx, { media, theme }));
    }, [parentCtx, (media === null || media === void 0 ? void 0 : media.join('|')) || '', theme]);
    return React.createElement(stylixContext.Provider, { value: contextValue }, children);
}
//# sourceMappingURL=StylixProvider.js.map