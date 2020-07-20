import serializeToPostcss from './serializeToPostcss';
import { useStylixContext } from './StylixProvider';
import { useStylixTheme } from './StylixTheme';
/**
 * A tagged template literal that stringifies nested objects to css.
 */
export function css(str, ...args) {
    const strParts = [...str];
    for (let i = args.length - 1; i >= 0; i--) {
        const value = serializeToPostcss(args[i], null, null);
        strParts.splice(i + 1, 0, value);
    }
    return { $css: strParts.join('') };
}
/**
 * Hook used to create a template literal that can access the current Stylix context.
 * This is necessary when using arrays and function values which require access to the theme context.
 */
export function useCss() {
    const themeCtx = useStylixTheme();
    const stylixCtx = useStylixContext();
    return function css(str, ...args) {
        const strParts = [...str];
        for (let i = args.length - 1; i >= 0; i--) {
            const value = serializeToPostcss(args[i], stylixCtx, themeCtx);
            strParts.splice(i + 1, 0, value);
        }
        return { $css: strParts.join('') };
    };
}
//# sourceMappingURL=cssTemplateLiteral.js.map