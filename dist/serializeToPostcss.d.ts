import { StylixContext } from './StylixProvider';
import { StylixThemeContext } from './StylixTheme';
/**
 * Converts a value to a postcss-compatible string.
 * - Strings are returned as-is
 * - Arrays of plain strings/numbers are treated as inline media queries (for postcss-inline-media)
 * - Arrays of any other value are treated as media query blocks
 * - Returns non-plain objects using .toString()
 * - Returns plain objects by recursively converting to postcss
 *
 * ctx is only required if using array or function interpolation (which need access to the theme object or media array
 * in the context).
 */
export default function serializeToPostcss(obj: any, stylixCtx: StylixContext, themeCtx: StylixThemeContext): string;
