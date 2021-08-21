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
import React from 'react';
import { classifyProps } from './classifyProps';
import htmlTags from './html-tags.json';
import { useStylixContext } from './StylixProvider';
import { useStyles } from './useStyles';
function _Stylix(props, ref) {
    const _a = props, { $el, $css, $disabled, className, children } = _a, rest = __rest(_a, ["$el", "$css", "$disabled", "className", "children"]);
    const ctx = useStylixContext();
    const [styleProps, otherProps] = classifyProps(rest, ctx.styleProps);
    if ($css)
        styleProps.$css = $css;
    const hash = useStyles(styleProps, { disabled: $disabled });
    const allProps = Object.assign({ className: `${hash} ${className || ''}`.trim(), ref: ref }, otherProps);
    if (React.isValidElement($el)) {
        const $elProps = Object.assign({}, $el.props);
        allProps.className += ' ' + ($elProps.className || '');
        delete $elProps.className;
        return React.cloneElement($el, Object.assign(Object.assign({}, allProps), $elProps), ...(children || []));
    }
    return React.createElement($el, Object.assign({}, allProps), children);
}
const Stylix = React.forwardRef(_Stylix);
Stylix.styled = ($el, conflictingPropMapping) => {
    var _a;
    // We could go through the mental gymnastics to figure out the correct type here, but it really doesn't matter,
    // as the return type specified in types.ts is correct.
    const r = React.forwardRef((props, ref) => {
        let el = $el;
        if (conflictingPropMapping) {
            const newProps = {};
            for (const k in conflictingPropMapping) {
                newProps[conflictingPropMapping[k]] = props[k];
            }
            el = React.createElement($el, Object.assign({}, newProps));
        }
        return _Stylix(Object.assign({ $el: el }, props), ref);
    });
    r.displayName = `$.${$el.displayName || $el.name || ((_a = $el.toString) === null || _a === void 0 ? void 0 : _a.call($el)) || 'Unnamed'}`;
    r.__isStylix = true;
    return r;
};
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;
for (const i in htmlTags) {
    const tag = htmlTags[i];
    const htmlComponent = Stylix.styled(tag);
    Stylix[tag] = htmlComponent;
}
export default Stylix;
//# sourceMappingURL=Stylix.js.map