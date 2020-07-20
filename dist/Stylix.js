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
const Stylix = React.forwardRef(function Stylix(props, ref) {
    const _a = props, { $el, $elProps, $css, $injected, $disabled, className, children } = _a, rest = __rest(_a, ["$el", "$elProps", "$css", "$injected", "$disabled", "className", "children"]);
    let enabled = true;
    if ('$disabled' in props && $disabled)
        enabled = false;
    const sheetCtx = useStylixContext();
    const [styleProps, otherProps] = classifyProps(sheetCtx, rest);
    // TODO move this out to new $inject component
    // If injecting, iterate over children
    // if (!$el || $selector || $media) {
    //   const styles: any = {};
    //   const innerStyles = { ...$css, ...styleProps };
    //
    //   // If $media and/or $selector props were given, nest the styles into the correct structure
    //   if ($media && $selector) {
    //     styles[`@media ${$media}`] = { [$selector]: innerStyles };
    //   } else if ($media) {
    //     styles[`@media ${$media}`] = innerStyles;
    //   } else if ($selector) {
    //     styles[$selector] = innerStyles;
    //   }
    //
    //   return (
    //     <>
    //       {React.Children.map(children, (child) => {
    //         if (!child.type) throw new Error("Sorry, you can't $inject styles to a child text node.");
    //         if (child.type.__isStylix) {
    //           // If it's another Stylix component, just inject the style props.
    //           // If this element isn't enabled, just pass the inherited style props.
    //           return React.cloneElement(child, {
    //             $injected: enabled ? { ...styles, ...$injected } : $injected,
    //             ref,
    //           });
    //         } else {
    //           // If it's a regular html element or other component, just generate a className.
    //           const generatedClass = hashString(
    //             JSON.stringify({
    //               ...(enabled ? styles : {}),
    //               ...$injected,
    //             }),
    //           );
    //           return React.cloneElement(child, {
    //             className: [generatedClass || '', child.props.className || ''].join(' '),
    //             ref,
    //           });
    //         }
    //       })}
    //     </>
    //   );
    // }
    // Create an element and pass the merged class names
    const hash = useStyles(Object.assign(Object.assign(Object.assign({}, styleProps), $injected), { $css }), false, enabled);
    return (React.createElement($el, Object.assign({ className: [hash || '', className || ''].join(' ').trim(), ref: ref }, otherProps, $elProps), children));
});
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;
for (const i in htmlTags) {
    const tag = htmlTags[i];
    // eslint-disable-next-line react/display-name
    const htmlComponent = React.forwardRef((props, ref) => (React.createElement(Stylix, Object.assign({ "$el": tag, ref: ref }, props))));
    htmlComponent.displayName = 'Stylix.' + htmlTags[i];
    htmlComponent.__isStylix = true;
    Stylix[tag] = htmlComponent;
}
export default Stylix;
//# sourceMappingURL=Stylix.js.map