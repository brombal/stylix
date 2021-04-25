export function classifyProps(props, knownProps) {
    const styles = {};
    const other = {};
    Object.keys(props).forEach((key) => {
        // If prop is not a valid JSX prop, it must be a CSS selector
        if (!isValidJSXProp(key) || isStyleProp(key, knownProps)) {
            styles[key] = props[key];
        }
        else {
            other[key] = props[key];
        }
    });
    return [styles, other];
}
/**
 * Determines if `value` is a recognized CSS property (can be standard CSS or custom Stylix prop).
 */
export function isStyleProp(value, knownProps) {
    return isValidJSXProp(value) && simplifyStylePropName(value) in knownProps;
}
export function isValidJSXProp(value) {
    // Not an exact check, but mostly rules out complex css selectors
    return /^[a-z$][a-z0-9_-]*$/i.test(value);
}
export function simplifyStylePropName(value) {
    return value.toLowerCase().replace(/[^a-z]/gi, '');
}
//# sourceMappingURL=classifyProps.js.map