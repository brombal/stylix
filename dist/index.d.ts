import * as CSS from 'csstype';
import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * Gets the props of a given HTML tag.
 */
type HTMLProps<TTag extends keyof React.JSX.IntrinsicElements> = React.JSX.IntrinsicElements[TTag];

type CSSProperties = CSS.StandardPropertiesHyphen<number | string> & CSS.VendorPropertiesHyphen<number | string> & CSS.StandardProperties<number | string> & CSS.VendorProperties<number | string>;
type Override<T, U> = Omit<T, keyof U> & U;
/**
 * Utility type that extends T1 with T2, T3, T4, overriding any properties that are already defined in previous types.
 */
type Extends<T1, T2, T3 = unknown, T4 = unknown> = Override<Override<Override<T1, T2>, T3>, T4>;
/**
 * An object containing styles.
 */
type StylixObject = Record<string, unknown>;
/**
 * Used to represent any value that can appear within a StylixObject.
 */
type StylixStyles = StylixObject | null | undefined | false | StylixStyles[];
/**
 * Used to represent a value for a CSS prop in a Stylix object.
 * The value can be a single value or an object with keys for different media queries.
 */
type StylixValue<T> = T | Record<string, T>;
/**
 * Used to indicate that a component can accept all Stylix properties, including
 * all standard CSS properties, additional user-defined custom style props, and the $css prop.
 *
 * The type arguments specify a type to override, and a type to extend from.
 *
 * To allow for HTML element props, use `StylixHTMLProps` instead.
 */
type StylixProps<TOverrideProps = unknown, TExtendsFromProps = unknown> = Extends<TExtendsFromProps, {
    /**
     * Additional styles.
     */
    $css?: StylixStyles;
} & {
    [key in keyof CSSProperties]?: StylixValue<CSSProperties[key]>;
} & {
    [key in keyof StylixPropsExtensions]?: StylixValue<key extends keyof StylixPropsExtensions ? StylixPropsExtensions[key] : never>;
}, TOverrideProps>;
/**
 * Used to indicate that a component can accept all Stylix properties, including
 * all standard CSS properties, additional user-defined custom style props, and the $css prop,
 * as well as all standard HTML element props for the given tag.
 *
 * For Stylix properties without allowing HTML props, use `StylixProps` instead.
 */
type StylixHTMLProps<TTag extends keyof React.JSX.IntrinsicElements, TOverrideProps = unknown, TExtendsFromProps = unknown> = StylixProps<HTMLProps<TTag> & TOverrideProps, TExtendsFromProps>;
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
interface StylixPropsExtensions {
}

declare const customProps: (customProps: Record<string, any>) => StylixPlugin[];

/**
 * Stylix plugin function context object
 */
type StylixPluginFunctionContext = StylixPublicContext & {
    className: string | null;
};
/**
 * Stylix plugin interface
 */
type StylixPlugin = {
    name: string;
    before?: StylixPlugin;
    after?: StylixPlugin;
    atIndex?: number;
} & ({
    name: string;
    type: 'initialize';
    plugin(ctx: StylixPluginFunctionContext): void;
} | {
    type: 'processStyles' | 'preprocessStyles';
    plugin(ctx: StylixPluginFunctionContext, styles: StylixStyles): StylixStyles;
});
declare const defaultPlugins: StylixPlugin[];

type OpaqueMediaStyles = {
    __opaqueMediaStyles: true;
};
type StylixMediaValue = {
    [key: string]: OpaqueMediaStyles | StylixMediaValue;
};
type StylixMediaFunc = (styles: OpaqueMediaStyles) => StylixMediaValue;
type StylixMediaDefinition = Record<string, StylixMediaFunc>;

/**
 * Stylix context
 *
 * The <StylixProvider> wrapper represents an "instance" of Stylix - a configuration, set of plugins, and reference to
 * the <style> element where css is output. All nodes contained within a <StylixProvider> element will share this
 * Stylix instance's configuration.
 *
 * See the README for more details.
 */
type StylixProviderProps = {
    id?: string;
    devMode?: boolean;
    plugins?: StylixPlugin[] | StylixPlugin[][];
    styleElement?: HTMLStyleElement;
    media?: StylixMediaDefinition;
    ssr?: boolean;
    children: any;
};
type StylixContext$1 = {
    id: string;
    devMode: boolean;
    media: StylixMediaDefinition | undefined;
    plugins: StylixPlugin[];
    stylesheet?: CSSStyleSheet;
    styleElement?: HTMLStyleElement;
    styleCollector?: string[];
    styleCounter: number;
    rules: {
        [key: string]: undefined | {
            className: string;
            rules: string[];
            refs: number;
        };
    };
    styleProps: Record<string, string>;
    ssr?: boolean;
    cleanupRequest?: number;
    requestApply: boolean;
    classifyProps(props: Record<string, unknown>): [Record<string, unknown>, Record<string, unknown>];
};
type StylixPublicContext = Pick<StylixContext$1, 'id' | 'devMode' | 'media' | 'stylesheet' | 'styleElement' | 'styleProps'>;
/**
 * Gets the current Stylix context.
 */
declare function useStylixContext(): StylixContext$1;
declare function StylixProvider({ id, devMode, plugins, media, styleElement, children, ssr, }: StylixProviderProps): React.ReactElement;

declare function StyleElement(props: {
    styles: string[];
} & Partial<HTMLProps<'style'>>): react_jsx_runtime.JSX.Element;

/**
 * Accepts a Stylix CSS object and returns a unique className.
 * The styles are registered with the Stylix context and will be applied to the document.
 * If `global` is false, provided styles will be nested within the generated classname.
 * Returns the className if enabled, or an empty string.
 */
declare function useStyles(styles: StylixStyles, options?: {
    global?: boolean;
    debugLabel?: string;
}): string;
declare function useKeyframes(keyframes: any): string;
declare function useGlobalStyles(styles: StylixStyles, options?: {
    disabled?: boolean;
}): string;

type MapObjectFunction = (key: string | number, value: any, source: unknown, context: any, mapRecursive: (value: unknown) => unknown) => unknown;
/**
 * Returns a new object or array, generated by invoking `map` on each key-value pair in `source` and merging the returned value into
 * the result. The return value should be an object or array (to match `source`), or undefined to omit the key-value pair from the result.
 *
 * If `source` is an object, Object.assign() will be used to merge the response into the result object.
 *
 * If `source` is an array, the returned array entries will be pushed onto the result array (i.e. it will be flattened, one level deep).
 *
 * The `map` function will receive the following arguments:
 * - The current key or index
 * - The current value
 * - The current object/array being mapped
 * - A context object. This is a plain object that you can modify as needed. The value will be shallow cloned for each key, and the clone
 *   will be passed into the `mapRecursive` method in order to persist it in recursive mapping.
 * - A `mapRecursive` function that can be used to recursively map nested objects or arrays. You can call this by passing the current value,
 *   which will run the same mapping function on the value and return the result. If the value is not an object or array, it will just
 *   return the value. The mapping function will receive the context object for the current key, and any modifications made to the context
 *   object will be persisted into the recursive call. This could be used, for example, to keep track of the current depth of the recursion
 *   or the full path of the current value.
 *
 * Example:
 *
 * ```ts
 * const value = {
 *   ignoreMe: null,
 *   string: 'value',
 *   object: {
 *     a: 1,
 *     b: 2,
 *   },
 *   array: [1, 2, 3, 4],
 * }
 * const result = mapObjectRecursive(value, (key, value, source, context) => {
 *   if (key === 'ignoreMe')
 *     return undefined; // will omit key from result
 *   if (typeof key === 'string' && typeof value === 'string')
 *     return { [key]: value + '-mapped' }; // will append '-mapped' to string values
 *   if (typeof key === 'string' && typeof value === 'number')
 *     return { [key]: value, [`${key}-mapped`]: value * 2 }; // will add a new key with the value doubled
 *   if (typeof value === 'object')
 *     return { [key]: value }; // will leave object unchanged
 *   if (Array.isArray(source) && typeof value === 'number')
 *     return [value, value * 2]; // will add the value and the value doubled to the array
 * });
 * // result:
 * // {
 * //   string: 'value-mapped',
 * //   object: {
 * //     a: 1,
 * //     'a-mapped': 2,
 * //     b: 2,
 * //     'b-mapped': 4,
 * //   },
 * //   array: [1, 2, 2, 4, 3, 6, 4, 8],
 * // }
 * ```
 */
declare function mapObject<TSource>(source: TSource, map: MapObjectFunction, context?: any): TSource;

interface StyleCollector {
    collect: (element: React.ReactElement) => React.ReactElement;
    render: React.FC<React.ComponentProps<'style'>>;
    styles: string[];
}
declare const styleCollectorContext: React.Context<string[] | undefined>;
declare function createStyleCollector(): StyleCollector;

/**
 * Additional properties on the Stylix ($) component and its html component properties (`<$.div>`, etc).
 */
type StylixComponentMeta = {
    displayName?: string;
    __isStylix: true;
};
/**
 * Defines the static meta properties and the HTML elements on the `$` object ($.div, $.span, etc).
 */
type Stylix$ComponentExtras = StylixComponentMeta & {
    [key in keyof React.JSX.IntrinsicElements]: React.FC<StylixProps<Omit<React.JSX.IntrinsicElements[key], 'color' | 'content' | 'translate'>> & {
        htmlContent?: string;
        htmlTranslate?: 'yes' | 'no';
    }>;
};
type StylixRenderFn<TProps = any> = (className: string | undefined, props: TProps) => React.ReactNode;
/**
 * The props for the Stylix ($) component when using the $render prop.
 */
type Stylix$renderProp = StylixProps & Record<string, unknown> & {
    $el?: never;
    $render: StylixRenderFn;
    children?: React.ReactNode | React.ReactNode[];
};
/**
 * The props for the Stylix ($) component when using the children render function.
 */
type Stylix$childrenProp = StylixProps & Record<string, unknown> & {
    $el?: never;
    $render?: never;
    children: StylixRenderFn;
};
/**
 * The props for the Stylix ($) component when using the $el prop as a component.
 */
type Stylix$elAsComponentProp<TComponent extends React.ElementType> = (TComponent extends React.ElementType<infer P> ? StylixProps<object, P> : never) & {
    $el: TComponent;
    $render?: never;
    children?: React.ReactNode | React.ReactNode[];
};
/**
 * The props for the Stylix ($) component when using the $el prop.
 */
type Stylix$elAsElementProp = StylixProps & Record<string, unknown> & {
    $render?: never;
    $el: React.ReactElement;
    children?: React.ReactNode | React.ReactNode[];
};
/**
 * Props for the Stylix ($) component
 */
type Stylix$Props<TComponent extends React.ElementType> = Stylix$elAsComponentProp<TComponent> | Stylix$elAsElementProp | Stylix$renderProp | Stylix$childrenProp;
/**
 * Type of main Stylix component ($).
 */
interface Stylix$Component extends Stylix$ComponentExtras {
    <TComponent extends React.ElementType>(props: Stylix$Props<TComponent>): React.ReactNode;
}
declare const Stylix: Stylix$Component;

declare function RenderServerStyles(props: Partial<HTMLProps<'style'>>): react_jsx_runtime.JSX.Element;

type StylixContext = StylixPublicContext;

export { type Extends, type HTMLProps, RenderServerStyles, type StyleCollector, StyleElement, type Stylix$Component, type StylixContext, type StylixHTMLProps, type StylixObject, type StylixPlugin, type StylixPluginFunctionContext, type StylixProps, type StylixPropsExtensions, StylixProvider, type StylixStyles, createStyleCollector, customProps, Stylix as default, defaultPlugins, mapObject, styleCollectorContext, useGlobalStyles, useKeyframes, useStyles, useStylixContext };
