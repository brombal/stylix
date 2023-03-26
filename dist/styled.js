"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styled = void 0;
const React = require("react");
const Stylix_1 = require("./Stylix");
function styled($el, addProps, conflictingPropMapping) {
    var _a;
    const Element = typeof $el === 'string' ? $el : React.forwardRef($el);
    const r = React.forwardRef((props, ref) => {
        if (conflictingPropMapping) {
            for (const k in conflictingPropMapping) {
                props[conflictingPropMapping[k]] = props[k];
                delete props[k];
            }
        }
        return (0, Stylix_1._Stylix)(Object.assign(Object.assign(Object.assign({ $el: Element }, addProps), props), { $css: [addProps === null || addProps === void 0 ? void 0 : addProps.$css, props === null || props === void 0 ? void 0 : props.$css] }), ref);
    });
    r.displayName = `$.${$el.displayName || $el.name || ((_a = $el.toString) === null || _a === void 0 ? void 0 : _a.call($el)) || 'Unnamed'}`;
    r.__isStylix = true;
    return r;
}
exports.styled = styled;
//# sourceMappingURL=styled.js.map