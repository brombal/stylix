import React from 'react';
import { useStylixContext } from './StylixProvider';
import type { StylixProps } from './types';
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
  [key in keyof React.JSX.IntrinsicElements]: React.FC<
    StylixProps<Omit<React.JSX.IntrinsicElements[key], 'color' | 'content' | 'translate'>> & {
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
    $component?: never;
    $el?: never;
    $render: StylixRenderFn;
    children?: React.ReactNode | React.ReactNode[];
  };

/**
 * The props for the Stylix ($) component when using the children render function.
 */
type Stylix$childrenProp = StylixProps &
  Record<string, unknown> & {
    $component?: never;
    $el?: never;
    $render?: never;
    children: StylixRenderFn;
  };

/**
 * The props for the Stylix ($) component when using the $component prop.
 */
type Stylix$componentProp<TComponent extends React.ElementType> =
  (TComponent extends React.ElementType<infer P> ? StylixProps<P> : never) & {
    $component: TComponent;
    $el?: never;
    $render?: never;
    children?: React.ReactNode | React.ReactNode[];
  };

/**
 * The props for the Stylix ($) component when using the $el prop.
 */
type Stylix$elProp = StylixProps &
  Record<string, unknown> & {
    $render?: never;
    $component?: never;
    $el: React.ReactElement;
    children?: React.ReactNode | React.ReactNode[];
  };

/**
 * Props for the Stylix ($) component
 */
export type Stylix$Props<TComponent extends React.ElementType> =
  | Stylix$componentProp<TComponent>
  | Stylix$renderProp
  | Stylix$childrenProp
  | Stylix$elProp;

/**
 * Type of main Stylix component ($).
 */
export interface Stylix$Component extends Stylix$ComponentExtras {
  <TComponent extends React.ElementType>(props: Stylix$Props<TComponent>): React.ReactNode;
}

export function _Stylix<TElement extends React.ElementType>(
  props: Stylix$Props<TElement>,
  ref: React.Ref<TElement>,
) {
  const { $el, $render, $component, $css, className: outerClassName, children, ...rest } = props;

  const ctx = useStylixContext();
  const [styleProps, otherProps] = ctx.classifyProps(rest);

  let styles = [];
  if (!isEmpty(styleProps)) styles.push(styleProps);
  if (!isEmpty($css)) styles.push($css);
  if (styles.length === 1) styles = styles[0];
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

  if ($component) {
    const Component = $component as React.FC<any>;
    return (
      <Component className={className} ref={ref} {...otherProps}>
        {children}
      </Component>
    );
  }

  if ($render) {
    return $render(className || undefined, { children, ...otherProps, ...(ref ? { ref } : null) });
  }

  if (children) {
    if (typeof children !== 'function') {
      throw new Error('Stylix: invalid component usage: children must be a function');
    }
    return (children as StylixRenderFn)(className || undefined, {
      ...otherProps,
      ...(ref ? { ref } : null),
    });
  }

  throw new Error(
    'Stylix: invalid stylix component usage: must provide $el, $component, $render, or children',
  );
}

export const Stylix: Stylix$Component = React.forwardRef(
  _Stylix as any,
) as unknown as Stylix$Component;
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;
