import React from 'react';
import type { IntrinsicElements } from './elements';
import { useStylixContext } from './StylixProvider';
import type { Extends, StylixProps, StylixStyles } from './types';
import { useStyles } from './useStyles';
import { isEmpty } from './util/isEmpty';

/**
 * Additional properties on the Stylix ($) component and its html component properties (`<$.div>`, etc).
 */
export type StylixComponentMeta = {
  displayName?: string;
  __isStylix: true;
};

/**
 * Defines the static meta properties and the HTML elements on the `$` object ($.div, $.span, etc).
 */
type Stylix$ComponentExtras = StylixComponentMeta & {
  [key in IntrinsicElements]: React.FC<
    Extends<React.JSX.IntrinsicElements[key], StylixProps> & {
      htmlContent?: string;
      htmlTranslate?: 'yes' | 'no';
    }
  >;
};

export type StylixRenderFn<TProps = any> = (
  className: string | undefined,
  props: TProps,
) => React.ReactNode;

/**
 * The props for the Stylix ($) component when using the $render prop.
 */
type Stylix$renderProp = StylixProps &
  Record<string, unknown> & {
    $el?: never;
    $render: StylixRenderFn;
    children?: never;
  };

/**
 * The props for the Stylix ($) component when using the $el prop as a component, intrinsic element tag, or rendered element.
 */
type Stylix$elAsComponentProp = StylixProps &
  Record<string, unknown> & {
    $el: React.ReactElement | React.ComponentType<any> | IntrinsicElements;
    $render?: never;
    children?: React.ReactNode | React.ReactNode[];
  };

/**
 * Internal props type for the Stylix ($) component where actual types are unknown.
 */
type InternalStylix$Props = {
  $el?: React.ReactElement | React.ComponentType<any> | IntrinsicElements;
  $render?: StylixRenderFn;
  children?: React.ReactNode | React.ReactNode[];
  $css?: StylixProps['$css'];
  className?: string;
};

type Stylix$props = Stylix$elAsComponentProp | Stylix$renderProp;

/**
 * Type of main Stylix component ($).
 */
export type Stylix$Component = Stylix$ComponentExtras & ((props: Stylix$props) => React.ReactNode);

export function _Stylix<TElement extends React.ElementType>(
  props: InternalStylix$Props,
  ref: React.Ref<TElement>,
) {
  const { $el, $render, $css, className: outerClassName, children, ...rest } = props;

  const ctx = useStylixContext();
  const [styleProps, otherProps] = ctx.classifyProps(rest);

  let styles: StylixStyles = [];
  if (!isEmpty(styleProps)) styles.push(styleProps);
  if (!isEmpty($css)) styles.push($css);
  if (styles.length === 1 && styles[0]) styles = styles[0];
  const stylixClassName = useStyles(styles);

  const className = `${stylixClassName} ${outerClassName || ''}`.trim() || undefined;

  if (React.isValidElement($el)) {
    const $elProps = {
      ...($el.props as any),
      ref,
      /**
       * `allProps` must override `$el.props` because the latter may contain default prop values provided by defaultProps.
       * The expectation is that for <$ $el={<SomeComponent />} someComponentProp="my value" />,
       * the `someComponentProp` prop would override any default value specified by SomeComponent.defaultProps.
       */
      ...otherProps,
      className: `${($el.props as any).className || ''} ${className || ''}`.trim() || undefined,
    };
    return React.cloneElement(
      $el,
      $elProps,
      ...(React.Children.toArray(children as React.ReactNode) || []),
    );
  }

  if ($el) {
    const Component = $el as React.FC<any>;
    return (
      <Component className={className} ref={ref} {...otherProps}>
        {children}
      </Component>
    );
  }

  if ($render) {
    return $render(className || undefined, { children, ...otherProps, ...(ref ? { ref } : null) });
  }

  throw new Error('Stylix: invalid stylix component usage: must provide $el or $render prop.');
}

export const Stylix: Stylix$Component = React.forwardRef(
  _Stylix as any,
) as unknown as Stylix$Component;
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;
