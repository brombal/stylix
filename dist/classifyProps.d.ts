import { StylixContext } from './StylixProvider';
/**
 * Determines which props are styles to be converted to css, or regular props to be passed down to the
 * underlying element.
 */
export declare function classifyProps(ctx: StylixContext, props: any): [any, any];
/**
 * Determines if `value` is a recognized (standard or custom Stylix) CSS property.
 */
export declare function isCSSProperty(value: string, ctx: StylixContext): boolean;
