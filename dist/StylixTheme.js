import merge from 'merge';
import React, { useContext, useLayoutEffect, useState } from 'react';
function mergeThemeContexts(...contexts) {
    const obj = {};
    contexts.filter(Boolean).forEach((c) => (obj.theme = merge(obj.theme || {}, c.theme)));
    contexts.filter(Boolean).forEach((c) => (obj.media = c.media || obj.media));
    return obj;
}
function compareMediaArrays(a, b) {
    return ((a === null || a === void 0 ? void 0 : a.join('|')) || '') === ((b === null || b === void 0 ? void 0 : b.join('|')) || '');
}
const stylixThemeContext = React.createContext({});
export const StylixTheme = React.memo(function StylixTheme({ theme, media, children }) {
    const parent = useContext(stylixThemeContext);
    const [contextValue, setContextValue] = useState(() => mergeThemeContexts(parent, { theme, media }));
    useLayoutEffect(() => {
        setContextValue((contextValue) => {
            contextValue.theme = theme;
            contextValue.media = media;
            return mergeThemeContexts(parent, contextValue);
        });
    }, [parent, theme, (media === null || media === void 0 ? void 0 : media.join('|')) || '']);
    return (React.createElement(stylixThemeContext.Provider, { value: contextValue }, children));
}, (prevProps, nextProps) => {
    return (prevProps.children === nextProps.children &&
        prevProps.theme === nextProps.theme &&
        compareMediaArrays(prevProps.media, nextProps.media));
});
export function useStylixTheme() {
    return useContext(stylixThemeContext);
}
//# sourceMappingURL=StylixTheme.js.map