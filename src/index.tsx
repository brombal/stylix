import React from 'react';

import { useStylixThemeContext } from './context';
import { useStyles } from './hooks';
import htmlTags from './html-tags.json';
import { Stylix$Component, Stylix$Props, StylixHtmlComponent, StylixHtmlTags } from './types';
import { classifyProps, hashString, postcssSerialize } from './utils';

export { css } from './utils';
export { StylixPropsExtensions, StylixProps } from './types';
export {
  useStylixSheetContext,
  StylixProvider,
  StylixTheme,
  useStylixThemeContext,
} from './context';

const Stylix: Stylix$Component = React.forwardRef(function Stylix<ElType>(
  props: Stylix$Props<ElType>,
  ref: any,
) {
  const {
    $el,
    $elProps,
    $global,
    $media,
    $selector,
    $css,
    $injected,
    $disabled,
    className,
    children,
    ...rest
  } = props as any;

  let enabled = true;
  if ('$disabled' in props && $disabled) enabled = false;

  const ctx = useStylixThemeContext();
  const [styleProps, otherProps] = classifyProps(rest);

  if ($global) {
    if (enabled)
      useStyles(postcssSerialize($global, ctx) + postcssSerialize(styleProps, ctx), '@global');
    return null;
  }

  // If injecting, iterate over children
  if (!$el || $selector || $media) {
    const styles: any = {};
    const innerStyles = { ...$css, ...styleProps };

    // If $media and/or $selector props were given, nest the styles into the correct structure
    if ($media && $selector) {
      styles[`@media ${$media}`] = { [$selector]: innerStyles };
    } else if ($media) {
      styles[`@media ${$media}`] = innerStyles;
    } else if ($selector) {
      styles[$selector] = innerStyles;
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
            // console.log('stylix: generate class for regular el');
            const generatedClass = hashString(
              JSON.stringify({
                ...(enabled ? styles : {}),
                ...$injected,
              }),
            );
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

  const styles = [styleProps, $css, $injected];
  const css = styles
    .map((s) => postcssSerialize(s, ctx))
    .join('')
    .trim();
  let hash = '';
  if (css && enabled) {
    hash = hashString(css);
    const classCss = { [`.${hash}`]: { $css: css } };
    useStyles(postcssSerialize(classCss, ctx), hash);
  }

  return (
    <$el
      className={[hash || '', className || ''].join(' ').trim()}
      ref={ref}
      {...otherProps}
      {...$elProps}
    >
      {children}
    </$el>
  );
}) as any;

Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;

for (const i in htmlTags) {
  const tag = htmlTags[i] as keyof StylixHtmlTags;
  // eslint-disable-next-line react/display-name
  const htmlComponent: StylixHtmlComponent<any> = React.forwardRef((props, ref: any) => (
    <Stylix $el={tag} ref={ref} {...(props as any)} />
  )) as any;
  htmlComponent.displayName = 'Stylix.' + htmlTags[i];
  htmlComponent.__isStylix = true;
  Stylix[tag] = htmlComponent;
}

export default Stylix;
