import React from 'react';

import { classifyProps } from './classifyProps';
import { useStylixContext } from './StylixProvider';
import { ComponentOrElement, Stylix$Component, Stylix$Props } from './types';
import { useStyles } from './useStyles';

export function _Stylix<ElType extends ComponentOrElement>(
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
    ...otherProps, // All other non-style props passed to <$> element
  };

  if (React.isValidElement($el)) {
    const $elProps = {
      ...($el.props as any),
      /**
       * `allProps` must override `$el.props` because the latter may contain default prop values provided by defaultProps.
       * The expectation is that for <$ $el={<SomeComponent />} someComponentProp="my value" />,
       * the `someComponentProp` prop would override any default value specified by SomeComponent.defaultProps.
       */
      ...allProps,
      className: ((($el.props as any).className || '') + ' ' + allProps.className).trim(),
    };
    return React.cloneElement($el, $elProps, ...(React.Children.toArray(children) || []));
  }

  return <$el {...allProps}>{children}</$el>;
}

const Stylix: Stylix$Component = React.forwardRef(_Stylix) as unknown as Stylix$Component;
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;

export default Stylix;
