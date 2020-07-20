import { useLayoutEffect, useRef } from 'react';
import applyRules from './applyRules';
import { useCss } from './cssTemplateLiteral';
import postcssToRuleArray from './postcssToRuleArray';
import { useStylixContext } from './StylixProvider';
import { useStyles } from './useStyles';
export function useGlobalStyles(str, ...args) {
    const css = useCss();
    useStyles(css(str, ...args), true, true);
}
export function useStyleDefinitions(str, ...args) {
    const css = useCss();
    const stylixCtx = useStylixContext();
    const ref = useRef({});
    const cssResult = css(str, ...args)['$css'];
    stylixCtx.defs.set(ref.current, cssResult);
    useLayoutEffect(() => {
        stylixCtx.defs.set(ref.current, cssResult);
        Object.keys(stylixCtx.rules).forEach((hash) => {
            stylixCtx.rules[hash].rules = postcssToRuleArray(stylixCtx.rules[hash].postcss, stylixCtx);
        });
        applyRules(stylixCtx);
        return () => {
            stylixCtx.defs.delete(ref.current);
        };
    }, [cssResult]);
}
//# sourceMappingURL=useGlobalStyles.js.map