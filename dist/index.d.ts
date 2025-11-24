import React from 'react';
import * as CSS from 'csstype';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare const htmlTags: readonly ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rt", "ruby", "s", "samp", "section", "select", "slot", "small", "source", "span", "strong", "sub", "summary", "sup", "svg", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video"];
type IntrinsicElements = (typeof htmlTags)[number];
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
 * Represents any value that can appear within a StylixObject.
 */
type StylixStyles = StylixObject | null | undefined | false | StylixStyles[];
/**
 * Represents a value for a CSS prop in a Stylix object.
 * The value can be a single value or an object with keys for different media queries.
 */
type StylixValue<T> = T | Record<string, T>;
/**
 * Used to indicate that a component can accept all Stylix properties, including
 * all standard CSS properties, additional user-defined custom style props, and the $css prop.
 *
 * `TOverrideProps` specifies a type whose properties will override any CSS style props if they conflict.
 * `TExtendsFromProps` specifies a type whose conflicting style properties will be omitted.
 *
 * To allow for HTML element props, use `StylixHTMLProps` instead.
 */
type StylixProps = {
    /**
     * Additional styles.
     */
    $css?: StylixStyles;
} & {
    [key in keyof CSSProperties]?: StylixValue<CSSProperties[key]>;
} & {
    [key in keyof StylixPropsExtensions]?: StylixValue<key extends keyof StylixPropsExtensions ? StylixPropsExtensions[key] : never>;
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
type StylixHTMLProps<TTag extends IntrinsicElements> = Extends<HTMLProps<TTag>, StylixProps>;
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
    before?: string;
    after?: string;
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

declare function RenderServerStyles(props: Partial<HTMLProps<'style'>>): react_jsx_runtime.JSX.Element;

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
    [key in IntrinsicElements]: React.FC<Extends<React.JSX.IntrinsicElements[key], StylixProps> & {
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
    children?: never;
};
/**
 * The props for the Stylix ($) component when using the $el prop as a component, intrinsic element tag, or rendered element.
 */
type Stylix$elAsComponentProp = StylixProps & Record<string, unknown> & {
    $el: React.ReactElement | React.ComponentType<any> | IntrinsicElements;
    $render?: never;
    children?: React.ReactNode | React.ReactNode[];
};
type Stylix$props = Stylix$elAsComponentProp | Stylix$renderProp;
/**
 * Type of main Stylix component ($).
 */
type Stylix$Component = Stylix$ComponentExtras & ((props: Stylix$props) => React.ReactNode);
declare const Stylix: Stylix$Component;

interface StyleCollector {
    collect: (element: React.ReactElement) => React.ReactElement;
    render: React.FC<React.ComponentProps<'style'>>;
    styles: string[];
}
declare const styleCollectorContext: React.Context<string[] | undefined>;
declare function createStyleCollector(): StyleCollector;

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

type ClassNamePrimitive = string | number | boolean | null | undefined;
type ClassName = ClassNamePrimitive | ClassName[] | {
    [key: string]: ClassNamePrimitive;
} | (() => ClassName);
/**
 * A utility function to create a string of class names based on the provided parameters.
 * Accepts a variable number of arguments, each of which can be one of the following:
 *
 * - A string, which will be included in the class name string.
 * - An object, where the keys are class names and the values are booleans indicating whether to include the class name.
 * - An array of strings or objects, which will be flattened and processed as above.
 * - A function that returns a string, object, or array, which will be processed as above.
 * - Any other value will be ignored.
 */
declare function cx(...args: ClassName[]): string;

type ObjectOrArray = Record<string | number, unknown>;
type MapObjectFunction<TContext extends object = object> = (key: string | number, value: unknown, target: ObjectOrArray, context: TContext, mapRecursive: (value: unknown) => ObjectOrArray) => void;
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
declare function mapObject<TSource, TContext extends object>(source: TSource, mapFn: MapObjectFunction<TContext>, context?: TContext): TSource;

type StylixContext = StylixPublicContext;

export { RenderServerStyles, StyleElement, StylixProvider, createStyleCollector, customProps, cx, Stylix as default, defaultPlugins, mapObject, styleCollectorContext, useGlobalStyles, useKeyframes, useStyles, useStylixContext };
export type { Extends, HTMLProps, IntrinsicElements, StyleCollector, Stylix$Component, StylixContext, StylixHTMLProps, StylixObject, StylixPlugin, StylixPluginFunctionContext, StylixProps, StylixPropsExtensions, StylixStyles, StylixValue };
