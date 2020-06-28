import { AcceptedPlugin } from 'postcss';
import { StylixSheetContext, StylixThemeContext } from './context';
import { StylixElProps } from './types';
/**
 * Cheap string hashing, suitable for generating css class names
 */
export declare function hashString(str: any): string;
export declare function camelToHyphen(str: string): string;
/**
 * Converts a value to a postcss-compatible string.
 * - Strings are returned as-is
 * - Arrays of plain strings/numbers are treated as inline media queries (for postcss-inline-media)
 * - Arrays of any other value are treated as media query blocks
 * - Returns non-plain objects using .toString()
 * - Returns plain objects by recursively converting to postcss
 *
 * getStylixContext is only required if using array interpolation (which needs access to the media array in the
 * context). You can pass the context object directly, or you may pass a callback that returns the context object.
 * The callback will only be invoked if the context is needed, but be aware that it may be invoked multiple times.
 */
export declare function postcssSerialize(obj: any, getStylixContext: StylixThemeContext | (() => StylixThemeContext)): string;
/**
 * Converts a postcss-compatible string to an array of rules (suitable for passing to StyleSheet#insertRule()
 */
export declare function postcssToRuleArray(css: string, plugins?: AcceptedPlugin[]): Promise<string[]>;
/**
 * A tagged template literal that has several helpers for media queries and stringifying various types.
 * If your string contains an array (for media queries), or function (for theme access), you must treat this like a
 * React hook because it needs access to the current Stylix context.
 */
export declare function css(str: TemplateStringsArray, ...args: any[]): any;
/**
 * Applies all the rules from the current Stylix context (only updates if they have changed)
 */
export declare function applyContextRules(ctx: StylixSheetContext): Promise<void>;
export declare function classifyProps(props: StylixElProps<any>): [any, any];
