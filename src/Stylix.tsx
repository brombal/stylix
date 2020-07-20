import React from 'react';

import { classifyProps } from './classifyProps';
import htmlTags from './html-tags.json';
import { useStylixContext } from './StylixProvider';
import {
  HasProps,
  Stylix$Component,
  Stylix$Props,
  StylixHtmlComponent,
  StylixHtmlTags,
} from './types';
import { useStyles } from './useStyles';

const Stylix: Stylix$Component = React.forwardRef(function Stylix<ElType extends HasProps>(
  props: Stylix$Props<ElType>,
  ref: any,
) {
  const { $el, $elProps, $css, $injected, $disabled, className, children, ...rest } = props as any;

  let enabled = true;
  if ('$disabled' in props && $disabled) enabled = false;

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
  const hash = useStyles({ ...styleProps, ...$injected, $css }, false, enabled);

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
