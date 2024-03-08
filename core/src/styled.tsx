import React from 'react';

import { _Stylix } from './Stylix';
import {
  Extends,
  HtmlOrComponent,
  HtmlOrComponentProps,
  MappedProperties,
  StylixComponentMeta,
  StylixProps,
} from './types';

/**
 * A component that accepts Stylix props in addition to TProps (Stylix props override TProps).
 */
export type StylixStyledComponentWithProps<TProps> = React.FC<Extends<TProps, StylixProps>> &
  StylixComponentMeta;

/**
 * A component that accepts Stylix props in addition to the props of TComponent (Stylix props override TComponent props).
 */
export type StylixStyledComponent<TComponent extends HtmlOrComponent> =
  StylixStyledComponentWithProps<HtmlOrComponentProps<TComponent>>;

/**
 * Gets a union of all the props of TComponent that conflict with css style properties.
 */
export type ConflictingStyleProps<TComponent extends HtmlOrComponent> = keyof StylixProps &
  keyof HtmlOrComponentProps<TComponent>;

/**
 * A map of props of TComponent that conflict with css style properties to the name of the prop that should be passed to the original component.
 */
type PropMap<TComponent extends HtmlOrComponent> = {
  [key: string]: ConflictingStyleProps<TComponent>;
};

/**
 * A 'styled' component collects all style props and reduces them to a className which it passes as a prop to the
 * component. The new component accepts all styled props in addition to the original props of the component.
 * By default, all style props are consumed as styles, so if the original component accepts a prop that conflicts with a style prop, it will not be received by the component.
 * If you want a style prop to be passed directly to the original component (and maintain TS types from the original component), you
 * can specify it in the propMap.
 * must specify them in the config. You can also specify props to map from one name to another, so that the
 * resulting styled component can accept a non-style-prop name that is renamed and passed to the original component
 * as the prop that might otherwise conflict with a style prop.
 */
export function styled<
  TComponent extends HtmlOrComponent,
  TPropMap extends PropMap<TComponent> | undefined,
>(
  component: TComponent,
  /**
   * A style object to apply to the component.
   */
  styleProps?: StylixProps,
  /**
   * A map of new props to accept and the associated prop name to pass to the original component.
   */
  propMap?: TPropMap,
): React.FC<
  // Props include the props of TComponent, overridden by all style props, overridden by the values of propMap mapped to the types of their corresponding keys
  Extends<
    HtmlOrComponentProps<TComponent>,
    StylixProps,
    TPropMap extends PropMap<TComponent>
      ? MappedProperties<HtmlOrComponentProps<TComponent>, TPropMap>
      : object
  >
> &
  StylixComponentMeta {
  const Element: React.ElementType =
    typeof component === 'string' // HTML element
      ? (component as any)
      : typeof component === 'function' && !('$$typeof' in component) && component.length === 2 // React function component with ref parameter
        ? React.forwardRef(component)
        : component; // React function component
  const r: any = React.forwardRef((props: Record<string, any>, ref: React.Ref<unknown>) => {
    props = { ...props }; // copy props so we can delete props that are consumed by Stylix
    const $elProps: any = {};
    if (propMap) {
      for (const incomingProp in propMap) {
        const outgoingProp = propMap[incomingProp];
        $elProps[outgoingProp] = props[incomingProp];
        delete props[incomingProp];
      }
    }
    return _Stylix(
      {
        $el: <Element {...$elProps} />,
        ...props,
      },
      ref as any,
    );
  });
  r.displayName = `$.${
    (component as React.FC).displayName ||
    (component as React.FC).name ||
    (component as string).toString?.() ||
    'Unnamed'
  }`;
  r.__isStylix = true;
  return r;
}
