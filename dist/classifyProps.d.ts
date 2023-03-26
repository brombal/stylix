export declare function classifyProps(props: any, knownProps: Record<string, string>): [any, any];
export declare function useClassifyProps(props: any): any[];
/**
 * Determines if `value` is a recognized CSS property (can be standard CSS or custom Stylix prop).
 */
export declare function isStyleProp(prop: string, knownProps: Record<string, string>): boolean;
export declare function isValidJSXProp(value: string): boolean;
export declare function simplifyStylePropName(value: string): string;
/**
 * Tries to determine if `value` is likely to be a valid CSS property value.
 * We can't be 100% sure, but this should catch most cases.
 * There is a check here to make sure React elements do not pass the test, as this
 * has turned out to be a common case where a property like 'content' means something
 * to a component, but is also a valid CSS property.
 */
export declare function isStyleValue(value: any): boolean;
