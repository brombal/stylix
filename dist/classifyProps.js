"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplifyStylePropName = exports.isValidJSXProp = exports.isStyleProp = exports.classifyProps = void 0;
function classifyProps(props, knownProps) {
    const styles = {};
    const other = {};
    for (const key in props) {
        // If prop is not a valid JSX prop, it must be a CSS selector
        if (!isValidJSXProp(key) || isStyleProp(key, knownProps)) {
            styles[key] = props[key];
        }
        else {
            other[key] = props[key];
        }
    }
    return [styles, other];
}
exports.classifyProps = classifyProps;
/**
 * Determines if `value` is a recognized CSS property (can be standard CSS or custom Stylix prop).
 */
function isStyleProp(value, knownProps) {
    return isValidJSXProp(value) && simplifyStylePropName(value) in knownProps;
}
exports.isStyleProp = isStyleProp;
function isValidJSXProp(value) {
    // Not an exact check, but mostly rules out complex css selectors
    return /^[a-z$][a-z0-9_-]*$/i.test(value);
}
exports.isValidJSXProp = isValidJSXProp;
function simplifyStylePropName(value) {
    return value.toLowerCase().replace(/[^a-z]/gi, '');
}
exports.simplifyStylePropName = simplifyStylePropName;
//# sourceMappingURL=classifyProps.js.map