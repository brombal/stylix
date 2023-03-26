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
Object.defineProperty(exports, "__esModule", { value: true });
exports._Stylix = void 0;
const React = require("react");
const classifyProps_1 = require("./classifyProps");
const StylixProvider_1 = require("./StylixProvider");
const useStyles_1 = require("./useStyles");
function _Stylix(props, ref) {
    const _a = props, { $el, $css, $disabled, className, children } = _a, rest = __rest(_a, ["$el", "$css", "$disabled", "className", "children"]);
    const ctx = (0, StylixProvider_1.useStylixContext)();
    const [styleProps, otherProps] = (0, classifyProps_1.classifyProps)(rest, ctx.styleProps);
    if ($css)
        styleProps.$css = $css;
    const hash = (0, useStyles_1.useStyles)(styleProps, { disabled: $disabled });
    const allProps = Object.assign({ className: `${hash} ${className || ''}`.trim(), ref: ref }, otherProps);
    if (React.isValidElement($el)) {
        const $elProps = Object.assign({}, $el.props);
        allProps.className += ' ' + ($elProps.className || '');
        delete $elProps.className;
        return React.cloneElement($el, Object.assign(Object.assign({}, allProps), $elProps), ...(React.Children.toArray(children) || []));
    }
    return React.createElement($el, Object.assign({}, allProps), children);
}
exports._Stylix = _Stylix;
const Stylix = React.forwardRef(_Stylix);
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;
exports.default = Stylix;
//# sourceMappingURL=Stylix.js.map