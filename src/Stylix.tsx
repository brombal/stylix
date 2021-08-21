import React from 'react';

import { classifyProps } from './classifyProps';
import htmlTags from './html-tags.json';
import { useStylixContext } from './StylixProvider';
import { Stylix$Component, Stylix$Props } from './types';
import { useStyles } from './useStyles';

function _Stylix<ElType extends React.ElementType>(
  props: Stylix$Props<ElType>,
  ref: React.Ref<ElType>,
) {
  const { $el, $css, $disabled, className, children, ...rest } = props as any;

  const ctx = useStylixContext();
  const [styleProps, otherProps] = classifyProps(rest, ctx.styleProps);
  if ($css) styleProps.$css = $css;
  const hash = useStyles(styleProps, { disabled: $disabled });

  const allProps = {
    className: `${hash} ${className || ''}`.trim(),
    ref: ref,
    ...otherProps,
  };

  if (React.isValidElement($el)) {
    const $elProps = { ...($el.props as any) };
    allProps.className += ' ' + ($elProps.className || '');
    delete $elProps.className;
    return React.cloneElement(
      $el,
      { ...allProps, ...$elProps },
      ...(React.Children.toArray(children) || []),
    );
  }

  return <$el {...allProps}>{children}</$el>;
}

const Stylix: Stylix$Component = React.forwardRef(_Stylix) as any;

Stylix.styled = ($el, conflictingPropMapping?) => {
  // We could go through the mental gymnastics to figure out the correct type here, but it really doesn't matter,
  // as the return type specified in types.ts is correct.
  const r: any = React.forwardRef((props, ref) => {
    let el = $el as React.ElementType | React.ReactElement;
    if (conflictingPropMapping) {
      const newProps = {} as any;
      for (const k in conflictingPropMapping) {
        newProps[conflictingPropMapping[k]] = (props as any)[k];
      }
      el = <$el {...newProps} />;
    }
    return _Stylix({ $el: el as any, ...props }, ref as any);
  });
  r.displayName = `$.${
    ($el as any).displayName || ($el as any).name || $el.toString?.() || 'Unnamed'
  }`;
  r.__isStylix = true;
  return r;
};

Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;

for (const i in htmlTags) {
  const tag = htmlTags[i] as keyof JSX.IntrinsicElements;
  const htmlComponent = Stylix.styled(tag);
  Stylix[tag] = htmlComponent as any;
}

export default Stylix;
