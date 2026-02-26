import type * as CSS from 'csstype';
import type { HTMLProps, IntrinsicElements } from './elements';

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
 * Represents any value that can appear within a StylixObject.
 */
export type StylixStyles = StylixObject | null | undefined | false | StylixStyles[];

/**
 * Represents a value for a CSS prop in a Stylix object.
 * The value can be a single value or an object with keys for different media queries.
 */
export type StylixValue<T> = T | { default?: T | undefined; [key: string]: T | undefined };

/**
 * Used to indicate that a component can accept all Stylix properties, including
 * all standard CSS properties, additional user-defined custom style props, and the $css prop.
 *
 * `TOverrideProps` specifies a type whose properties will override any CSS style props if they conflict.
 * `TExtendsFromProps` specifies a type whose conflicting style properties will be omitted.
 *
 * To allow for HTML element props, use `StylixHTMLProps` instead.
 */
export type StylixProps = {
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
};

/**
 * Props for a component that can accept all Stylix properties, including
 * all standard CSS properties, additional user-defined custom style props, and the $css prop,
 * as well as all standard HTML element props for the given tag.
 *
 * For Stylix properties without allowing HTML props, use `StylixProps` instead.
 *
 * Note that some HTML elements have properties that conflict with CSS properties (e.g. `content`, or `width` and `height`
 * on image inputs). By default, Stylix always consumes CSS properties as if they were styles, so HTML props are suppressed
 * and style props take precedence. If you need to use a style prop with a conflicting name, consider renaming the prop
 * in your component.
 *
 * ```ts
 * function StyledInput(props: StylixHTMLProps<'input'> & { inputWidth: HTMLProps<'input'>['width'] }) {
 *   const { inputWidth, ...styles } = props;
 *   return <$ $el={<input width={inputWidth} />} {...styles} />;
 * }
 * ```
 *
 * Alternatively, use `Extends` to create a type that overrides the conflicting properties:
 * ```ts
 * function StyledInput(props: Extends<StylixHTMLProps<'input'>, { width: HTMLProps<'input'>['width'] }>) {
 *   const { inputWidth, ...styles } = props;
 *   return <$ $el={<input width={inputWidth} />} {...styles} />;
 * }
 * ```
 */
export type StylixHTMLProps<TTag extends IntrinsicElements> = Extends<HTMLProps<TTag>, StylixProps>;

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
