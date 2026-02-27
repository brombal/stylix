import { jsx } from 'react/jsx-runtime';
import React, { createContext, useRef, useInsertionEffect, useContext, useEffect } from 'react';

function flattenRules(ctx) {
    return Object.values(ctx.rules)
        .flatMap((val) => (val && val.refs > 0 ? val.rules : []))
        .filter(Boolean);
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
    // If there's no style element, and we're in dev mode, create one
    if (!ctx.styleElement && (ctx.devMode || !supportsAdoptedStylesheets)) {
        ctx.styleElement = document.createElement('style');
        ctx.styleElement.className = 'stylix';
        if (ctx.id)
            ctx.styleElement.id = `stylix-${ctx.id}`;
        document.head.appendChild(ctx.styleElement);
    }
    if (ctx.styleElement) {
        // If there's a style element, use it
        const flattenedRules = flattenRules(ctx);
        ctx.styleElement.innerHTML = flattenedRules.join('\n');
    }
    else {
        // Still no stylesheet yet, create one
        if (!ctx.stylesheet) {
            ctx.stylesheet = new CSSStyleSheet();
            if (supportsAdoptedStylesheets) {
                document.adoptedStyleSheets.push(ctx.stylesheet);
            }
            else if (ctx.stylesheet.ownerNode) {
                document.head.appendChild(ctx.stylesheet.ownerNode);
            }
        }
        const stylesheet = ctx.stylesheet;
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
    }
}

function classifyProps(props, knownStyleProps) {
    const styles = {};
    const other = {};
    for (const prop in props) {
        // If prop is not a valid JSX prop, it must be a CSS selector.
        // If prop has a style prop name and the value is likely a style value, it's a style prop.
        if (!isValidJSXProp(prop) || isStyleProp(prop, knownStyleProps)) {
            styles[prop] = props[prop];
        }
        else {
            other[prop] = props[prop];
        }
    }
    return [styles, other];
}
/**
 * Determines if `value` is a recognized CSS property (can be standard CSS or custom Stylix prop).
 * If it is, the simplified prop name is returned. Otherwise, false is returned.
 */
function isStyleProp(prop, knownStyleProps) {
    if (isValidJSXProp(prop)) {
        const simplified = simplifyStylePropName(prop);
        return simplified in knownStyleProps ? simplified : false;
    }
    return false;
}
function isValidJSXProp(value) {
    // Not an exact check, but mostly rules out complex css selectors
    return typeof value === 'string' && /^[a-z$][a-z0-9_-]*$/i.test(value);
}
function simplifyStylePropName(value) {
    return value.toLowerCase().replace(/[^a-z]/g, '');
}

var cssProps = [
	"-webkit-line-clamp",
	"-webkit-text-fill-color",
	"-webkit-text-stroke",
	"-webkit-text-stroke-color",
	"-webkit-text-stroke-width",
	"accent-color",
	"align-content",
	"align-items",
	"align-self",
	"align-tracks",
	"all",
	"anchor-name",
	"anchor-scope",
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
	"animation-timeline",
	"animation-timing-function",
	"appearance",
	"aspect-ratio",
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
	"block-size",
	"border",
	"border-block",
	"border-block-color",
	"border-block-end",
	"border-block-end-color",
	"border-block-end-style",
	"border-block-end-width",
	"border-block-start",
	"border-block-start-color",
	"border-block-start-style",
	"border-block-start-width",
	"border-block-style",
	"border-block-width",
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
	"border-inline-color",
	"border-inline-end",
	"border-inline-end-color",
	"border-inline-end-style",
	"border-inline-end-width",
	"border-inline-start",
	"border-inline-start-color",
	"border-inline-start-style",
	"border-inline-start-width",
	"border-inline-style",
	"border-inline-width",
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
	"contain-intrinsic-block-size",
	"contain-intrinsic-height",
	"contain-intrinsic-inline-size",
	"contain-intrinsic-size",
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
	"field-sizing",
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
	"font-size",
	"font-size-adjust",
	"font-stretch",
	"font-style",
	"font-synthesis",
	"font-synthesis-position",
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
	"font-variation-settings",
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
	"interpolate-size",
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
	"overlay",
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
	"position-anchor",
	"position-area",
	"position-try",
	"position-try-fallbacks",
	"position-try-order",
	"position-visibility",
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
	"scroll-behavior",
	"scroll-margin",
	"scroll-margin-block",
	"scroll-margin-block-end",
	"scroll-margin-block-start",
	"scroll-margin-bottom",
	"scroll-margin-inline",
	"scroll-margin-inline-end",
	"scroll-margin-inline-start",
	"scroll-margin-left",
	"scroll-margin-right",
	"scroll-margin-top",
	"scroll-padding",
	"scroll-padding-block",
	"scroll-padding-block-end",
	"scroll-padding-block-start",
	"scroll-padding-bottom",
	"scroll-padding-inline",
	"scroll-padding-inline-end",
	"scroll-padding-inline-start",
	"scroll-padding-left",
	"scroll-padding-right",
	"scroll-padding-top",
	"scroll-snap-align",
	"scroll-snap-stop",
	"scroll-snap-type",
	"scroll-timeline",
	"scroll-timeline-axis",
	"scroll-timeline-name",
	"scrollbar-color",
	"scrollbar-gutter",
	"scrollbar-width",
	"shape-image-threshold",
	"shape-margin",
	"shape-outside",
	"stroke",
	"tab-size",
	"table-layout",
	"text-align",
	"text-align-last",
	"text-box",
	"text-box-edge",
	"text-box-trim",
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
	"text-spacing-trim",
	"text-transform",
	"text-underline-offset",
	"text-underline-position",
	"text-wrap",
	"text-wrap-mode",
	"text-wrap-style",
	"timeline-scope",
	"top",
	"touch-action",
	"transform",
	"transform-box",
	"transform-origin",
	"transform-style",
	"transition",
	"transition-behavior",
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
	"widows",
	"width",
	"will-change",
	"word-break",
	"word-spacing",
	"word-wrap",
	"writing-mode",
	"z-index",
	"zoom"
];

function isEmpty(obj) {
    if (!obj)
        return true;
    if (Array.isArray(obj))
        return obj.length === 0;
    for (const _ in obj)
        return false;
    if (typeof obj === 'object')
        return true;
    return false;
}

/**
 * Indicates that an object is most likely just an object literal.
 */
function isPlainObject(value) {
    if (!value || typeof value !== 'object')
        return false;
    return Object.getPrototypeOf(value) === Object.prototype;
}

function _cleanStyles(object) {
    for (const key in object) {
        const value = object[key];
        if (value === null || value === undefined || value === '' || value === false)
            delete object[key];
        else if (isPlainObject(value) || Array.isArray(value)) {
            _cleanStyles(value);
            if (isEmpty(value))
                delete object[key];
        }
    }
}
/**
 * Removes null, undefined, and empty string values from style objects.
 */
const cleanStyles = {
    name: 'cleanStyles',
    type: 'processStyles',
    plugin(_ctx, styles) {
        _cleanStyles(styles);
        return styles;
    },
};

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
function mapObject(source, mapFn, context) {
    if (typeof source !== 'object')
        return source;
    const target = (Array.isArray(source) ? [] : {});
    for (const _key in source) {
        const key = Array.isArray(source) ? +_key : _key;
        const value = source[key];
        const contextClone = { ...context };
        mapFn(key, value, target, contextClone, (value) => mapObject(value, mapFn, contextClone));
    }
    return target;
}

const defaultIgnoreUnits = [
    'aspect-ratio',
    'column-count',
    'columns',
    'fill-opacity',
    'flex',
    'flex-grow',
    'flex-shrink',
    'font-weight',
    'line-height',
    'opacity',
    'order',
    'orphans',
    'stroke-opacity',
    'widows',
    'z-index',
    'zoom',
];
/**
 * Adds unit (px, em, etc) to numeric values for any style properties not included in `ignoreProps`.
 */
const defaultUnits = (unit = 'px', ignoreProps = defaultIgnoreUnits) => {
    return {
        name: 'defaultUnits',
        type: 'processStyles',
        plugin(_ctx, styles) {
            return mapObject(styles, defaultUnitsMap, { unit, ignoreProps });
        },
    };
};
const defaultUnitsMap = (key, value, target, ctx, mapRecursive) => {
    if (typeof value === 'number' && !ctx.ignoreProps.includes(key)) {
        target[key] = String(value) + ctx.unit;
        return;
    }
    target[key] = mapRecursive(value);
};
const defaultPixelUnits = defaultUnits();

function _hoistKeyframes(styles, root) {
    for (const key in styles) {
        const value = styles[key];
        if (key.startsWith('@keyframes')) {
            // Add keyframe rules as-is directly to root object
            root[key] = value;
            if (styles !== root)
                delete styles[key];
        }
        else if (isPlainObject(value)) {
            // Recursively flatten nested styles
            _hoistKeyframes(value, root);
        }
    }
    return styles;
}
/**
 * Hoists @keyframe declarations to root of styles object.
 */
const hoistKeyframes = {
    name: 'hoistKeyframes',
    type: 'processStyles',
    plugin(_ctx, styles) {
        return _hoistKeyframes(styles, styles);
    },
};

function _hoistLayers(styles, root) {
    for (const key in styles) {
        const value = styles[key];
        if (typeof value === 'string' && key.startsWith('@layer')) {
            // Add layer rules as-is directly to root object
            root['@layer'] ||= [];
            root['@layer'].push(value.replace('@layer', '').trim());
            if (styles !== root)
                delete styles[key];
        }
        else if (isPlainObject(value)) {
            // Recursively flatten nested styles
            _hoistLayers(value, root);
        }
    }
    return styles;
}
/**
 * Hoists @layer declarations to root of styles object.
 */
const hoistLayers = {
    name: 'hoistLayers',
    type: 'processStyles',
    plugin(_ctx, styles) {
        if (styles && typeof styles === 'object' && !Array.isArray(styles))
            styles['@layer'] = [];
        return _hoistLayers(styles, styles);
    },
};

/**
 * Expands media objects using the media definitions from the Stylix context.
 */
const mediaObjects = {
    name: 'mediaObjects',
    type: 'processStyles',
    plugin: mediaObjectsPlugin,
};
function mediaObjectsPlugin(ctx, styles) {
    if (!ctx.media)
        return styles;
    return processMediaStyles(ctx.media, ctx.styleProps, styles);
}
function processMediaStyles(mediaDef, styleProps, styles) {
    if (!styles || typeof styles !== 'object')
        return styles;
    // If styles is an array, just recursively map it
    if (Array.isArray(styles)) {
        return styles.map((style) => processMediaStyles(mediaDef, styleProps, style));
    }
    mediaDef.default ||= (styles) => styles;
    const result = { default: [] };
    for (const styleKey in styles) {
        const styleValue = styles[styleKey];
        if (isStyleProp(styleKey, styleProps)) {
            if (typeof styleValue !== 'object') {
                // Regular style prop
                result.default.push({ [styleKey]: styleValue });
                continue;
            }
            // An object for a style prop is definitely a media object
            for (const mediaKey in styleValue) {
                result[mediaKey] ||= [];
                // mediaKey corresponds to a media definition
                if (mediaKey in mediaDef) {
                    result[mediaKey].push(mediaDef[mediaKey]({
                        // process recursively
                        [styleKey]: processMediaStyles(mediaDef, styleProps, styleValue[mediaKey]),
                    }));
                }
                // mediaKey does not correspond to a media definition, it must be a @media or @container rule
                else {
                    result[mediaKey].push({
                        [mediaKey]: {
                            [styleKey]: processMediaStyles(mediaDef, styleProps, styleValue[mediaKey]),
                        },
                    });
                }
            }
            continue;
        }
        if (styleKey in mediaDef) {
            result[styleKey] ||= [];
            result[styleKey].push(mediaDef[styleKey](
            // process recursively
            processMediaStyles(mediaDef, styleProps, styleValue)));
            continue;
        }
        // Key is a selector, just process recursively and add to plain styles
        result.default.push({ [styleKey]: processMediaStyles(mediaDef, styleProps, styleValue) });
    }
    const results = Object.values(result);
    return results.length === 1 ? results[0] : results.length === 0 ? null : results;
}

/**
 * Merges arrays into flat objects, recursively throughout the styles object.
 */
const mergeArrays = {
    name: 'mergeArrays',
    type: 'processStyles',
    plugin: (_ctx, styles) => reduceArrays(styles),
};
function reduceArrays(obj) {
    return _reduceArrays(obj);
}
function _reduceArrays(obj, target = {}) {
    if (!obj || typeof obj !== 'object')
        return obj;
    if (Array.isArray(obj)) {
        for (const item of obj) {
            if (!item || typeof item !== 'object')
                continue;
            _reduceArrays(item, target);
        }
        return target;
    }
    for (const key in obj) {
        const value = obj[key];
        // If target[key] is an object
        if (target[key] && typeof target[key] === 'object') {
            // If value is an object, merge them
            if (value && typeof value === 'object') {
                _reduceArrays(value, target[key]);
            }
            // If value is not undefined, replace target[key]
            else if (value !== undefined) {
                target[key] = value;
            }
            // otherwise do nothing, keep target[key] as is
        }
        // If target[key] is not an object, process normally
        else {
            target[key] = _reduceArrays(value, {});
        }
    }
    return target;
}

/**
 * Removes null, undefined, and empty string values from style objects.
 */
const prepareStyles = {
    name: 'prepareStyles',
    type: 'preprocessStyles',
    plugin(_ctx, styles) {
        while (Array.isArray(styles) && styles.length === 1)
            styles = styles[0];
        if (Array.isArray(styles) && !styles.length)
            return null;
        if (isPlainObject(styles) && Object.values(styles).every((v) => v === undefined))
            return null;
        return styles;
    },
};

/**
 * Fixes casing and hyphenation on known style props
 */
const propCasing = {
    name: 'propCasing',
    type: 'processStyles',
    plugin(ctx, styles) {
        return mapObject(styles, propCasingMap, { ctx });
    },
};
const propCasingMap = (key, value, target, context, mapRecursive) => {
    if (typeof key !== 'string' || key === '&') {
        target[key] = mapRecursive(value);
        return;
    }
    const simpleKey = isStyleProp(key, context.ctx.styleProps);
    if (simpleKey) {
        target[context.ctx.styleProps[simpleKey]] = mapRecursive(value);
        return;
    }
    target[key] = mapRecursive(value);
};

/**
 * Replaces $$class with class name in string values
 */
const replace$$class = {
    name: 'replace$$class',
    type: 'processStyles',
    plugin(ctx, styles) {
        return mapObject(styles, replace$$classMap, { ctx });
    },
};
const replace$$classMap = (key, value, target, context, mapRecursive) => {
    value =
        typeof value === 'string'
            ? value.replaceAll('$$class', context.ctx.className || '')
            : mapRecursive(value);
    key = typeof key === 'string' ? key.replaceAll('$$class', context.ctx.className || '') : key;
    target[key] = value;
};

function _customPropsProcess(styles, customProps) {
    if (typeof styles !== 'object' || styles === null)
        return styles;
    return mapObject(styles, (key, value, target, _ctx, mapRecursive) => {
        if (!isValidJSXProp(key) || isPlainObject(value)) {
            target[key] = mapRecursive(value);
            return;
        }
        const simpleKey = simplifyStylePropName(key);
        const propValue = customProps[simpleKey];
        if (propValue && typeof propValue === 'object') {
            // For object, merge the mapped value into target if original prop value is truthy
            if (value) {
                const mappedValue = mapRecursive(propValue);
                Object.assign(target, mappedValue);
            }
        }
        else if (typeof propValue === 'string') {
            // For string, just remap the prop name
            target[propValue] = mapRecursive(value);
        }
        else if (typeof propValue === 'function') {
            // For function, call it with the original value and merge the result
            const mappedValue = mapRecursive(propValue(value));
            Object.assign(target, mappedValue);
        }
        else {
            // Unknown type, just keep original
            target[key] = mapRecursive(value);
        }
    });
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
            before: 'mergeArrays',
            plugin(_ctx, styles) {
                return _customPropsProcess(styles, customProps);
            },
        },
    ];
};

function applyPlugins(type, styles, className, context) {
    const pluginContext = {
        id: context.id,
        devMode: context.devMode,
        media: context.media,
        stylesheet: context.stylesheet,
        styleElement: context.styleElement,
        styleProps: context.styleProps,
        className,
    };
    let processedStyles = styles || {};
    for (const i in context.plugins) {
        const plugin = context.plugins[i];
        if (plugin.type === type)
            processedStyles = plugin.plugin(pluginContext, processedStyles);
    }
    return processedStyles;
}
const defaultPlugins = [
    prepareStyles,
    mediaObjects,
    mergeArrays,
    propCasing,
    hoistKeyframes,
    hoistLayers,
    replace$$class,
    defaultPixelUnits,
    cleanStyles,
];

function StyleElement(props) {
    const { styles, ...other } = props;
    return (jsx("style", { type: "text/css", ...other, dangerouslySetInnerHTML: { __html: styles.join('\n') } }));
}

const styleCollectorContext = createContext(undefined);
function createStyleCollector() {
    const styles = [];
    const collector = {
        collect: (element) => (jsx(styleCollectorContext.Provider, { value: styles, children: element })),
        render: (props) => (jsx(StyleElement, { styles: collector.styles }, props.id || 'stylix')),
        styles,
    };
    collector.render.displayName = 'StylixStyleCollectorRenderer';
    return collector;
}

function getParentComponentName() {
    const internals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    const stack = internals?.ReactDebugCurrentFrame?.getStackAddendum?.()?.split('\n') || [];
    for (const line of stack) {
        // Look for a component name like "Component$123", either at the start of the line (Firefox) or after "at " (Safari/Chrome)
        const m = line.trim().match(/^(?:at )?([A-Z][A-Za-z0-9$.]*)/);
        const res = m?.[1] && m[1] !== 'Stylix' ? m[1] : undefined;
        if (res)
            return res;
    }
}

/**
 * Serialize selector and styles to css rule string
 */
function serialize(selector, styles) {
    if (selector.startsWith('@') && Array.isArray(styles)) {
        return `${selector} ${styles.join(', ')};`;
    }
    const lines = [];
    for (const key in styles) {
        const value = styles[key];
        if (isPlainObject(value))
            lines.push(serialize(key, value));
        else
            lines.push(`  ${key}: ${value};`);
    }
    return `${selector} {\n${lines.join('\n')} }`;
}
/**
 * Converts a Stylix CSS object to an array of rules, suitable for passing to StyleSheet#insertRule.
 */
function stylesToRuleArray(styles, className, context) {
    if (isEmpty(styles))
        return [];
    try {
        const processedStyles = applyPlugins('processStyles', styles, className, context);
        const result = [];
        // Handle @layer rules first
        if (processedStyles['@layer']) {
            result.push(serialize('@layer', processedStyles['@layer']));
            delete processedStyles['@layer'];
        }
        for (const key in processedStyles) {
            const value = processedStyles[key];
            result.push(serialize(key, value));
        }
        return result;
    }
    catch (e) {
        if (e.name && e.reason) {
            console.error(`${e.name}: ${e.reason}\n`, `${e.source.replace('\n', ' ').substring(Math.max(0, e.column - 20), Math.max(0, e.column - 20) + 100)}\n`, `${' '.repeat(20)}^`);
        }
        else {
            console.error(e);
        }
        return [];
    }
}

function cleanup(ctx) {
    if (typeof ctx.cleanupRequest !== 'undefined')
        return;
    const doCleanup = () => {
        for (const i in ctx.rules) {
            const rule = ctx.rules[i];
            if (!rule || rule.refs <= 0) {
                delete ctx.rules[i];
            }
        }
        ctx.cleanupRequest = undefined;
    };
    if (ctx.devMode) {
        doCleanup();
    }
    else {
        ctx.cleanupRequest = setTimeout(doCleanup, 100);
    }
}
function createStyles(config) {
    const { stylixCtx, global } = config;
    let styles = config.styles;
    const priorKey = config.key || '';
    let stylesKey = '';
    if (styles && !isEmpty(styles)) {
        // Preprocess styles with plugins
        styles = applyPlugins('preprocessStyles', styles, null, stylixCtx);
        // Generate styles key
        stylesKey = styles ? (global ? 'global:' : '') + JSON.stringify(styles) : '';
    }
    if (stylesKey && !stylixCtx.rules[stylesKey]) {
        stylixCtx.styleCounter++;
        const debugLabel = config.debugLabel || (stylixCtx.devMode && getParentComponentName()) || '';
        const className = `stylix-${(stylixCtx.styleCounter).toString(36)}${debugLabel ? `-${debugLabel}` : ''}`;
        // If not global styles, wrap original styles with classname
        if (!global)
            styles = { [`.${className}`]: styles };
        stylixCtx.rules[stylesKey] = {
            className,
            rules: stylesToRuleArray(styles, className, stylixCtx),
            refs: 0,
        };
    }
    const isChanged = stylesKey !== priorKey;
    const ruleSet = stylesKey ? stylixCtx.rules[stylesKey] : null;
    if (isChanged) {
        // Mark styles to be applied
        stylixCtx.requestApply = true;
        // When json changes, add/remove ref count
        const priorRuleSet = priorKey ? stylixCtx.rules[priorKey] : null;
        if (priorRuleSet)
            priorRuleSet.refs--;
        if (ruleSet)
            ruleSet.refs++;
    }
    return {
        className: ruleSet?.className || '',
        key: stylesKey,
    };
}
/**
 * Accepts a Stylix CSS object and returns a unique className.
 * The styles are registered with the Stylix context and will be applied to the document.
 * If `global` is false, provided styles will be nested within the generated classname.
 * Returns the className if enabled, or an empty string.
 */
function useStyles(styles, options = { global: false }) {
    const stylixCtx = useStylixContext();
    const prevStylesKey = useRef('');
    const s = createStyles({
        stylixCtx,
        styles,
        global: options.global,
        debugLabel: options.debugLabel,
        key: prevStylesKey.current,
    });
    prevStylesKey.current = s.key;
    // Apply styles if requested.
    // This runs on every render. We utilize useInsertionEffect so that it runs *after* all the other
    // renders have completed. stylixCtx.requestApply guards against multiple runs. This reduces the number of calls
    // to applyRules(), but prevents styles potentially being added to the DOM after other components force the
    // browser to compute styles.
    // biome-ignore lint/correctness/useExhaustiveDependencies: stylixCtx is stable
    useInsertionEffect(() => {
        if (!stylixCtx.requestApply)
            return;
        stylixCtx.requestApply = false;
        applyRules(stylixCtx);
        return () => {
            cleanup(stylixCtx);
        };
    }, [s.key]);
    return s.className;
}
function useKeyframes(keyframes) {
    return useStyles({ '@keyframes $$class': keyframes }, { global: true });
}
function useGlobalStyles(styles, options = { disabled: false }) {
    return useStyles(styles, { ...options, global: true });
}

const detectSSR = () => !(typeof window !== 'undefined' && window.document?.head?.appendChild);

/**
 * Default style props mapping. This will be populated on the first call to createStylixContext.
 */
let defaultStyleProps;
function createStylixContext(userValues = {}) {
    if (!defaultStyleProps) {
        defaultStyleProps = {};
        for (const value of cssProps) {
            defaultStyleProps[simplifyStylePropName(value)] = value;
        }
    }
    const ctx = {
        id: userValues.id || '$default',
        devMode: !!userValues.devMode,
        styleProps: defaultStyleProps,
        media: userValues.media,
        styleElement: userValues.styleElement,
        plugins: defaultPlugins.flat(),
        styleCounter: 0,
        rules: {},
        ssr: userValues.ssr ?? detectSSR(),
        cleanupRequest: undefined,
        requestApply: false,
        classifyProps(props) {
            const [styles, other] = classifyProps(props, this.styleProps);
            return [styles, other];
        },
        styles(styles, config) {
            const s = createStyles({
                stylixCtx: ctx,
                styles,
                global: config?.global || false,
            });
            applyRules(ctx);
            return s.className;
        },
    };
    if (userValues.plugins?.length) {
        const flatPlugins = userValues.plugins.flat();
        for (const i in flatPlugins) {
            const plugin = flatPlugins[i];
            let pluginIndex = -1;
            if (plugin.before)
                pluginIndex = ctx.plugins.findIndex((v) => v.name === plugin.before);
            else if (plugin.after) {
                pluginIndex = ctx.plugins.findIndex((v) => v.name === plugin.before);
                if (pluginIndex !== -1)
                    pluginIndex += 1;
            }
            else if (plugin.atIndex !== undefined)
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
/**
 * The React context object for Stylix.
 */
const stylixContext = createContext(undefined);
/**
 * Default Stylix context, used when no provider is present.
 */
let defaultStylixContext;
/**
 * React hook that gets the current Stylix context.
 */
function useStylixContext() {
    const ctx = useContext(stylixContext);
    if (!ctx) {
        if (!defaultStylixContext)
            defaultStylixContext = createStylixContext();
        return defaultStylixContext;
    }
    return ctx;
}
/**
 * StylixProvider component. Provides a Stylix context to its descendent elements.
 * Can either accept an existing context via the `context` prop, or create a new context
 * using the other configuration props.
 */
function StylixProvider(props) {
    const { context, id, devMode, plugins, media, styleElement, children, ssr } = props;
    const ctx = useRef(context);
    if (!ctx.current)
        ctx.current = createStylixContext({
            id,
            devMode,
            plugins,
            media,
            styleElement,
            ssr,
        });
    ctx.current.styleCollector = useContext(styleCollectorContext);
    // When the component is unmounted, remove the style element, if any
    useEffect(() => {
        return () => {
            ctx.current?.styleElement?.remove();
        };
    }, []);
    return jsx(stylixContext.Provider, { value: ctx.current, children: children });
}

function _Stylix(props, ref) {
    const { $el, $render, $css, className: outerClassName, children, ...rest } = props;
    const ctx = useStylixContext();
    const [styleProps, otherProps] = ctx.classifyProps(rest);
    let styles = [];
    if (!isEmpty(styleProps))
        styles.push(styleProps);
    if (!isEmpty($css))
        styles.push($css);
    if (styles.length === 1 && styles[0])
        styles = styles[0];
    const stylixClassName = useStyles(styles);
    const className = `${stylixClassName} ${outerClassName || ''}`.trim() || undefined;
    if (React.isValidElement($el)) {
        const $elProps = {
            ...$el.props,
            ref: ('ref' in $el && $el.ref) || ref,
            /**
             * `allProps` must override `$el.props` because the latter may contain default prop values provided by defaultProps.
             * The expectation is that for <$ $el={<SomeComponent />} someComponentProp="my value" />,
             * the `someComponentProp` prop would override any default value specified by SomeComponent.defaultProps.
             */
            ...otherProps,
            className: `${$el.props.className || ''} ${className || ''}`.trim() || undefined,
        };
        return React.cloneElement($el, $elProps, ...(React.Children.toArray(children) || []));
    }
    if ($el) {
        const Component = $el;
        return (jsx(Component, { className: className, ref: ref, ...otherProps, children: children }));
    }
    if ($render) {
        return $render(className || undefined, { children, ...otherProps, ...(ref ? { ref } : null) });
    }
    throw new Error('Stylix: invalid stylix component usage: must provide $el or $render prop.');
}
const Stylix = React.forwardRef(_Stylix);
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;

const htmlTags = [
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
    const Tag = htmlTags[i];
    Stylix[Tag] = React.forwardRef(({ htmlContent, htmlTranslate, ...props }, ref) => (jsx(Stylix, { "$render": (className, props) => (jsx(Tag, { className: className, content: htmlContent, translate: htmlTranslate, ref: ref, ...props })), ...props })));
    Stylix[Tag].__isStylix = true;
    Stylix[Tag].displayName = `$.${Tag}`;
}

function RenderServerStyles(props) {
    const ctx = useStylixContext();
    return jsx(StyleElement, { styles: ctx.ssr ? flattenRules(ctx) : [], ...props });
}

// Internal helper to collect class name parts without joining
function cxArray(args) {
    const classNames = [];
    for (const arg of args) {
        if (arg && typeof arg === 'string') {
            classNames.push(arg);
        }
        else if (Array.isArray(arg)) {
            classNames.push(...cxArray(arg));
        }
        else if (typeof arg === 'function') {
            classNames.push(...cxArray([arg()]));
        }
        else if (typeof arg === 'object' && arg !== null) {
            for (const [key, value] of Object.entries(arg)) {
                if (value) {
                    classNames.push(key);
                }
            }
        }
    }
    return classNames;
}
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
function cx(...args) {
    return cxArray(args).join(' ');
}

export { RenderServerStyles, StyleElement, StylixProvider, createStyleCollector, customProps, cx, Stylix as default, defaultPlugins, mapObject, styleCollectorContext, useGlobalStyles, useKeyframes, useStyles, useStylixContext };
//# sourceMappingURL=index.js.map
