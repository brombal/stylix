import React, { createContext, useLayoutEffect, useContext, useRef } from 'react';

function classifyProps(props, knownProps) {
    const styles = {};
    const other = {};
    for (const prop in props) {
        // If prop is not a valid JSX prop, it must be a CSS selector
        if (!isValidJSXProp(prop) || (isStyleProp(prop, knownProps) && isStyleValue(props[prop]))) {
            styles[prop] = props[prop];
        }
        else {
            other[prop] = props[prop];
        }
    }
    return [styles, other];
}
function useClassifyProps(props) {
    const ctx = useStylixContext();
    const [styles, other] = classifyProps(props, ctx.styleProps);
    return [styles, other];
}
/**
 * Determines if `value` is a recognized CSS property (can be standard CSS or custom Stylix prop).
 */
function isStyleProp(prop, knownProps) {
    return isValidJSXProp(prop) && simplifyStylePropName(prop) in knownProps;
}
function isValidJSXProp(value) {
    // Not an exact check, but mostly rules out complex css selectors
    return /^[a-z$][a-z0-9_-]*$/i.test(value);
}
function simplifyStylePropName(value) {
    return value.toLowerCase().replace(/[^a-z]/gi, '');
}
/**
 * Tries to determine if `value` is likely to be a valid CSS property value.
 * We can't be 100% sure, but this should catch most cases.
 * There is a check here to make sure React elements do not pass the test, as this
 * has turned out to be a common case where a property like 'content' means something
 * to a component, but is also a valid CSS property.
 */
function isStyleValue(value) {
    return (typeof value === 'function' ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        Array.isArray(value) ||
        value === null ||
        // Check for plain objects, and make sure it doesn't have the $$typeof property (react elements are never valid as style values)
        (typeof value === 'object' && value.constructor === Object && !('$$typeof' in value)));
}

var cssProps = [
	"--*",
	"-webkit-line-clamp",
	"accent-color",
	"align-content",
	"align-items",
	"align-self",
	"align-tracks",
	"all",
	"animation",
	"animation-composition",
	"animation-delay",
	"animation-direction",
	"animation-duration",
	"animation-fill-mode",
	"animation-iteration-count",
	"animation-name",
	"animation-play-state",
	"animation-range",
	"animation-range-end",
	"animation-range-start",
	"animation-timing-function",
	"animation-timeline",
	"appearance",
	"aspect-ratio",
	"backdrop-filter",
	"backface-visibility",
	"background",
	"background-attachment",
	"background-blend-mode",
	"background-clip",
	"background-color",
	"background-image",
	"background-origin",
	"background-position",
	"background-position-x",
	"background-position-y",
	"background-repeat",
	"background-size",
	"block-overflow",
	"block-size",
	"border",
	"border-block",
	"border-block-color",
	"border-block-style",
	"border-block-width",
	"border-block-end",
	"border-block-end-color",
	"border-block-end-style",
	"border-block-end-width",
	"border-block-start",
	"border-block-start-color",
	"border-block-start-style",
	"border-block-start-width",
	"border-bottom",
	"border-bottom-color",
	"border-bottom-left-radius",
	"border-bottom-right-radius",
	"border-bottom-style",
	"border-bottom-width",
	"border-collapse",
	"border-color",
	"border-end-end-radius",
	"border-end-start-radius",
	"border-image",
	"border-image-outset",
	"border-image-repeat",
	"border-image-slice",
	"border-image-source",
	"border-image-width",
	"border-inline",
	"border-inline-end",
	"border-inline-color",
	"border-inline-style",
	"border-inline-width",
	"border-inline-end-color",
	"border-inline-end-style",
	"border-inline-end-width",
	"border-inline-start",
	"border-inline-start-color",
	"border-inline-start-style",
	"border-inline-start-width",
	"border-left",
	"border-left-color",
	"border-left-style",
	"border-left-width",
	"border-radius",
	"border-right",
	"border-right-color",
	"border-right-style",
	"border-right-width",
	"border-spacing",
	"border-start-end-radius",
	"border-start-start-radius",
	"border-style",
	"border-top",
	"border-top-color",
	"border-top-left-radius",
	"border-top-right-radius",
	"border-top-style",
	"border-top-width",
	"border-width",
	"bottom",
	"box-decoration-break",
	"box-shadow",
	"box-sizing",
	"break-after",
	"break-before",
	"break-inside",
	"caption-side",
	"caret",
	"caret-color",
	"caret-shape",
	"clear",
	"clip",
	"clip-path",
	"color",
	"color-scheme",
	"column-count",
	"column-fill",
	"column-gap",
	"column-rule",
	"column-rule-color",
	"column-rule-style",
	"column-rule-width",
	"column-span",
	"column-width",
	"columns",
	"contain",
	"contain-intrinsic-size",
	"contain-intrinsic-block-size",
	"contain-intrinsic-height",
	"contain-intrinsic-inline-size",
	"contain-intrinsic-width",
	"container",
	"container-name",
	"container-type",
	"content",
	"content-visibility",
	"counter-increment",
	"counter-reset",
	"counter-set",
	"cursor",
	"direction",
	"display",
	"empty-cells",
	"filter",
	"flex",
	"flex-basis",
	"flex-direction",
	"flex-flow",
	"flex-grow",
	"flex-shrink",
	"flex-wrap",
	"float",
	"font",
	"font-family",
	"font-feature-settings",
	"font-kerning",
	"font-language-override",
	"font-optical-sizing",
	"font-palette",
	"font-variation-settings",
	"font-size",
	"font-size-adjust",
	"font-stretch",
	"font-style",
	"font-synthesis",
	"font-synthesis-small-caps",
	"font-synthesis-style",
	"font-synthesis-weight",
	"font-variant",
	"font-variant-alternates",
	"font-variant-caps",
	"font-variant-east-asian",
	"font-variant-emoji",
	"font-variant-ligatures",
	"font-variant-numeric",
	"font-variant-position",
	"font-weight",
	"forced-color-adjust",
	"gap",
	"grid",
	"grid-area",
	"grid-auto-columns",
	"grid-auto-flow",
	"grid-auto-rows",
	"grid-column",
	"grid-column-end",
	"grid-column-start",
	"grid-row",
	"grid-row-end",
	"grid-row-start",
	"grid-template",
	"grid-template-areas",
	"grid-template-columns",
	"grid-template-rows",
	"hanging-punctuation",
	"height",
	"hyphenate-character",
	"hyphenate-limit-chars",
	"hyphens",
	"image-orientation",
	"image-rendering",
	"image-resolution",
	"initial-letter",
	"initial-letter-align",
	"inline-size",
	"input-security",
	"inset",
	"inset-block",
	"inset-block-end",
	"inset-block-start",
	"inset-inline",
	"inset-inline-end",
	"inset-inline-start",
	"isolation",
	"justify-content",
	"justify-items",
	"justify-self",
	"justify-tracks",
	"left",
	"letter-spacing",
	"line-break",
	"line-clamp",
	"line-height",
	"line-height-step",
	"list-style",
	"list-style-image",
	"list-style-position",
	"list-style-type",
	"margin",
	"margin-block",
	"margin-block-end",
	"margin-block-start",
	"margin-bottom",
	"margin-inline",
	"margin-inline-end",
	"margin-inline-start",
	"margin-left",
	"margin-right",
	"margin-top",
	"margin-trim",
	"mask",
	"mask-border",
	"mask-border-mode",
	"mask-border-outset",
	"mask-border-repeat",
	"mask-border-slice",
	"mask-border-source",
	"mask-border-width",
	"mask-clip",
	"mask-composite",
	"mask-image",
	"mask-mode",
	"mask-origin",
	"mask-position",
	"mask-repeat",
	"mask-size",
	"mask-type",
	"masonry-auto-flow",
	"math-depth",
	"math-shift",
	"math-style",
	"max-block-size",
	"max-height",
	"max-inline-size",
	"max-lines",
	"max-width",
	"min-block-size",
	"min-height",
	"min-inline-size",
	"min-width",
	"mix-blend-mode",
	"object-fit",
	"object-position",
	"offset",
	"offset-anchor",
	"offset-distance",
	"offset-path",
	"offset-position",
	"offset-rotate",
	"opacity",
	"order",
	"orphans",
	"outline",
	"outline-color",
	"outline-offset",
	"outline-style",
	"outline-width",
	"overflow",
	"overflow-anchor",
	"overflow-block",
	"overflow-clip-margin",
	"overflow-inline",
	"overflow-wrap",
	"overflow-x",
	"overflow-y",
	"overscroll-behavior",
	"overscroll-behavior-block",
	"overscroll-behavior-inline",
	"overscroll-behavior-x",
	"overscroll-behavior-y",
	"padding",
	"padding-block",
	"padding-block-end",
	"padding-block-start",
	"padding-bottom",
	"padding-inline",
	"padding-inline-end",
	"padding-inline-start",
	"padding-left",
	"padding-right",
	"padding-top",
	"page",
	"page-break-after",
	"page-break-before",
	"page-break-inside",
	"paint-order",
	"perspective",
	"perspective-origin",
	"place-content",
	"place-items",
	"place-self",
	"pointer-events",
	"position",
	"print-color-adjust",
	"quotes",
	"resize",
	"right",
	"rotate",
	"row-gap",
	"ruby-align",
	"ruby-merge",
	"ruby-position",
	"scale",
	"scrollbar-color",
	"scrollbar-gutter",
	"scrollbar-width",
	"scroll-behavior",
	"scroll-margin",
	"scroll-margin-block",
	"scroll-margin-block-start",
	"scroll-margin-block-end",
	"scroll-margin-bottom",
	"scroll-margin-inline",
	"scroll-margin-inline-start",
	"scroll-margin-inline-end",
	"scroll-margin-left",
	"scroll-margin-right",
	"scroll-margin-top",
	"scroll-padding",
	"scroll-padding-block",
	"scroll-padding-block-start",
	"scroll-padding-block-end",
	"scroll-padding-bottom",
	"scroll-padding-inline",
	"scroll-padding-inline-start",
	"scroll-padding-inline-end",
	"scroll-padding-left",
	"scroll-padding-right",
	"scroll-padding-top",
	"scroll-snap-align",
	"scroll-snap-stop",
	"scroll-snap-type",
	"scroll-timeline",
	"scroll-timeline-axis",
	"scroll-timeline-name",
	"shape-image-threshold",
	"shape-margin",
	"shape-outside",
	"tab-size",
	"table-layout",
	"text-align",
	"text-align-last",
	"text-combine-upright",
	"text-decoration",
	"text-decoration-color",
	"text-decoration-line",
	"text-decoration-skip",
	"text-decoration-skip-ink",
	"text-decoration-style",
	"text-decoration-thickness",
	"text-emphasis",
	"text-emphasis-color",
	"text-emphasis-position",
	"text-emphasis-style",
	"text-indent",
	"text-justify",
	"text-orientation",
	"text-overflow",
	"text-rendering",
	"text-shadow",
	"text-size-adjust",
	"text-transform",
	"text-underline-offset",
	"text-underline-position",
	"text-wrap",
	"timeline-scope",
	"top",
	"touch-action",
	"transform",
	"transform-box",
	"transform-origin",
	"transform-style",
	"transition",
	"transition-delay",
	"transition-duration",
	"transition-property",
	"transition-timing-function",
	"translate",
	"unicode-bidi",
	"user-select",
	"vertical-align",
	"view-timeline",
	"view-timeline-axis",
	"view-timeline-inset",
	"view-timeline-name",
	"view-transition-name",
	"visibility",
	"white-space",
	"white-space-collapse",
	"white-space-trim",
	"widows",
	"width",
	"will-change",
	"word-break",
	"word-spacing",
	"word-wrap",
	"writing-mode",
	"z-index"
];

/**
 * Indicates that an object is most likely just an object literal.
 */
function isPlainObject(obj) {
    return typeof obj === 'object' && obj?.constructor === Object;
}

function cleanObject(object) {
    for (const key in object) {
        const value = object[key];
        if (value === null || value === undefined || value === '')
            delete object[key];
        else if (isPlainObject(value) || Array.isArray(value)) {
            cleanObject(value);
            if (!Object.keys(value).length)
                delete object[key];
        }
    }
    return object;
}
/**
 * Fixes casing and hyphenation on known style props
 */
const cleanStyles = {
    name: 'cleanStyles',
    type: 'processStyles',
    plugin(ctx, styles) {
        return cleanObject(styles);
    },
};

/**
 * Invokes `map` on each key/value pair in `object`. The key/value pair is deleted from the object and replaced by
 * merging in the object returned from `map`. Recursively descends into all object and array values.
 * The `map` function will receive the key, the value, the current object being mapped, and a context object.
 * The context object is a plain object that you can modify as needed. The value will persist to subsequent calls to
 * `map` on child properties of `value`.
 */
function mapObjectRecursive(object, map, context = {}) {
    const clone = Array.isArray(object) ? [] : {};
    for (const k of Object.keys(object)) {
        let key = k;
        const value = object[key];
        if (Array.isArray(object))
            key = +key;
        const contextClone = { ...context };
        let result = map(key, value, object, contextClone);
        if (typeof result !== 'undefined' && typeof result !== 'object' && !Array.isArray(result))
            throw new Error('mapObjectRecursive: return value of map function must be undefined, object, or array!');
        if (typeof result === 'undefined') {
            result = { [key]: value };
        }
        for (const kk in result) {
            let value = result[kk];
            if (isPlainObject(value) || Array.isArray(value))
                value = mapObjectRecursive(value, map, contextClone);
            if (typeof value !== 'undefined')
                clone[kk] = value;
        }
    }
    return clone;
}

const defaultIgnoreUnits = [
    'aspect-ratio',
    'columns',
    'column-count',
    'fill-opacity',
    'flex',
    'flex-grow',
    'flex-shrink',
    'font-weight',
    'line-height',
    'opacity',
    'orphans',
    'stroke-opacity',
    'widows',
    'z-index',
    'zoom',
    'order',
];
/**
 * Adds unit (px, em, etc) to numeric values for any style properties not included in `ignoreProps`..
 */
const defaultUnits = (unit = 'px', ignoreProps = defaultIgnoreUnits) => {
    return {
        name: 'defaultUnits',
        type: 'processStyles',
        plugin(ctx, styles) {
            return mapObjectRecursive(styles, defaultUnitsMap, { unit, ignoreProps });
        },
    };
};
const defaultUnitsMap = (key, value, object, ctx) => {
    if (typeof value === 'number' && !ctx.ignoreProps.includes(key)) {
        return { [key]: String(value) + ctx.unit };
    }
};
const defaultPixelUnits = defaultUnits();

function flatten$1(styles, parent, selector, root, mediaRoot) {
    for (let key in styles) {
        const value = styles[key];
        if (key.startsWith('@media')) {
            // Flatten media queries, but nest them under the root object
            root[key] = root[key] || {};
            flatten$1(value, root[key], selector, root, root[key]);
        }
        else if (key.startsWith('@keyframes')) {
            // Add keyframe rules as-is directly to mediaRoot object
            mediaRoot[key] = value;
        }
        else if (key.startsWith('@container')) {
            // Flatten container queries, but nest them under the mediaRoot object
            mediaRoot[key] = mediaRoot[key] || {};
            flatten$1(value, mediaRoot[key], selector, root, mediaRoot[key]);
        }
        else if (isPlainObject(styles[key])) {
            // Concatenate or replace & in selectors and then continue flattening styles
            if (key.includes('&')) {
                key = key.replace(/&/g, selector);
            }
            else {
                key = (selector + ' ' + key).trim();
            }
            parent[key] = parent[key] || {};
            flatten$1(value, parent, key, root, mediaRoot);
        }
        else {
            // Selector is just a css property
            parent[selector] = parent[selector] || {};
            parent[selector][key] = styles[key];
        }
    }
}
/**
 * Flattens nested style objects that use `&` to reference parent class.
 */
const flattenNestedStyles = {
    name: 'flattenNestedStyles',
    type: 'processStyles',
    plugin(ctx, styles) {
        const flattened = {};
        flatten$1(styles, flattened, '', flattened, flattened);
        return flattened;
    },
};

/**
 * Expands arrays as media queries.
 */
const mediaArrays = {
    name: 'mediaArrays',
    type: 'processStyles',
    plugin(ctx, styles) {
        if (!ctx.media)
            return styles;
        // Fill out ditto values
        styles = mapObjectRecursive(styles, mapDittoValues);
        const mediaStyles = {};
        let nonMediaStyles = styles;
        for (const i in ctx.media) {
            const mediaQuery = ctx.media[i];
            if (!mediaQuery) {
                nonMediaStyles = mapObjectRecursive(styles, mapNonMedia, { i });
            }
            else {
                mediaStyles[`@media ${mediaQuery}`] = mapObjectRecursive(styles, mapMediaStyles, { i });
            }
        }
        return { ...nonMediaStyles, ...mediaStyles };
    },
};
function mapDittoValues(key, value) {
    if (Array.isArray(value)) {
        for (const i in value) {
            const v = value[i];
            if (v === '@')
                value[i] = value[+i - 1];
        }
        return { [key]: value };
    }
}
function mapNonMedia(key, value, object, context) {
    if (Array.isArray(value)) {
        return { [key]: value[context.i] };
    }
}
function mapMediaStyles(key, value, object, context) {
    if (typeof key === 'number')
        return; // Not possible, but here for TS
    if (key.startsWith('@keyframes'))
        context.keyframes = true;
    if (Array.isArray(value)) {
        return { [key]: value[context.i] };
    }
    if (isPlainObject(value) || context.keyframes) {
        return;
    }
    // delete key/value pair if primitive
    return { [key]: undefined };
}

/**
 * Flatten an array recursively.
 */
function flatten(array) {
    const result = [];
    _flatten(array, result);
    return result;
}
function _flatten(array, result) {
    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        Array.isArray(value) ? _flatten(value, result) : result.push(value);
    }
}

/**
 * Merges $css property into parent styles
 */
const merge$css = {
    name: 'merge$css',
    type: 'processStyles',
    plugin(ctx, styles) {
        const result = {};
        _merge$css(styles, result);
        return result;
    },
};
function _merge$css(obj, ctx) {
    if (!isPlainObject(obj))
        return;
    for (const key in obj) {
        if (key === '$css') {
            const $css = obj[key];
            if (Array.isArray($css)) {
                const flat$css = flatten($css);
                for (const val of flat$css) {
                    _merge$css(val, ctx);
                }
            }
            else {
                _merge$css($css, ctx);
            }
        }
        else {
            let value = obj[key];
            if (isPlainObject(value)) {
                value = ctx[key] || {};
                _merge$css(obj[key], value);
            }
            ctx[key] = value;
        }
    }
}

/**
 * Fixes casing and hyphenation on known style props
 */
const propCasing = {
    name: 'propCasing',
    type: 'processStyles',
    plugin(ctx, styles) {
        return mapObjectRecursive(styles, propCasingMap, { ctx });
    },
};
function propCasingMap(key, value, object, context) {
    if (typeof key !== 'string' || key === '&')
        return;
    const simpleKey = simplifyStylePropName(key);
    if (simpleKey && simpleKey in context.ctx.styleProps) {
        return { [context.ctx.styleProps[simpleKey]]: value };
    }
}

/**
 * Replaces $$class with hash in string values
 */
const replace$$class = {
    name: 'replace$$class',
    type: 'processStyles',
    plugin(ctx, styles) {
        return mapObjectRecursive(styles, replace$$classMap, { ctx });
    },
};
function replace$$classMap(key, value, object, context) {
    value = typeof value === 'string' ? value.replace('$$class', context.ctx.hash) : value;
    key = typeof key === 'string' ? key.replace('$$class', context.ctx.hash) : key;
    return { [key]: value };
}

/**
 * Deeply clones a value.
 */
function cloneDeep(value) {
    if (!value || typeof value !== 'object')
        return value;
    if (Array.isArray(value)) {
        const clone = [];
        for (let index = 0; index < value.length; ++index) {
            clone.push(cloneDeep(value[index]));
        }
        return clone;
    }
    if (isPlainObject(value)) {
        const clone = {};
        for (const key in value) {
            clone[key] = cloneDeep(value[key]);
        }
        return clone;
    }
    return value;
}

/**
 * Invokes a callback for each key/value pair in `object`, and continues recursively on each value that is an array or a
 * plain object. Returns `object`.
 * The `cb` function will receive the key, the value, the current object being mapped, and a context object.
 * The context object is a plain object that you can modify as needed. The value will persist to subsequent calls to
 * `map` on child properties of `value`.
 */
function walkRecursive(object, cb, context) {
    const keys = Object.keys(object);
    for (const key of keys) {
        const value = object[key];
        cb(key, value, object, context);
        if (Array.isArray(value) || isPlainObject(value)) {
            const contextClone = cloneDeep(context);
            walkRecursive(value, cb, contextClone);
        }
    }
    return object;
}

const customProps = (customProps) => {
    for (const key in customProps) {
        customProps[simplifyStylePropName(key)] = customProps[key];
    }
    return [
        {
            name: 'customPropsInit',
            type: 'initialize',
            plugin(ctx) {
                for (const key in customProps) {
                    ctx.styleProps[simplifyStylePropName(key)] = key;
                }
            },
        },
        {
            name: 'customPropsProcess',
            type: 'processStyles',
            before: mediaArrays,
            plugin(ctx, styles) {
                return walkRecursive(styles, (key, value, object) => {
                    if (!isValidJSXProp(key) || isPlainObject(value))
                        return;
                    const simpleKey = simplifyStylePropName(key);
                    const propValue = customProps[simpleKey];
                    if (!propValue)
                        return;
                    const objectClone = { ...object };
                    const keys = Object.keys(object);
                    const afterKeys = keys.slice(keys.indexOf(key) + 1);
                    const newStyles = {};
                    if (typeof propValue === 'object') {
                        if (value)
                            Object.assign(newStyles, propValue);
                    }
                    else if (typeof propValue === 'string') {
                        newStyles[propValue] = value;
                    }
                    else if (typeof propValue === 'function') {
                        Object.assign(newStyles, propValue(value));
                    }
                    delete object[key];
                    Object.assign(object, newStyles);
                    for (const k of afterKeys) {
                        const val = objectClone[k];
                        delete object[k];
                        object[k] = val;
                    }
                });
            },
        },
    ];
};

function applyPlugins(type, styles, hash, context) {
    const pluginContext = {
        id: context.id,
        devMode: context.devMode,
        media: context.media,
        stylesheet: context.stylesheet,
        styleElement: context.styleElement,
        styleProps: context.styleProps,
        hash,
    };
    let processedStyles = styles;
    for (const i in context.plugins) {
        const plugin = context.plugins[i];
        if (plugin.type === type)
            processedStyles = plugin.plugin(pluginContext, processedStyles);
    }
    return processedStyles;
}
const defaultPlugins = {
    merge$css,
    mediaArrays,
    propCasing,
    flattenNestedStyles,
    replace$$class,
    defaultPixelUnits,
    cleanStyles,
};

function flattenRules(ctx) {
    return Object.values(ctx.rules).flatMap((val) => val.rules);
}
/**
 * Applies rules from given StylixContext to the <style> element.
 */
function applyRules(ctx) {
    if (ctx.styleCollector) {
        const flattenedRules = flattenRules(ctx);
        ctx.styleCollector.length = 0;
        ctx.styleCollector.push(...flattenedRules);
        return;
    }
    if (ctx.ssr)
        return;
    const supportsAdoptedStylesheets = 'adoptedStyleSheets' in document;
    // If there's no style element, and we're in dev mode or legacy browser, create one
    if (!ctx.styleElement && (ctx.devMode || !supportsAdoptedStylesheets)) {
        ctx.styleElement = document.createElement('style');
        ctx.styleElement.className = 'stylix';
        if (ctx.id)
            ctx.styleElement.id = 'stylix-' + ctx.id;
        document.head.appendChild(ctx.styleElement);
    }
    // If there's a style element, use its stylesheet
    if (ctx.styleElement)
        ctx.stylesheet = ctx.styleElement.sheet;
    // No stylesheet yet, create one
    if (!ctx.stylesheet) {
        ctx.stylesheet = new CSSStyleSheet();
        document.adoptedStyleSheets.push(ctx.stylesheet);
    }
    if (ctx.devMode && ctx.styleElement) {
        const flattenedRules = flattenRules(ctx);
        ctx.styleElement.innerHTML = flattenedRules.join('\n');
    }
    else {
        const stylesheet = ctx.stylesheet;
        if (!stylesheet)
            return;
        const flattenedRules = flattenRules(ctx);
        if (stylesheet.replaceSync) {
            try {
                stylesheet.replaceSync(flattenedRules.join('\n'));
            }
            catch (e) {
                // Errors are ignored, this just means that a browser doesn't support a certain CSS feature.
                console.warn(e);
            }
        }
        else {
            // Legacy method
            while (stylesheet.rules?.length || stylesheet.cssRules?.length) {
                stylesheet.deleteRule(0);
            }
            for (const i in flattenedRules)
                try {
                    stylesheet.insertRule(flattenedRules[i], +i);
                }
                catch (e) {
                    // Errors are ignored, this just means that a browser doesn't support a certain CSS feature.
                    console.warn(e);
                }
        }
    }
}

function StyleElement(props) {
    const { styles, ...other } = props;
    return (React.createElement("style", { type: "text/css", ...other, dangerouslySetInnerHTML: { __html: styles.join('\n') } }));
}
function RenderServerStyles(props) {
    const ctx = useStylixContext();
    return React.createElement(StyleElement, { styles: ctx.ssr ? flattenRules(ctx) : [], ...props });
}

const styleCollectorContext = createContext(undefined);
function createStyleCollector() {
    const styles = [];
    const collector = {
        collect: (element) => (React.createElement(styleCollectorContext.Provider, { value: styles }, element)),
        render: (props) => (React.createElement(StyleElement, { key: props.id || 'stylix', styles: collector.styles })),
        styles,
    };
    collector.render.displayName = 'StylixStyleCollectorRenderer';
    return collector;
}
// Collect your styles:
// const styles = [];
// ReactDOM.renderToString(
//   <StylixSSR.StyleCollector styles={styles}>
//     <App />
//   </StylixSSR.StyleCollector>
// );
//
// // Then render your styles:
// <RenderServerStyles styles={styles} />

const detectSSR = () => !(typeof window !== 'undefined' && window.document?.head?.appendChild);
function useIsoLayoutEffect(fn, deps, runOnSsr, isSsr = detectSSR()) {
    if (isSsr) {
        if (runOnSsr)
            return fn();
    }
    else {
        useLayoutEffect(fn, deps);
    }
}

const defaultStyleProps = {};
for (const value of cssProps) {
    defaultStyleProps[simplifyStylePropName(value)] = value;
}
function createStylixContext(userValues = {}) {
    const ctx = {
        id: userValues.id || Math.round(Math.random() * 10000).toString(10),
        devMode: !!userValues.devMode,
        styleProps: defaultStyleProps,
        media: userValues.media,
        styleElement: userValues.styleElement,
        plugins: flatten(Object.values(defaultPlugins)),
        rules: {},
        ssr: userValues.ssr ?? detectSSR(),
        cleanupRequest: undefined,
        requestApply: false,
    };
    if (userValues.plugins?.length) {
        const flatPlugins = flatten(userValues.plugins);
        for (const i in flatPlugins) {
            const plugin = flatPlugins[i];
            let pluginIndex = -1;
            if (plugin.before && ctx.plugins.includes(plugin.before))
                pluginIndex = ctx.plugins.indexOf(plugin.before);
            if (plugin.after && ctx.plugins.includes(plugin.after))
                pluginIndex = ctx.plugins.indexOf(plugin.after) + 1;
            if (plugin.atIndex !== undefined)
                pluginIndex = plugin.atIndex;
            if (pluginIndex === -1)
                ctx.plugins.push(plugin);
            else
                ctx.plugins.splice(pluginIndex, 0, plugin);
        }
    }
    applyPlugins('initialize', null, null, ctx);
    return ctx;
}
// The React context object
const stylixContext = createContext(undefined);
let defaultStylixContext = undefined;
// Convenience wrapper hook that returns the current Stylix context
function useStylixContext() {
    const ctx = useContext(stylixContext);
    if (!ctx) {
        if (!defaultStylixContext)
            defaultStylixContext = createStylixContext();
        return defaultStylixContext;
    }
    return ctx;
}
function StylixProvider({ id, devMode, plugins, styleElement, children, ssr, }) {
    const ctx = useRef();
    if (!ctx.current)
        ctx.current = createStylixContext({ id, devMode, plugins, styleElement, ssr });
    ctx.current.styleCollector = useContext(styleCollectorContext);
    return React.createElement(stylixContext.Provider, { value: ctx.current }, children);
}

function getParentComponentName() {
    return React[
    // yeah whatever
    '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED']?.ReactDebugCurrentFrame?.getStackAddendum?.()
        ?.split('\n')
        ?.map((line) => {
        // Look for a component name like "Component$123", either at the start of the line (Firefox) or after "at " (Safari/Chrome)
        const m = line.match(/^([A-Z][A-Za-z0-9$]*)|^\s*at ([A-Z][A-Za-z0-9$]*)/);
        return m?.[1] || m?.[2];
    })
        .filter(Boolean)
        .reverse()
        .slice(-1)[0];
}

/**
 * Converts a Stylix CSS object to an array of rules, suitable for passing to StyleSheet#insertRule.
 */
function stylesToRuleArray(styles, hash, context) {
    if (!styles || !Object.keys(styles).length)
        return [];
    try {
        const processedStyles = applyPlugins('processStyles', styles, hash, context);
        // serialize to css rules array
        const serialize = function serialize(selector, styles) {
            const lines = [];
            for (const key in styles) {
                const value = styles[key];
                if (isPlainObject(value))
                    lines.push(serialize(key, value));
                else
                    lines.push(`  ${key}: ${value};`);
            }
            return `${selector} {\n${lines.join('\n')} }`;
        };
        const result = [];
        for (const key in processedStyles) {
            const value = processedStyles[key];
            result.push(serialize(key, value));
        }
        return result;
    }
    catch (e) {
        if (e.name && e.reason) {
            console.error(`${e.name}: ${e.reason}\n`, e.source.replace('\n', ' ').substr(Math.max(0, e.column - 20), 100) + '\n', ' '.repeat(20) + '^');
        }
        else {
            console.error(e);
        }
        return [];
    }
}

/**
 * Cheap string hashing, suitable for generating css class names
 */
function hashString(str) {
    let hash = 5381;
    let i = str.length;
    while (i-- > 0)
        hash = (hash * 33) ^ str.charCodeAt(i);
    return 'stylix-' + (hash >>> 0).toString(36);
}

function cleanup(ctx) {
    if (typeof ctx.cleanupRequest !== 'undefined')
        return;
    ctx.cleanupRequest = setTimeout(() => {
        let deleted = false;
        for (const i in ctx.rules) {
            const rule = ctx.rules[i];
            if (!rule.refs) {
                delete ctx.rules[rule.hash];
                deleted = true;
            }
        }
        deleted && applyRules(ctx);
        delete ctx.cleanupRequest;
    }, 100);
}
function compare(a, b) {
    if (a === b)
        return true;
    if (typeof a !== typeof b)
        return false;
    if (typeof a === 'object') {
        if (Array.isArray(a) && Array.isArray(b) && a.length !== b.length)
            return false;
        else if (Object.keys(a).length !== Object.keys(b).length)
            return false;
        for (const key in b) {
            if (!compare(a[key], b[key]))
                return false;
        }
    }
    return a === b;
}
/**
 * Accepts a Stylix CSS object and returns a unique className based on the styles' hash.
 * The styles are registered with the Stylix context and will be applied to the document.
 * If `global` is false, provided styles will be nested within the generated classname.
 * Returns the className hash if enabled, or an empty string.
 */
function useStyles(styles, options = {
    global: false,
    disabled: false,
}) {
    const stylixCtx = useStylixContext();
    const prevRef = useRef({ styles: {}, hash: '' });
    const changed = !compare(styles, prevRef.current.styles);
    options.debugLabel ||= !!stylixCtx.devMode && getParentComponentName();
    prevRef.current.styles = styles;
    if (changed) {
        // Preprocess styles with plugins
        if (!options.disabled && styles && Object.keys(styles).length)
            styles = applyPlugins('preprocessStyles', styles, null, stylixCtx);
        // Serialize value and generate hash
        const json = !options.disabled && styles && JSON.stringify(styles);
        prevRef.current.hash =
            json && json !== '{}' && json !== '[]'
                ? hashString(JSON.stringify(stylixCtx.media || []) + json) +
                    (options.debugLabel ? '-' + options.debugLabel : '')
                : '';
    }
    const { hash } = prevRef.current;
    if (hash && changed && !stylixCtx.rules[hash]) {
        // If not global styles, wrap original styles with classname
        if (!options.global)
            styles = { ['.' + hash]: styles };
        if (styles)
            stylixCtx.rules[hash] = {
                hash,
                rules: stylesToRuleArray(styles, hash, stylixCtx),
                refs: 1,
            };
        stylixCtx.requestApply = true;
    }
    // Apply styles if requested.
    // This runs on every render. We utilize useLayoutEffect so that it runs *after* all the other
    // renders have completed. stylixCtx.requestApply guards against multiple runs. This reduces the number of calls
    // to applyRules(), but prevents styles potentially being added to the DOM after other components force the
    // browser to compute styles.
    useIsoLayoutEffect(() => {
        if (!stylixCtx.requestApply)
            return;
        stylixCtx.requestApply = false;
        applyRules(stylixCtx);
    }, undefined, true, stylixCtx.ssr);
    // When hash changes, add/remove ref count
    useIsoLayoutEffect(() => {
        if (!hash || !changed)
            return;
        if (stylixCtx.rules[hash]) {
            stylixCtx.rules[hash].refs++;
        }
        return () => {
            stylixCtx.rules[hash].refs--;
            cleanup(stylixCtx);
        };
    }, [hash], false, stylixCtx.ssr);
    return hash;
}
function useKeyframes(keyframes, options = { disabled: false }) {
    return useStyles({ '@keyframes $$class': keyframes }, { global: true, ...options });
}
function useGlobalStyles(styles, options = { disabled: false }) {
    return useStyles(styles, { ...options, global: true });
}

function _Stylix(props, ref) {
    const { $el, $css, $disabled, className, children, ...rest } = props;
    const ctx = useStylixContext();
    const [styleProps, otherProps] = classifyProps(rest, ctx.styleProps);
    if ($css)
        styleProps.$css = $css;
    const hash = useStyles(styleProps, { disabled: $disabled });
    const allProps = {
        className: `${hash} ${className || ''}`.trim(),
        ref: ref,
        ...otherProps, // All other non-style props passed to <$> element
    };
    if (React.isValidElement($el)) {
        const $elProps = {
            ...$el.props,
            /**
             * `allProps` must override `$el.props` because the latter may contain default prop values provided by defaultProps.
             * The expectation is that for <$ $el={<SomeComponent />} someComponentProp="my value" />,
             * the `someComponentProp` prop would override any default value specified by SomeComponent.defaultProps.
             */
            ...allProps,
            className: (($el.props.className || '') + ' ' + allProps.className).trim(),
        };
        return React.cloneElement($el, $elProps, ...(React.Children.toArray(children) || []));
    }
    return React.createElement($el, { ...allProps }, children);
}
const Stylix = React.forwardRef(_Stylix);
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;

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
function styled(component, 
/**
 * A style object to apply to the component.
 */
styleProps, 
/**
 * A map of new props to accept and the associated prop name to pass to the original component.
 */
propMap) {
    const Element = typeof component === 'string' // HTML element
        ? component
        : typeof component === 'function' && !('$$typeof' in component) && component.length === 2 // React function component with ref parameter
            ? React.forwardRef(component)
            : component; // React function component
    const r = React.forwardRef((props, ref) => {
        props = { ...props }; // copy props so we can delete props that are consumed by Stylix
        const $elProps = {};
        if (propMap) {
            for (const incomingProp in propMap) {
                const outgoingProp = propMap[incomingProp];
                $elProps[outgoingProp] = props[incomingProp];
                delete props[incomingProp];
            }
        }
        return _Stylix({
            $el: React.createElement(Element, { ...$elProps }),
            ...props,
        }, ref);
    });
    r.displayName = `$.${component.displayName ||
        component.name ||
        component.toString?.() ||
        'Unnamed'}`;
    r.__isStylix = true;
    return r;
}

var htmlTags = [
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'bdi',
    'bdo',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'main',
    'map',
    'mark',
    'menu',
    'menuitem',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'picture',
    'pre',
    'progress',
    'q',
    'rt',
    'ruby',
    's',
    'samp',
    'section',
    'select',
    'slot',
    'small',
    'source',
    'span',
    'strong',
    'sub',
    'summary',
    'sup',
    'svg',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'tr',
    'track',
    'u',
    'ul',
    'var',
    'video',
];

for (const i in htmlTags) {
    // Types are specified in ./types.ts, so we don't care what they type of htmlTags[i] is.
    // JSX.IntrinsicElements is a union of all HTML tags, so it is too complex for TypeScript to infer.
    const tag = htmlTags[i];
    Stylix[tag] = styled(tag, undefined, {
        htmlContent: 'content',
        htmlTranslate: 'translate',
    });
}

export { RenderServerStyles, StyleElement, StylixProvider, classifyProps, createStyleCollector, customProps, Stylix as default, defaultPlugins, mapObjectRecursive, styleCollectorContext, styled, useClassifyProps, useGlobalStyles, useKeyframes, useStyles, useStylixContext, walkRecursive };
//# sourceMappingURL=index.js.map
