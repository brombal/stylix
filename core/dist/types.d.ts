import * as CSS from "csstype";
import React from "react";
type CSSProperties = CSS.StandardProperties<number | string> & CSS.VendorProperties<number | string>;
/**
 * Utility type that extends T with U, overriding any properties that are already defined in T.
 */
export type Extends<T, U> = Omit<T, keyof U> & U;
type StylixObject = Record<string, unknown>;
type StylixStyles = StylixObject | StylixObject[];
type StylixValue<T> = T | Array<T | '@'> | ((theme: any, media: string[]) => T | Array<T | '@'>);
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
export type StylixProps<TComponent extends React.ElementType = any, TExtends = object, TForceStyles extends keyof CSSProperties = never> = Extends<Extends<StylixStyleProps, Omit<React.ComponentPropsWithRef<TComponent>, TForceStyles>>, TExtends>;
/**
 * Additional properties on the Stylix ($) component and its built-in html components.
 */
type StylixComponentMeta = {
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
type Stylix$Props<TComponent extends React.ElementType | React.ReactElement> = Stylix$elProp<TComponent> & (TComponent extends React.ElementType<infer P> ? Extends<P, StylixStyleProps> : StylixStyleProps & Record<string, any>);
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
export function classifyProps(props: any, knownProps: Record<string, string>): [any, any];
export function useClassifyProps(props: any): any[];
/**
 * Invokes `map` on each key/value pair in `object`. The key/value pair is deleted from the object and replaced by
 * merging in the object returned from `map`. Recursively descends into all object and array values.
 * The `map` function will receive the key, the value, the current object being mapped, and a context object.
 * The context object is a plain object that you can modify as needed. The value will persist to subsequent calls to
 * `map` on child properties of `value`.
 */
export function mapObjectRecursive(object: any, map: (key: string | number, value: any, object: any, context: any) => Record<string | number, any> | undefined, context?: any): any;
/**
 * Invokes a callback for each key/value pair in `object`, and continues recursively on each value that is an array or a
 * plain object. Returns `object`.
 * The `cb` function will receive the key, the value, the current object being mapped, and a context object.
 * The context object is a plain object that you can modify as needed. The value will persist to subsequent calls to
 * `map` on child properties of `value`.
 */
export function walkRecursive<T extends Record<string, any> = any>(object: T, cb: (key: string, value: any, currentObject: any, context: any) => void, context?: any): T;
export const customProps: (customProps: Record<string, any>) => StylixPlugin[];
/**
 * Stylix plugin function context object
 */
export type StylixPluginFunctionContext = StylixPublicContext & {
    hash: string | null;
};
/**
 * Stylix plugin interface
 */
export interface StylixPlugin {
    name: string;
    type: 'initialize' | 'processStyles' | 'preprocessStyles';
    plugin(ctx: StylixPluginFunctionContext, styles: any): any;
    before?: StylixPlugin;
    after?: StylixPlugin;
    atIndex?: number;
}
export const defaultPlugins: {
    themeFunctions: StylixPlugin;
    merge$css: StylixPlugin;
    mediaArrays: StylixPlugin;
    propCasing: StylixPlugin;
    flattenNestedStyles: StylixPlugin;
    replace$$class: StylixPlugin;
    defaultPixelUnits: StylixPlugin;
    cleanStyles: StylixPlugin;
};
export interface StyleCollector {
    collect: (element: React.ReactElement) => React.ReactElement;
    render: React.FC<React.ComponentProps<'style'>>;
    styles: string[];
}
export const styleCollectorContext: React.Context<string[]>;
export function createStyleCollector(): StyleCollector;
/**
 * Stylix context
 *
 * The <StylixProvider> wrapper represents an "instance" of Stylix - a configuration, set of plugins, and reference to
 * the <style> element where css is output. All nodes contained within a <StylixProvider> element will share this
 * Stylix instance's configuration.
 *
 * A StylixProvider internally contains a <StylixTheme>, so you can conveniently provide a theme object and media query
 * array with a single element.
 *
 * See the README for more details.
 */
type StylixProviderProps<Theme = any> = StylixThemeProps<Theme> & {
    id?: string;
    devMode?: boolean;
    plugins?: StylixPlugin[] | StylixPlugin[][];
    styleElement?: HTMLStyleElement;
    children: any;
};
type StylixThemeProps<Theme = any> = {
    theme?: Theme;
    media?: string[];
    children: any;
};
type _StylixContext1<Theme = any> = {
    id: string;
    devMode: boolean;
    theme: Theme;
    media: string[];
    plugins: StylixPlugin[];
    stylesheet: CSSStyleSheet;
    styleElement: HTMLStyleElement;
    styleCollector?: string[];
    rules: {
        [key: string]: {
            hash: string;
            rules: string[];
            refs: number;
        };
    };
    styleProps: Record<string, string>;
    cleanupRequest?: number;
    requestApply: boolean;
};
type StylixPublicContext = Pick<_StylixContext1, 'id' | 'devMode' | 'theme' | 'media' | 'stylesheet' | 'styleElement' | 'styleProps'>;
export function useStylixContext<Theme = any>(): _StylixContext1<Theme>;
export function useStylixTheme<Theme = any>(): Theme;
export function StylixProvider({ id, devMode, plugins, styleElement, children, ...themeProps }: StylixProviderProps): React.ReactElement;
export function StylixTheme({ children, media, theme }: StylixThemeProps): JSX.Element;
/**
 * Accepts a Stylix CSS object and returns a unique className based on the styles' hash.
 * The styles are registered with the Stylix context and will be applied to the document.
 * If `global` is false, provided styles will be nested within the generated classname.
 * Returns the className hash if enabled, or an empty string.
 */
export function useStyles(styles: Record<string, any> | undefined, options?: {
    global?: boolean;
    disabled?: boolean;
}): string;
export function useKeyframes(keyframes: any, options?: {
    disabled?: boolean;
}): string;
export function useGlobalStyles(styles: StylixStyles, options?: {
    disabled?: boolean;
}): string;
declare const Stylix: Stylix$Component;
export default Stylix;
export type StylixStyledComponentWithProps<TProps> = React.FC<Extends<TProps, StylixStyleProps>> & StylixComponentMeta;
export type StylixStyledComponent<TComponent extends HtmlOrComponent> = StylixStyledComponentWithProps<HtmlOrComponentProps<TComponent>>;
type HtmlOrComponent = keyof JSX.IntrinsicElements | React.ForwardRefRenderFunction<any, any>;
type HtmlOrComponentProps<TComponent extends HtmlOrComponent> = TComponent extends keyof JSX.IntrinsicElements ? React.ComponentPropsWithRef<TComponent> : TComponent extends React.ForwardRefRenderFunction<infer R, infer P> ? P & React.RefAttributes<R> : never;
export function styled<TComponent extends HtmlOrComponent, TPropMap extends Record<string, string> = Record<string, never>>($el: TComponent, addProps?: Extends<StylixStyleProps, Partial<HtmlOrComponentProps<TComponent>>>, conflictingPropMapping?: TPropMap): StylixStyledComponent<TComponent>;
export type StylixContext = StylixPublicContext;

//# sourceMappingURL=types.d.ts.map
