import { create } from 'nano-css';
import { addon as addonCache } from 'nano-css/addon/cache';
import { addon as addonDrule } from 'nano-css/addon/drule';
import { addon as addonNesting } from 'nano-css/addon/nesting';
import { addon as addonPrefixer } from 'nano-css/addon/prefixer';
import { addon as addonRule } from 'nano-css/addon/rule';
import { addon as addonStable } from 'nano-css/addon/stable';
import { addon as addonUnitless } from 'nano-css/addon/unitless';
import React, { CSSProperties } from 'react';
import htmlTags from './html-tags.json';
import cssPropertyNames from './css-props.json';
import { StylixComponentType, StylixProps } from './types';

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
myplugin(nano);

type ClassifiedProps = {
  styles: CSSProperties;
  advanced: any;
  other: any;
};

function classifyProps(props: StylixProps<any>): ClassifiedProps {
  const values: ClassifiedProps = {
    styles: {},
    advanced: {},
    other: {},
  };

  Object.keys(props).forEach((key) => {
    if (cssPropertyNames.includes(key)) {
      values.styles[key] = props[key];
    } else if (key[0] === '@' || key.includes('&')) {
      values.advanced[key] = props[key];
    } else {
      values.other[key] = props[key];
    }
  });

  return values;
}

function createRule(ref, styles) {
  if (!ref.current) {
    ref.current = nano.drule(styles);
    return ref.current();
  } else {
    return ref.current(styles);
  }
}

const Stylix: (<ElType extends React.ElementType = 'div'>(props: StylixProps<ElType>) => any) & {
  displayName?: string;
  __isStylix?: true;
} = React.forwardRef(function Stylix<ElType extends React.ElementType = 'div'>(
  props: StylixProps<ElType>,
  ref,
) {
  const {
    $el: El = 'div',
    $disable,
    $enable,
    $media,
    $selector,
    $inject,
    $injected,
    className,
    children,
    ...rest
  } = props;

  const styleProps = classifyProps(rest);

  let enabled = true;
  if ('$enable' in props && !props.$enable) enabled = false;
  if ('$disable' in props && props.$disable) enabled = false;

  const druleRef = React.useRef<any>();

  // If injecting, iterate over children
  if ($inject || $media) {
    const styles: any = { ...styleProps.advanced };
    // If media or selector props were given, nest the styles into the correct structure
    if ($media && $selector) {
      styles[`@media ${$media}`] = { [$selector]: styleProps.styles };
    } else if ($media) {
      styles[`@media ${$media}`] = styleProps.styles;
    } else if ($selector) {
      styles[$selector] = styleProps.styles;
    }

    return (
      <>
        {React.Children.map(children, (child) => {
          if (!child.type) throw new Error("Sorry, you can't $inject styles to a child text node.");
          if (child.type.__isStylix) {
            // If it's another Stylix component, just inject the style props.
            // If this element isn't enabled, just pass the inherited style props.
            return React.cloneElement(child, {
              $injected: enabled ? { ...styles, ...$injected } : $injected,
              ref,
            });
          } else {
            // If it's a regular html element or other component, just generate a className.
            const generatedClass = createRule(druleRef, {
              ...(enabled ? styles : {}),
              ...$injected,
            });
            return React.cloneElement(child, {
              className: [generatedClass || '', child.props.className || ''].join(' '),
              ref,
            });
          }
        })}
      </>
    );
  }

  // If not injecting, create an element and pass the merged class names

  if ($selector) {
    Object.assign(styleProps.advanced, { [$selector]: styleProps.styles });
    styleProps.styles = {};
  }

  const generatedClass = enabled
    ? createRule(druleRef, { ...styleProps.styles, ...styleProps.advanced, ...$injected })
    : '';

  return (
    <El
      className={[generatedClass || '', className || ''].join(' ').trim()}
      ref={ref}
      {...styleProps.other}
    >
      {children}
    </El>
  );
});

Stylix.displayName = 'Stylix';

Stylix.__isStylix = true;

for (const i in htmlTags) {
  const tag = htmlTags[i];
  const htmlComponent: StylixComponentType<any> = (props) => <Stylix $el={tag} {...props} />;
  htmlComponent.displayName = 'Stylix.' + htmlTags[i];
  htmlComponent.__isStylix = true;
  Stylix[tag] = htmlComponent;
}

export default Stylix;
