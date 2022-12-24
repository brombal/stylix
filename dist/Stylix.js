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
const classifyProps_1 = require("./classifyProps");
const html_tags_json_1 = __importDefault(require("./html-tags.json"));
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
    if (react_1.default.isValidElement($el)) {
        const $elProps = Object.assign({}, $el.props);
        allProps.className += ' ' + ($elProps.className || '');
        delete $elProps.className;
        return react_1.default.cloneElement($el, Object.assign(Object.assign({}, allProps), $elProps), ...(react_1.default.Children.toArray(children) || []));
    }
    return react_1.default.createElement($el, Object.assign({}, allProps), children);
}
const Stylix = react_1.default.forwardRef(_Stylix);
Stylix.styled = ($el, conflictingPropMapping) => {
    var _a;
    // We could go through the mental gymnastics to figure out the correct type here, but it really doesn't matter,
    // as the return type specified in types.ts is correct.
    const r = react_1.default.forwardRef((props, ref) => {
        let el = $el;
        if (conflictingPropMapping) {
            const newProps = {};
            for (const k in conflictingPropMapping) {
                newProps[conflictingPropMapping[k]] = props[k];
            }
            el = react_1.default.createElement($el, Object.assign({}, newProps));
        }
        return _Stylix(Object.assign({ $el: el }, props), ref);
    });
    r.displayName = `$.${$el.displayName || $el.name || ((_a = $el.toString) === null || _a === void 0 ? void 0 : _a.call($el)) || 'Unnamed'}`;
    r.__isStylix = true;
    return r;
};
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;
for (const i in html_tags_json_1.default) {
    const tag = html_tags_json_1.default[i];
    const htmlComponent = Stylix.styled(tag);
    Stylix[tag] = htmlComponent;
}
exports.default = Stylix;
//# sourceMappingURL=Stylix.js.map