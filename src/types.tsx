import type * as CSS from 'csstype';
import type React from 'react';
import type { HTMLProps } from './elements';

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

// Stylix types

/**
 * An object containing styles.
 */
export type StylixObject = Record<string, unknown>;

/**
 * Used to represent any value that can appear within a StylixObject.
 */
export type StylixStyles = StylixObject | null | undefined | false | StylixStyles[];

/**
 * Used to represent a value for a CSS prop in a Stylix object.
 * The value can be a single value or an object with keys for different media queries.
 */
export type StylixValue<T> = T | Record<string, T>;

/**
 * Used to indicate that a component can accept all Stylix properties, including
 * all standard CSS properties, additional user-defined custom style props, and the $css prop.
 *
 * The type arguments specify a type to override, and a type to extend from.
 *
 * To allow for HTML element props, use `StylixHTMLProps` instead.
 */
export type StylixProps<TOverrideProps = unknown, TExtendsFromProps = unknown> = Extends<
  TExtendsFromProps,
  {
    /**
     * Additional styles.
     */
    $css?: StylixStyles;
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
 * Used to indicate that a component can accept all Stylix properties, including
 * all standard CSS properties, additional user-defined custom style props, and the $css prop,
 * as well as all standard HTML element props for the given tag.
 *
 * For Stylix properties without allowing HTML props, use `StylixProps` instead.
 */
export type StylixHTMLProps<
  TTag extends keyof React.JSX.IntrinsicElements,
  TOverrideProps = unknown,
  TExtendsFromProps = unknown,
> = StylixProps<HTMLProps<TTag> & TOverrideProps, TExtendsFromProps>;

/**
 * Used to allow users to add custom props to Stylix components.
 *
 * E.g.
 * ```ts
 * declare module '@stylix/core' {
 *   interface StylixStyleProperties {
 *     ...
 *   }
 * }
 * ```
 */
// biome-ignore lint/suspicious/noEmptyInterface: This is intended to be extended by users.
export interface StylixPropsExtensions {}
