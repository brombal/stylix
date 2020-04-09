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
import { create } from 'nano-css';
import { addon as addonCache } from 'nano-css/addon/cache';
import { addon as addonDrule } from 'nano-css/addon/drule';
import { addon as addonGlobal } from 'nano-css/addon/global';
import { addon as addonNesting } from 'nano-css/addon/nesting';
import { addon as addonPrefixer } from 'nano-css/addon/prefixer';
import { addon as addonRule } from 'nano-css/addon/rule';
import { addon as addonStable } from 'nano-css/addon/stable';
import { addon as addonUnitless } from 'nano-css/addon/unitless';
import React from 'react';
import cssPropertyNames from './css-props.json';
import htmlTags from './html-tags.json';
const nano = create({
    pfx: 'stylix',
});
function myplugin(renderer) {
    const origPut = renderer.put;
    const cache = {};
    renderer.put = (selector, decls, atrule) => {
        const cacheKey = atrule ? `${atrule}{${selector}}` : selector;
        if (cache[cacheKey]) {
            return;
        }
        cache[cacheKey] = true;
        origPut(selector, decls, atrule);
    };
}
addonCache(nano);
addonRule(nano);
addonDrule(nano);
addonUnitless(nano);
addonPrefixer(nano);
addonStable(nano);
addonNesting(nano);
addonGlobal(nano);
myplugin(nano);
function classifyProps(props) {
    const values = {
        styles: {},
        advanced: {},
        other: {},
    };
    Object.keys(props).forEach((key) => {
        if (cssPropertyNames.includes(key)) {
            values.styles[key] = props[key];
        }
        else if (key[0] === '@' || key.includes('&')) {
            // TODO i don't think this is necessary
            // values.advanced[key] = props[key];
        }
        else {
            values.other[key] = props[key];
        }
    });
    return values;
}
function createRule(ref, styles) {
    if (!ref.current) {
        ref.current = nano.drule(styles);
        return ref.current();
    }
    else {
        return ref.current(styles);
    }
}
const Stylix = React.forwardRef(function Stylix(props, ref) {
    const { $el: El = 'div', $global, $media, $selector, $selectors, $inject, $injected, $disable, $enable, className, children } = props, rest = __rest(props, ["$el", "$global", "$media", "$selector", "$selectors", "$inject", "$injected", "$disable", "$enable", "className", "children"]);
    const styleProps = classifyProps(rest);
    let enabled = true;
    if ('$enable' in props && !props.$enable)
        enabled = false;
    if ('$disable' in props && props.$disable)
        enabled = false;
    const druleRef = React.useRef();
    // If injecting, iterate over children
    if ($inject || $media) {
        const styles = Object.assign({}, styleProps.advanced);
        const innerStyles = Object.assign(Object.assign({}, $selectors), styleProps.styles);
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
        return (React.createElement(React.Fragment, null, React.Children.map(children, (child) => {
            if (!child.type)
                throw new Error("Sorry, you can't $inject styles to a child text node.");
            if (child.type.__isStylix) {
                // If it's another Stylix component, just inject the style props.
                // If this element isn't enabled, just pass the inherited style props.
                return React.cloneElement(child, {
                    $injected: enabled ? Object.assign(Object.assign({}, styles), $injected) : $injected,
                    ref,
                });
            }
            else {
                // If it's a regular html element or other component, just generate a className.
                const generatedClass = createRule(druleRef, Object.assign(Object.assign({}, (enabled ? styles : {})), $injected));
                return React.cloneElement(child, {
                    className: [generatedClass || '', child.props.className || ''].join(' '),
                    ref,
                });
            }
        })));
    }
    // If not injecting, create an element and pass the merged class names
    if ($selector) {
        Object.assign(styleProps.advanced, { [$selector]: styleProps.styles });
        styleProps.styles = {};
    }
    let generatedClass = '';
    if (enabled) {
        const styles = Object.assign(Object.assign(Object.assign(Object.assign({}, styleProps.styles), styleProps.advanced), $selectors), $injected);
        if ($global) {
            nano.put('.' + nano.hash(styles), { ':global': { [$global]: styles } });
            return null;
        }
        else {
            generatedClass = createRule(druleRef, styles);
        }
    }
    return (React.createElement(El, Object.assign({ className: [generatedClass || '', className || ''].join(' ').trim(), ref: ref }, styleProps.other), children));
});
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;
for (const i in htmlTags) {
    const tag = htmlTags[i];
    const htmlComponent = ((props) => React.createElement(Stylix, Object.assign({ "$el": tag }, props)));
    htmlComponent.displayName = 'Stylix.' + htmlTags[i];
    htmlComponent.__isStylix = true;
    Stylix[tag] = htmlComponent;
}
// function Foo(props: { a: number }) {
//   return <div>{props.a}</div>;
// }
// const foo1 = <Stylix $el={Foo} a={12} foo={3} />;
// const foo2 = <Stylix $el={Foo} a="asdf" />;
// const def1 = <Stylix onClick={() => null} />;
// const def2 = <Stylix onClick="asdf" />;
// const a1 = <Stylix.a href="asdf" />;
// const a2 = <Stylix.a href={123} />;
export default Stylix;
//# sourceMappingURL=index.js.map