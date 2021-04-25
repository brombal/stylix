export declare function classifyProps(props: any, knownProps: Record<string, string>): [any, any];
/**
 * Determines if `value` is a recognized CSS property (can be standard CSS or custom Stylix prop).
 */
export declare function isStyleProp(value: string, knownProps: Record<string, string>): boolean;
export declare function isValidJSXProp(value: string): boolean;
export declare function simplifyStylePropName(value: string): string;
