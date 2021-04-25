import React, { CSSProperties } from 'react';

export type StylixValue<T> =
  | T
  | Array<T | '@'>
  | ((theme: any, media: string[]) => T | Array<T | '@'>);

/**
 * All standard CSS properties, custom style props, and the $css prop.
 */
type StylixStyleProps = {
  /**
   * Additional styles.
   */
  $css?: any;
  /**
   * Disables Stylix for the current element.
   */
  $disabled?: boolean;
} & {
  [key in keyof CSSProperties]?: StylixValue<CSSProperties[key]>;
} &
  {
    [key in keyof StylixPropsExtensions]?: StylixValue<
      key extends keyof StylixPropsExtensions ? StylixPropsExtensions[key] : never
    >;
  };

/**
 * Allows users to add custom props to Stylix components:
 *
 * declare module 'stylix' {
 *   interface StylixStyleProperties {
 *     ...
 *   }
 * }
 */
export interface StylixPropsExtensions {} // eslint-disable-line

/**
 * A component's props, without properties that conflict with style properties.
 */
type ComponentPropsWithoutStyles<TComponent extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<TComponent>,
  keyof StylixStyleProps
>;

/**
 * Allows users to define components that accept Stylix style props.
 */
export type StylixProps<
  ElType extends React.ElementType = any
> = ComponentPropsWithoutStyles<ElType> & StylixStyleProps;

/**
 * Additional properties on Stylix component functions.
 */
type StylixComponentMeta = {
  displayName?: string;
  __isStylix: true;
};

export type StylixWrappedComponentProps<
  TComponent extends React.ElementType
> = ComponentPropsWithoutStyles<TComponent> & StylixStyleProps;

export type StylixWrappedComponent<
  TComponent extends React.ElementType,
  TAdditionalProps = unknown
> = React.FunctionComponent<TAdditionalProps & StylixWrappedComponentProps<TComponent>> &
  StylixComponentMeta;

/**
 * Props for main Stylix component (<$>)
 * `TComponent` is determined automatically by the type of $el.
 * <$ $el={...}>...</$>
 */
export type Stylix$Props<TComponent extends React.ElementType | React.ReactElement> = {
  /**
   * Specifies the element to render.
   */
  $el: TComponent;
} & ComponentPropsWithoutStyles<
  TComponent extends React.ElementType
    ? TComponent
    : TComponent extends React.ReactElement<infer P>
    ? P
    : never
> &
  StylixStyleProps;

/**
 * Type of main Stylix component ($)
 */
export type Stylix$Component = {
  /**
   * This is equivalent to React.FunctionComponent, but must be specified explicitly this way to allow
   * TComponent to be generic here and not directly on Stylix$Component, so that it can be inferred at the time
   * the component is used.
   */
  <TComponent extends React.ElementType | React.ReactElement>(
    props: Stylix$Props<TComponent>,
    context?: any,
  ): React.ReactElement<any, any> | null;

  /**
   * Type for the $.styled() helper function.
   */
  styled: <
    TComponent extends React.ElementType,
    TPropMap extends Record<string, string> = Record<string, never>
  >(
    $el: TComponent,
    conflictingPropMapping?: TPropMap,
  ) => StylixWrappedComponent<TComponent, Record<keyof TPropMap, any>>;
} & StylixComponentMeta &
  {
    /**
     * Additional properties for Stylix html components ($.div, $.span, etc)
     */
    [key in keyof JSX.IntrinsicElements]: StylixWrappedComponent<key>;
  };
