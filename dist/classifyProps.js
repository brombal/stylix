"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStyleValue = exports.simplifyStylePropName = exports.isValidJSXProp = exports.isStyleProp = exports.useClassifyProps = exports.classifyProps = void 0;
const StylixProvider_1 = require("./StylixProvider");
function classifyProps(props, knownProps) {
    const styles = {};
    const other = {};
    for (const prop in props) {
        // If prop is not a valid JSX prop, it must be a CSS selector
        if (!isValidJSXProp(prop) || (isStyleProp(prop, knownProps) && isStyleValue(props[prop]))) {
            styles[prop] = props[prop];
        }
        else {
            other[prop] = props[prop];
        }
    }
    return [styles, other];
}
exports.classifyProps = classifyProps;
function useClassifyProps(props) {
    const ctx = (0, StylixProvider_1.useStylixContext)();
    const [styles, other] = classifyProps(props, ctx.styleProps);
    return [styles, other];
}
exports.useClassifyProps = useClassifyProps;
/**
 * Determines if `value` is a recognized CSS property (can be standard CSS or custom Stylix prop).
 */
function isStyleProp(prop, knownProps) {
    return isValidJSXProp(prop) && simplifyStylePropName(prop) in knownProps;
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
/**
 * Tries to determine if `value` is likely to be a valid CSS property value.
 * We can't be 100% sure, but this should catch most cases.
 * There is a check here to make sure React elements do not pass the test, as this
 * has turned out to be a common case where a property like 'content' means something
 * to a component, but is also a valid CSS property.
 */
function isStyleValue(value) {
    return (typeof value === 'function' ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        Array.isArray(value) ||
        // Check for plain objects, and make sure it doesn't have the $$typeof property (react elements are never valid as style values)
        (typeof value === 'object' && value.constructor === Object && !('$$typeof' in value)));
}
exports.isStyleValue = isStyleValue;
//# sourceMappingURL=classifyProps.js.map