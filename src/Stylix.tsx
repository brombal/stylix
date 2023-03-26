import React from 'npm:react';

import { classifyProps } from './classifyProps.ts';
import { useStylixContext } from './StylixProvider.tsx';
import { Stylix$Component, Stylix$Props } from './types.ts';
import { useStyles } from './useStyles.ts';

export function _Stylix<ElType extends React.ElementType>(
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

const Stylix = React.forwardRef(_Stylix) as unknown as Stylix$Component;
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;

export default Stylix;
