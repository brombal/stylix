"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const context_1 = require("./context");
const hooks_1 = require("./hooks");
const html_tags_json_1 = __importDefault(require("./html-tags.json"));
const utils_1 = require("./utils");
var utils_2 = require("./utils");
exports.css = utils_2.css;
var context_2 = require("./context");
exports.useStylixSheetContext = context_2.useStylixSheetContext;
exports.StylixProvider = context_2.StylixProvider;
exports.StylixTheme = context_2.StylixTheme;
exports.useStylixThemeContext = context_2.useStylixThemeContext;
const Stylix = react_1.default.forwardRef(function Stylix(props, ref) {
    const _a = props, { $el, $elProps, $global, $media, $selector, $css, $injected, $disabled, className, children } = _a, rest = __rest(_a, ["$el", "$elProps", "$global", "$media", "$selector", "$css", "$injected", "$disabled", "className", "children"]);
    let enabled = true;
    if ('$disabled' in props && $disabled)
        enabled = false;
    const ctx = context_1.useStylixThemeContext();
    const [styleProps, otherProps] = utils_1.classifyProps(rest);
    if ($global) {
        if (enabled)
            hooks_1.useStyles(utils_1.postcssSerialize($global, ctx) + utils_1.postcssSerialize(styleProps, ctx), '@global');
        return null;
    }
    // If injecting, iterate over children
    if (!$el || $selector || $media) {
        const styles = {};
        const innerStyles = Object.assign(Object.assign({}, $css), styleProps);
        // If $media and/or $selector props were given, nest the styles into the correct structure
        if ($media && $selector) {
            styles[`@media ${$media}`] = { [$selector]: innerStyles };
        }
        else if ($media) {
            styles[`@media ${$media}`] = innerStyles;
        }
        else if ($selector) {
            styles[$selector] = innerStyles;
        }
        return (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.Children.map(children, (child) => {
            if (!child.type)
                throw new Error("Sorry, you can't $inject styles to a child text node.");
            if (child.type.__isStylix) {
                // If it's another Stylix component, just inject the style props.
                // If this element isn't enabled, just pass the inherited style props.
                return react_1.default.cloneElement(child, {
                    $injected: enabled ? Object.assign(Object.assign({}, styles), $injected) : $injected,
                    ref,
                });
            }
            else {
                // If it's a regular html element or other component, just generate a className.
                // console.log('stylix: generate class for regular el');
                const generatedClass = utils_1.hashString(JSON.stringify(Object.assign(Object.assign({}, (enabled ? styles : {})), $injected)));
                return react_1.default.cloneElement(child, {
                    className: [generatedClass || '', child.props.className || ''].join(' '),
                    ref,
                });
            }
        })));
    }
    // If not injecting, create an element and pass the merged class names
    const styles = [styleProps, $css, $injected];
    const css = styles
        .map((s) => utils_1.postcssSerialize(s, ctx))
        .join('')
        .trim();
    let hash = '';
    if (css && enabled) {
        hash = utils_1.hashString(css);
        const classCss = { [`.${hash}`]: { $css: css } };
        hooks_1.useStyles(utils_1.postcssSerialize(classCss, ctx), hash);
    }
    return (react_1.default.createElement($el, Object.assign({ className: [hash || '', className || ''].join(' ').trim(), ref: ref }, otherProps, $elProps), children));
});
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;
for (const i in html_tags_json_1.default) {
    const tag = html_tags_json_1.default[i];
    // eslint-disable-next-line react/display-name
    const htmlComponent = react_1.default.forwardRef((props, ref) => (react_1.default.createElement(Stylix, Object.assign({ "$el": tag, ref: ref }, props))));
    htmlComponent.displayName = 'Stylix.' + html_tags_json_1.default[i];
    htmlComponent.__isStylix = true;
    Stylix[tag] = htmlComponent;
}
exports.default = Stylix;
//# sourceMappingURL=index.js.map