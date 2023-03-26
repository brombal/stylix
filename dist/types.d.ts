import * as React from 'react';
import { CSSProperties } from 'react';
/**
 * Utility type that extends T with U, overriding any properties that are already defined in T.
 */
export type Extends<T, U> = Omit<T, keyof U> & U;
export type StylixValue<T> = T | Array<T | '@'> | ((theme: any, media: string[]) => T | Array<T | '@'>);
/**
 * All standard CSS properties, custom style props, and the $css prop.
 */
export type StylixStyleProps = {
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
    [key in keyof StylixPropsExtensions]?: StylixValue<key extends keyof StylixPropsExtensions ? StylixPropsExtensions[key] : never>;
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
export interface StylixPropsExtensions {
}
/**
 * Props for a custom component that accepts Stylix style props.
 *
 * `TComponent` is the type of the component that styles will be forwarded to. This could an html element (e.g. 'div')
 * or a React component (e.g. MyComponent).
 *
 * Example:
 * function MyStyledComponent(props: StylixProps<'div'>) {
 *   return <$.div {...props} />;
 * }
 */
export type StylixProps<TComponent extends React.ElementType = any, TExtends = object> = Extends<Extends<StylixStyleProps, React.ComponentPropsWithRef<TComponent>>, TExtends>;
/**
 * Additional properties on the Stylix ($) component and its built-in html components.
 */
export type StylixComponentMeta = {
    displayName?: string;
    __isStylix: true;
};
export type Stylix$elProp<TComponent extends React.ElementType | React.ReactElement> = {
    /**
     * Specifies the element to render.
     */
    $el: TComponent;
};
export type Stylix$elPropOptional<TComponent extends React.ElementType | React.ReactElement> = Partial<Stylix$elProp<TComponent>>;
/**
 * Props for main Stylix component (<$>)
 * `TComponent` is determined automatically by the type of $el.
 * <$ $el={...}>...</$>
 */
export type Stylix$Props<TComponent extends React.ElementType | React.ReactElement> = Stylix$elProp<TComponent> & (TComponent extends React.ElementType<infer P> ? Extends<StylixStyleProps, P> : StylixStyleProps & Record<string, any>);
type Stylix$ComponentExtras = StylixComponentMeta & {
    [key in keyof JSX.IntrinsicElements]: React.FC<StylixProps<key>>;
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
    <TComponent extends React.ElementType | React.ReactElement>(props: Stylix$Props<TComponent>, context?: any): React.ReactElement<any, any> | null;
}
export {};
