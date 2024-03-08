import * as CSS from 'csstype';
import type React from 'react';

type CSSProperties = CSS.StandardPropertiesHyphen<number | string> &
  CSS.VendorPropertiesHyphen<number | string> &
  CSS.StandardProperties<number | string> &
  CSS.VendorProperties<number | string>;

// Generic utility types

type Override<T, U> = Omit<T, keyof U> & U;

/**
 * Utility type that extends T1 with T2, T3, T4, overriding any properties that are already defined in previous types.
 */
export type Extends<T1, T2, T3 = unknown, T4 = unknown> = Override<
  Override<Override<T1, T2>, T3>,
  T4
>;

// Gets optional keys of T
export type OptionalKeys<T extends object> = {
  [K in keyof T]: undefined extends T[K] ? K : never;
}[keyof T];

// Gets non-optional keys of T
export type NonOptionalKeys<T extends object> = {
  [K in keyof T]: undefined extends T[K] ? never : K;
}[keyof T];

// Makes all keys of T optional if they can be undefined
export type WithOptionalKeys<T extends object> = {
  [K in OptionalKeys<T>]?: T[K];
} & {
  [K in NonOptionalKeys<T>]: T[K];
};

// Takes an object of properties, and an object of new property names as keys and original prop names as values.
// Result is an object of new keys with types of the original props (including source properties that were not mapped).
// E.g. MappedProps<{ someProp: string, oldProp: number }, { newProp: 'oldProp' }> = { someProp: string; newProp: number; }
export type MappedProperties<
  TSource extends object,
  TMap extends { [key: string]: keyof TSource },
> = WithOptionalKeys<
  {
    // Include mapped properties
    [K in keyof TMap]: TSource[TMap[K]];
  } & {
    // Include source properties that were not mapped
    [K in Exclude<keyof TSource, TMap[keyof TMap]>]: TSource[K];
  }
>;

// React utility types

/**
 * - An html element,
 * - A React function component that accepts a second ref parameter
 * - A React function component that is the result of React.forwardRef().
 */
export type HtmlOrComponent =
  | keyof React.JSX.IntrinsicElements
  | React.ForwardRefRenderFunction<any, any>
  | React.ForwardRefExoticComponent<any>;

/**
 * Gets the props of TComponent.
 */
export type HtmlOrComponentProps<TComponent extends HtmlOrComponent> =
  TComponent extends keyof React.JSX.IntrinsicElements
    ? React.ComponentPropsWithoutRef<TComponent>
    : TComponent extends React.ForwardRefRenderFunction<infer R, infer P>
      ? P & React.RefAttributes<R>
      : TComponent extends React.ForwardRefExoticComponent<infer P>
        ? P
        : never;

// Stylix types

export type StylixObject = Record<string, unknown>;
export type StylixStyles = StylixObject | StylixObject[];

export type StylixValue<T> =
  | T
  | Array<T | '@'>;

/**
 * All standard CSS properties, custom style props, and the $css prop.
 */
export type StylixProps<TOverrideProps = unknown, TExtendsFromProps = unknown> = Extends<
  TExtendsFromProps,
  {
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
  } & {
    [key in keyof StylixPropsExtensions]?: StylixValue<
      key extends keyof StylixPropsExtensions ? StylixPropsExtensions[key] : never
    >;
  },
  TOverrideProps
>;

/**
 * Allows users to add custom props to Stylix components:
 *
 * declare module 'stylix' {
 *   interface StylixStyleProperties {
 *     ...
 *   }
 * }
 */
export interface StylixPropsExtensions {}

/**
 * Additional properties on the Stylix ($) component and its built-in html components.
 */
export type StylixComponentMeta = {
  displayName?: string;
  __isStylix: true;
};

export type Stylix$elProp<TComponent extends ComponentOrElement> = {
  /**
   * Specifies the element to render.
   */
  $el: TComponent;
};

export type Stylix$elPropOptional<TComponent extends ComponentOrElement> = Partial<
  Stylix$elProp<TComponent>
>;

export type ComponentOrElement = React.ElementType | React.ReactElement | React.JSX.Element;

/**
 * Props for main Stylix component (<$>)
 * `TComponent` is determined automatically by the type of $el.
 * <$ $el={...}>...</$>
 */
export type Stylix$Props<TComponent extends ComponentOrElement> = Stylix$elProp<TComponent> &
  (TComponent extends React.ElementType<infer P>
    ? Extends<P, StylixProps>
    : StylixProps & { [key: string]: any }); // & Record<string, any>

type Stylix$ComponentExtras = StylixComponentMeta & {
  /**
   * Additional properties for Stylix wrapped html components ($.div, $.span, etc)
   */
  [key in keyof React.JSX.IntrinsicElements]: React.FC<
    StylixProps<Omit<React.ComponentPropsWithRef<key>, 'color' | 'content' | 'translate'>> & {
      htmlContent?: string;
      htmlTranslate?: 'yes' | 'no';
    }
  >;
};

/**
 * Type of main Stylix component ($)
 */
export interface Stylix$Component extends Stylix$ComponentExtras {
  /**
   * This is equivalent to React.FunctionComponent, but must be specified explicitly this way to allow
   * TComponent to be generic here and not directly on the Stylix$Component type, so that it can be inferred at the time
   * the component is used.
   */
  <TComponent extends React.ElementType | React.ReactElement>(
    props: Stylix$Props<TComponent>,
    context?: any,
  ): React.ReactElement<any, any> | null;
}
