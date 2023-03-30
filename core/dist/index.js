var $cPdmE$react = require("react");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "useStylixContext", () => $918367b4cbc7189f$export$e3c6fdf4e371f028);
$parcel$export(module.exports, "useStylixTheme", () => $918367b4cbc7189f$export$c01a354187f160ee);
$parcel$export(module.exports, "StylixProvider", () => $918367b4cbc7189f$export$ae2c3ad5c234c4cc);
$parcel$export(module.exports, "StylixTheme", () => $918367b4cbc7189f$export$91c80431af53fbc7);
$parcel$export(module.exports, "useStyles", () => $b7bb7699b24ef4bd$export$28e6b9b82ee883c);
$parcel$export(module.exports, "useKeyframes", () => $b7bb7699b24ef4bd$export$f3922bb611b91373);
$parcel$export(module.exports, "useGlobalStyles", () => $b7bb7699b24ef4bd$export$abac79b9db5ae47b);
$parcel$export(module.exports, "defaultPlugins", () => $cb46c37cd304d3d0$export$b5ecb47695d6786e);
$parcel$export(module.exports, "customProps", () => $3173bf4e08028305$export$95cef81be5ddcfd4);
$parcel$export(module.exports, "mapObjectRecursive", () => $1ae3b31df309d474$export$72ae87c5302f282e);
$parcel$export(module.exports, "walkRecursive", () => $0893146e2e8f7a0d$export$a8d8e56b740dab80);
$parcel$export(module.exports, "createStyleCollector", () => $0c5ff6b44ea9986a$export$d3207b3764661c07);
$parcel$export(module.exports, "styleCollectorContext", () => $0c5ff6b44ea9986a$export$9b609b8e22cde6fe);
$parcel$export(module.exports, "classifyProps", () => $d4abddb46f405b94$export$54b296e95917282f);
$parcel$export(module.exports, "useClassifyProps", () => $d4abddb46f405b94$export$34c29a98f3a9910);
$parcel$export(module.exports, "styled", () => $f7963c5fb85d4dcf$export$3817b7a54a07cec7);
$parcel$export(module.exports, "default", () => $a4e8092b68236a62$export$2e2bcd8739ae039);


function $d4abddb46f405b94$export$54b296e95917282f(props, knownProps) {
    const styles = {};
    const other = {};
    for(const prop in props)// If prop is not a valid JSX prop, it must be a CSS selector
    if (!$d4abddb46f405b94$export$4ee529ad08c1c79c(prop) || $d4abddb46f405b94$export$95b76554d0cd12d6(prop, knownProps) && $d4abddb46f405b94$export$bd35f4abe4dfe31c(props[prop])) styles[prop] = props[prop];
    else other[prop] = props[prop];
    return [
        styles,
        other
    ];
}
function $d4abddb46f405b94$export$34c29a98f3a9910(props) {
    const ctx = (0, $918367b4cbc7189f$export$e3c6fdf4e371f028)();
    const [styles, other] = $d4abddb46f405b94$export$54b296e95917282f(props, ctx.styleProps);
    return [
        styles,
        other
    ];
}
function $d4abddb46f405b94$export$95b76554d0cd12d6(prop, knownProps) {
    return $d4abddb46f405b94$export$4ee529ad08c1c79c(prop) && $d4abddb46f405b94$export$2eda63d9f5a68c09(prop) in knownProps;
}
function $d4abddb46f405b94$export$4ee529ad08c1c79c(value) {
    // Not an exact check, but mostly rules out complex css selectors
    return /^[a-z$][a-z0-9_-]*$/i.test(value);
}
function $d4abddb46f405b94$export$2eda63d9f5a68c09(value) {
    return value.toLowerCase().replace(/[^a-z]/gi, "");
}
function $d4abddb46f405b94$export$bd35f4abe4dfe31c(value) {
    return typeof value === "function" || typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined" || Array.isArray(value) || // Check for plain objects, and make sure it doesn't have the $$typeof property (react elements are never valid as style values)
    typeof value === "object" && value.constructor === Object && !("$$typeof" in value);
}


var $64eb320fc02ff694$exports = {};
$64eb320fc02ff694$exports = JSON.parse('["align-content","align-items","align-self","align-tracks","all","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","aspect-ratio","azimuth","backdrop-filter","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-position-x","background-position-y","background-repeat","background-size","block-overflow","block-size","border","border-block","border-block-color","border-block-style","border-block-width","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-end-end-radius","border-end-start-radius","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-inline","border-inline-end","border-inline-color","border-inline-style","border-inline-width","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-start-end-radius","border-start-start-radius","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-align","box-decoration-break","box-direction","box-flex","box-flex-group","box-lines","box-ordinal-group","box-orient","box-pack","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","clip-path","color","color-adjust","color-scheme","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","content","content-visibility","counter-increment","counter-reset","counter-set","cursor","direction","display","empty-cells","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","font","font-family","font-feature-settings","font-kerning","font-language-override","font-optical-sizing","font-variation-settings","font-size","font-size-adjust","font-smooth","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","forced-color-adjust","gap","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-gap","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-gap","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","image-orientation","image-rendering","image-resolution","ime-mode","initial-letter","initial-letter-align","inline-size","inset","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","isolation","justify-content","justify-items","justify-self","justify-tracks","left","letter-spacing","line-break","line-clamp","line-height","line-height-step","list-style","list-style-image","list-style-position","list-style-type","margin","margin-block","margin-block-end","margin-block-start","margin-bottom","margin-inline","margin-inline-end","margin-inline-start","margin-left","margin-right","margin-top","margin-trim","mask","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","masonry-auto-flow","math-style","max-block-size","max-height","max-inline-size","max-lines","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","object-fit","object-position","offset","offset-anchor","offset-distance","offset-path","offset-position","offset-rotate","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-anchor","overflow-block","overflow-clip-box","overflow-clip-margin","overflow-inline","overflow-wrap","overflow-x","overflow-y","overscroll-behavior","overscroll-behavior-block","overscroll-behavior-inline","overscroll-behavior-x","overscroll-behavior-y","padding","padding-block","padding-block-end","padding-block-start","padding-bottom","padding-inline","padding-inline-end","padding-inline-start","padding-left","padding-right","padding-top","page-break-after","page-break-before","page-break-inside","paint-order","perspective","perspective-origin","place-content","place-items","place-self","pointer-events","position","quotes","resize","right","rotate","row-gap","ruby-align","ruby-merge","ruby-position","scale","scrollbar-color","scrollbar-gutter","scrollbar-width","scroll-behavior","scroll-margin","scroll-margin-block","scroll-margin-block-start","scroll-margin-block-end","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-start","scroll-margin-inline-end","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-start","scroll-padding-block-end","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-start","scroll-padding-inline-end","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-coordinate","scroll-snap-destination","scroll-snap-points-x","scroll-snap-points-y","scroll-snap-stop","scroll-snap-type","scroll-snap-type-x","scroll-snap-type-y","shape-image-threshold","shape-margin","shape-outside","tab-size","table-layout","text-align","text-align-last","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-skip-ink","text-decoration-style","text-decoration-thickness","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-size-adjust","text-transform","text-underline-offset","text-underline-position","top","touch-action","transform","transform-box","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","translate","unicode-bidi","user-select","vertical-align","visibility","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","z-index","zoom"]');


/**
 * Indicates that an object is most likely just an object literal.
 */ function $36e7f66f12914cd9$export$53b83ca8eaab0383(obj) {
    return typeof obj === "object" && obj?.constructor === Object;
}


function $7d749eb8074ec1f0$var$cleanObject(object) {
    for(const key in object){
        const value = object[key];
        if (value === null || value === undefined || value === "") delete object[key];
        else if ((0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(value) || Array.isArray(value)) {
            $7d749eb8074ec1f0$var$cleanObject(value);
            if (!Object.keys(value).length) delete object[key];
        }
    }
    return object;
}
const $7d749eb8074ec1f0$export$d01916932d7c8665 = {
    name: "cleanStyles",
    type: "processStyles",
    plugin (ctx, styles) {
        return $7d749eb8074ec1f0$var$cleanObject(styles);
    }
};



function $1ae3b31df309d474$export$72ae87c5302f282e(object, map, context = {}) {
    const clone = Array.isArray(object) ? [] : {};
    for (const k of Object.keys(object)){
        let key = k;
        const value = object[key];
        if (Array.isArray(object)) key = +key;
        const contextClone = {
            ...context
        };
        let result = map(key, value, object, contextClone);
        if (typeof result !== "undefined" && typeof result !== "object" && !Array.isArray(result)) throw new Error("mapObjectRecursive: return value of map function must be undefined, object, or array!");
        if (typeof result === "undefined") result = {
            [key]: value
        };
        for(const kk in result){
            let value = result[kk];
            if ((0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(value) || Array.isArray(value)) value = $1ae3b31df309d474$export$72ae87c5302f282e(value, map, contextClone);
            if (typeof value !== "undefined") clone[kk] = value;
        }
    }
    return clone;
}


const $c48fd0dbd5f815aa$export$dada68e03f41f865 = [
    "columns",
    "column-count",
    "fill-opacity",
    "flex",
    "flex-grow",
    "flex-shrink",
    "font-weight",
    "line-height",
    "opacity",
    "orphans",
    "stroke-opacity",
    "widows",
    "z-index",
    "zoom",
    "order"
];
const $c48fd0dbd5f815aa$export$18583267fbb07c11 = (unit = "px", ignoreProps = $c48fd0dbd5f815aa$export$dada68e03f41f865)=>{
    return {
        name: "defaultUnits",
        type: "processStyles",
        plugin (ctx, styles) {
            return (0, $1ae3b31df309d474$export$72ae87c5302f282e)(styles, $c48fd0dbd5f815aa$var$defaultUnitsMap, {
                unit: unit,
                ignoreProps: ignoreProps
            });
        }
    };
};
const $c48fd0dbd5f815aa$var$defaultUnitsMap = (key, value, object, ctx)=>{
    if (typeof value === "number" && !ctx.ignoreProps.includes(key)) return {
        [key]: String(value) + ctx.unit
    };
};
const $c48fd0dbd5f815aa$export$30fd8e83e8b8d3e8 = $c48fd0dbd5f815aa$export$18583267fbb07c11();



function $c8dda8e320ddf617$var$flatten(styles, parent, selector, root, mediaRoot) {
    for(let key in styles){
        const value = styles[key];
        if (key.startsWith("@media")) {
            // Flatten media queries, but nest them under the root object
            root[key] = root[key] || {};
            $c8dda8e320ddf617$var$flatten(value, root[key], selector, root, root[key]);
        } else if (key.startsWith("@keyframes")) // Add keyframe rules as-is directly to mediaRoot object
        mediaRoot[key] = value;
        else if ((0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(styles[key])) {
            // Concatenate or replace & in selectors and then continue flattening styles
            if (key.includes("&")) key = key.replace(/&/g, selector);
            else key = (selector + " " + key).trim();
            parent[key] = parent[key] || {};
            $c8dda8e320ddf617$var$flatten(value, parent, key, root, mediaRoot);
        } else {
            // Selector is just a css property
            parent[selector] = parent[selector] || {};
            parent[selector][key] = styles[key];
        }
    }
}
const $c8dda8e320ddf617$export$83990f03bc941cb5 = {
    name: "flattenNestedStyles",
    type: "processStyles",
    plugin (ctx, styles) {
        const flattened = {};
        $c8dda8e320ddf617$var$flatten(styles, flattened, "", flattened, flattened);
        return flattened;
    }
};




const $146fcd00a9d12160$export$7cc8703894decffe = {
    name: "mediaArrays",
    type: "processStyles",
    plugin (ctx, styles) {
        // Fill out ditto values
        styles = (0, $1ae3b31df309d474$export$72ae87c5302f282e)(styles, $146fcd00a9d12160$var$mapDittoValues);
        const mediaStyles = {};
        let nonMediaStyles = styles;
        for(const i in ctx.media){
            const mediaQuery = ctx.media[i];
            if (!mediaQuery) nonMediaStyles = (0, $1ae3b31df309d474$export$72ae87c5302f282e)(styles, $146fcd00a9d12160$var$mapNonMedia, {
                i: i
            });
            else mediaStyles[`@media ${mediaQuery}`] = (0, $1ae3b31df309d474$export$72ae87c5302f282e)(styles, $146fcd00a9d12160$var$mapMediaStyles, {
                i: i
            });
        }
        return {
            ...nonMediaStyles,
            ...mediaStyles
        };
    }
};
function $146fcd00a9d12160$var$mapDittoValues(key, value) {
    if (Array.isArray(value)) {
        for(const i in value){
            const v = value[i];
            if (v === "@") value[i] = value[+i - 1];
        }
        return {
            [key]: value
        };
    }
}
function $146fcd00a9d12160$var$mapNonMedia(key, value, object, context) {
    if (Array.isArray(value)) return {
        [key]: value[context.i]
    };
}
function $146fcd00a9d12160$var$mapMediaStyles(key, value, object, context) {
    if (typeof key === "number") return; // Not possible, but here for TS
    if (key.startsWith("@keyframes")) context.keyframes = true;
    if (Array.isArray(value)) return {
        [key]: value[context.i]
    };
    if ((0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(value) || context.keyframes) return;
    // delete key/value pair if primitive
    return {
        [key]: undefined
    };
}


/**
 * Flatten an array recursively.
 */ function $6f995047b8c46148$export$bffa455ba8c619a6(array) {
    const result = [];
    $6f995047b8c46148$var$_flatten(array, result);
    return result;
}
function $6f995047b8c46148$var$_flatten(array, result) {
    for(let i = 0; i < array.length; i++){
        const value = array[i];
        Array.isArray(value) ? $6f995047b8c46148$var$_flatten(value, result) : result.push(value);
    }
}



const $bf0e5f2ae2622b0c$export$3fc9bcb7effc6280 = {
    name: "merge$css",
    type: "processStyles",
    plugin (ctx, styles) {
        const result = {};
        $bf0e5f2ae2622b0c$export$f9e25e3471fd9b77(styles, result);
        return result;
    }
};
function $bf0e5f2ae2622b0c$export$f9e25e3471fd9b77(obj, ctx) {
    if (!(0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(obj)) return;
    for(const key in obj)if (key === "$css") {
        const $css = obj[key];
        if (Array.isArray($css)) {
            const flat$css = (0, $6f995047b8c46148$export$bffa455ba8c619a6)($css);
            for (const val of flat$css)$bf0e5f2ae2622b0c$export$f9e25e3471fd9b77(val, ctx);
        } else $bf0e5f2ae2622b0c$export$f9e25e3471fd9b77($css, ctx);
    } else {
        let value = obj[key];
        if ((0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(value)) {
            value = ctx[key] || {};
            $bf0e5f2ae2622b0c$export$f9e25e3471fd9b77(obj[key], value);
        }
        ctx[key] = value;
    }
}




const $2244b5cf9ed91939$export$d85214c343312efe = {
    name: "propCasing",
    type: "processStyles",
    plugin (ctx, styles) {
        return (0, $1ae3b31df309d474$export$72ae87c5302f282e)(styles, $2244b5cf9ed91939$var$propCasingMap, {
            ctx: ctx
        });
    }
};
function $2244b5cf9ed91939$var$propCasingMap(key, value, object, context) {
    if (typeof key !== "string") return;
    const simpleKey = (0, $d4abddb46f405b94$export$2eda63d9f5a68c09)(key);
    if (simpleKey in context.ctx.styleProps) return {
        [context.ctx.styleProps[simpleKey]]: value
    };
}



const $d52a2b9927acef1b$export$a5988781fa300750 = {
    name: "replace$$class",
    type: "processStyles",
    plugin (ctx, styles) {
        return (0, $1ae3b31df309d474$export$72ae87c5302f282e)(styles, $d52a2b9927acef1b$var$replace$$classMap, {
            ctx: ctx
        });
    }
};
function $d52a2b9927acef1b$var$replace$$classMap(key, value, object, context) {
    value = typeof value === "string" ? value.replace("$$class", context.ctx.hash) : value;
    key = typeof key === "string" ? key.replace("$$class", context.ctx.hash) : key;
    return {
        [key]: value
    };
}



const $f9ae6631426ed700$export$d9c204138d106585 = {
    name: "themeFunctions",
    type: "preprocessStyles",
    plugin (ctx, styles) {
        return (0, $1ae3b31df309d474$export$72ae87c5302f282e)(styles, $f9ae6631426ed700$var$themeFunctionsMap, {
            ctx: ctx
        });
    }
};
function $f9ae6631426ed700$var$themeFunctionsMap(key, value, object, context) {
    if (typeof value === "function") return {
        [key]: value(context.ctx.theme, context.ctx)
    };
}





function $fa892880309a8c54$export$629a2bd3f5a49ecc(value) {
    if (!value || typeof value !== "object") return value;
    if (Array.isArray(value)) {
        const clone = [];
        for(let index = 0; index < value.length; ++index)clone.push($fa892880309a8c54$export$629a2bd3f5a49ecc(value[index]));
        return clone;
    }
    if ((0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(value)) {
        const clone = {};
        for(const key in value)clone[key] = $fa892880309a8c54$export$629a2bd3f5a49ecc(value[key]);
        return clone;
    }
    return value;
}



function $0893146e2e8f7a0d$export$a8d8e56b740dab80(object, cb, context) {
    const keys = Object.keys(object);
    for (const key of keys){
        const value = object[key];
        cb(key, value, object, context);
        if (Array.isArray(value) || (0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(value)) {
            const contextClone = (0, $fa892880309a8c54$export$629a2bd3f5a49ecc)(context);
            $0893146e2e8f7a0d$export$a8d8e56b740dab80(value, cb, contextClone);
        }
    }
    return object;
}



const $3173bf4e08028305$export$95cef81be5ddcfd4 = (customProps)=>{
    for(const key in customProps)customProps[(0, $d4abddb46f405b94$export$2eda63d9f5a68c09)(key)] = customProps[key];
    return [
        {
            name: "customPropsInit",
            type: "initialize",
            plugin (ctx) {
                for(const key in customProps)ctx.styleProps[(0, $d4abddb46f405b94$export$2eda63d9f5a68c09)(key)] = key;
            }
        },
        {
            name: "customPropsProcess",
            type: "processStyles",
            before: (0, $146fcd00a9d12160$export$7cc8703894decffe),
            plugin (ctx, styles) {
                return (0, $0893146e2e8f7a0d$export$a8d8e56b740dab80)(styles, (key, value, object)=>{
                    if (!(0, $d4abddb46f405b94$export$4ee529ad08c1c79c)(key) || (0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(value)) return;
                    const simpleKey = (0, $d4abddb46f405b94$export$2eda63d9f5a68c09)(key);
                    const propValue = customProps[simpleKey];
                    if (!propValue) return;
                    const objectClone = {
                        ...object
                    };
                    const keys = Object.keys(object);
                    const afterKeys = keys.slice(keys.indexOf(key) + 1);
                    const newStyles = {};
                    if (typeof propValue === "object") {
                        if (value) Object.assign(newStyles, propValue);
                    } else if (typeof propValue === "string") newStyles[propValue] = value;
                    else if (typeof propValue === "function") Object.assign(newStyles, propValue(value));
                    delete object[key];
                    Object.assign(object, newStyles);
                    for (const k of afterKeys){
                        const val = objectClone[k];
                        delete object[k];
                        object[k] = val;
                    }
                });
            }
        }
    ];
};


function $cb46c37cd304d3d0$export$dd20d84ec8823bbf(type, styles, hash, context) {
    const pluginContext = {
        id: context.id,
        devMode: context.devMode,
        theme: context.theme,
        media: context.media,
        stylesheet: context.stylesheet,
        styleElement: context.styleElement,
        styleProps: context.styleProps,
        hash: hash
    };
    let processedStyles = styles;
    for(const i in context.plugins){
        const plugin = context.plugins[i];
        if (plugin.type === type) processedStyles = plugin.plugin(pluginContext, processedStyles);
    }
    return processedStyles;
}
const $cb46c37cd304d3d0$export$b5ecb47695d6786e = {
    themeFunctions: $f9ae6631426ed700$export$d9c204138d106585,
    merge$css: $bf0e5f2ae2622b0c$export$3fc9bcb7effc6280,
    mediaArrays: $146fcd00a9d12160$export$7cc8703894decffe,
    propCasing: $2244b5cf9ed91939$export$d85214c343312efe,
    flattenNestedStyles: $c8dda8e320ddf617$export$83990f03bc941cb5,
    replace$$class: $d52a2b9927acef1b$export$a5988781fa300750,
    defaultPixelUnits: $c48fd0dbd5f815aa$export$30fd8e83e8b8d3e8,
    cleanStyles: $7d749eb8074ec1f0$export$d01916932d7c8665
};



const $0c5ff6b44ea9986a$export$9b609b8e22cde6fe = /*#__PURE__*/ (0, $cPdmE$react.createContext)(null);
function $0c5ff6b44ea9986a$export$d3207b3764661c07() {
    const styles = [];
    const collector = {
        collect: (element)=>/*#__PURE__*/ (0, ($parcel$interopDefault($cPdmE$react))).createElement($0c5ff6b44ea9986a$export$9b609b8e22cde6fe.Provider, {
                value: styles
            }, element),
        render: (props)=>/*#__PURE__*/ (0, ($parcel$interopDefault($cPdmE$react))).createElement("style", {
                type: "text/css",
                key: props.id || "stylix",
                ...props,
                dangerouslySetInnerHTML: {
                    __html: collector.styles.join(" ")
                }
            }),
        styles: styles
    };
    collector.render.displayName = "StylixStyleCollectorRenderer";
    return collector;
}




function $69d6532a08c5f203$export$4950aa0f605343fb(...items) {
    items = items.filter((item)=>typeof item !== "undefined" && item !== null);
    if (!items?.length) return undefined;
    if (items.length === 1) return items[0];
    // If items are not all objects/arrays, return the last object/array if possible, otherwise last non-undefined value
    if (!items.every((item)=>Array.isArray(item) || (0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(item))) {
        items.reverse();
        return items.find((item)=>Array.isArray(item) || (0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(item)) || items.find((item)=>typeof item !== "undefined");
    }
    const merged = Array.isArray(items[0]) ? [] : {};
    for (const item of items){
        if (!Array.isArray(item) && !(0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(item)) return merged;
        const keys = [
            ...Object.keys(item),
            ...Object.getOwnPropertySymbols(item)
        ];
        for (const key of keys){
            const result = $69d6532a08c5f203$export$4950aa0f605343fb(merged[key], item[key]);
            if (typeof result !== "undefined") merged[key] = result;
        }
    }
    return merged;
}



const $4eafd441781a8103$var$useIsoLayoutEffect = typeof window !== "undefined" && "document" in window ? (fn, deps, _runOnSsr)=>(0, $cPdmE$react.useLayoutEffect)(fn, deps) : (fn, _deps, runOnSsr)=>runOnSsr ? fn() : null;
var $4eafd441781a8103$export$2e2bcd8739ae039 = $4eafd441781a8103$var$useIsoLayoutEffect;


const $918367b4cbc7189f$var$defaultStyleProps = {};
for (const value of (0, (/*@__PURE__*/$parcel$interopDefault($64eb320fc02ff694$exports))))$918367b4cbc7189f$var$defaultStyleProps[(0, $d4abddb46f405b94$export$2eda63d9f5a68c09)(value)] = value;
function $918367b4cbc7189f$var$createStylixContext(userValues = {}) {
    const ctx = {
        id: userValues.id || Math.round(Math.random() * 10000).toString(10),
        devMode: userValues.devMode,
        styleProps: $918367b4cbc7189f$var$defaultStyleProps,
        theme: userValues.theme || null,
        media: userValues.media || null,
        styleElement: userValues.styleElement,
        plugins: (0, $6f995047b8c46148$export$bffa455ba8c619a6)(Object.values((0, $cb46c37cd304d3d0$export$b5ecb47695d6786e))),
        rules: {},
        cleanupRequest: undefined
    };
    if (!ctx.styleElement && typeof document !== "undefined") {
        if (!ctx.devMode && "adoptedStyleSheets" in document) {
            ctx.stylesheet = new CSSStyleSheet();
            document.adoptedStyleSheets.push(ctx.stylesheet);
        } else {
            // Legacy/devMode method
            // TS assumes window.document is 'never', so we need to explicitly cast it to Document
            const doc = document;
            ctx.styleElement = doc.createElement("style");
            ctx.styleElement.className = "stylix";
            if (ctx.id) ctx.styleElement.id = "stylix-" + ctx.id;
            doc.head.appendChild(ctx.styleElement);
        }
    }
    if (ctx.styleElement) ctx.stylesheet = ctx.styleElement.sheet;
    if (userValues.plugins?.length) {
        const flatPlugins = (0, $6f995047b8c46148$export$bffa455ba8c619a6)(userValues.plugins);
        for(const i in flatPlugins){
            const plugin = flatPlugins[i];
            let pluginIndex = -1;
            if (plugin.before && ctx.plugins.includes(plugin.before)) pluginIndex = ctx.plugins.indexOf(plugin.before);
            if (plugin.after && ctx.plugins.includes(plugin.after)) pluginIndex = ctx.plugins.indexOf(plugin.after) + 1;
            if (plugin.atIndex !== undefined) pluginIndex = plugin.atIndex;
            if (pluginIndex === -1) ctx.plugins.push(plugin);
            else ctx.plugins.splice(pluginIndex, 0, plugin);
        }
    }
    (0, $cb46c37cd304d3d0$export$dd20d84ec8823bbf)("initialize", null, null, ctx);
    return ctx;
}
// The React context object
const $918367b4cbc7189f$var$stylixContext = /*#__PURE__*/ (0, $cPdmE$react.createContext)($918367b4cbc7189f$var$createStylixContext());
function $918367b4cbc7189f$export$e3c6fdf4e371f028() {
    return (0, $cPdmE$react.useContext)($918367b4cbc7189f$var$stylixContext);
}
function $918367b4cbc7189f$export$c01a354187f160ee() {
    return (0, $cPdmE$react.useContext)($918367b4cbc7189f$var$stylixContext).theme;
}
function $918367b4cbc7189f$export$ae2c3ad5c234c4cc({ id: id , devMode: devMode , plugins: plugins , styleElement: styleElement , children: children , ...themeProps }) {
    const ctx = (0, $cPdmE$react.useRef)();
    if (!ctx.current) ctx.current = $918367b4cbc7189f$var$createStylixContext({
        id: id,
        devMode: devMode,
        plugins: plugins,
        styleElement: styleElement
    });
    ctx.current.styleCollector = (0, $cPdmE$react.useContext)((0, $0c5ff6b44ea9986a$export$9b609b8e22cde6fe));
    return /*#__PURE__*/ (0, ($parcel$interopDefault($cPdmE$react))).createElement($918367b4cbc7189f$var$stylixContext.Provider, {
        value: ctx.current
    }, /*#__PURE__*/ (0, ($parcel$interopDefault($cPdmE$react))).createElement($918367b4cbc7189f$export$91c80431af53fbc7, themeProps, children));
}
function $918367b4cbc7189f$var$mergeContexts(contextA, contextB) {
    const obj = {
        ...contextA
    };
    const themeB = contextB.theme;
    if (contextB) for(const key in contextB){
        const value = contextB[key];
        if (typeof value !== "undefined") obj[key] = value;
    }
    obj.theme = (0, $69d6532a08c5f203$export$4950aa0f605343fb)(contextA.theme || {}, themeB);
    return obj;
}
function $918367b4cbc7189f$export$91c80431af53fbc7({ children: children , media: media , theme: theme  }) {
    const parentCtx = (0, $cPdmE$react.useContext)($918367b4cbc7189f$var$stylixContext);
    const [contextValue, setContextValue] = (0, $cPdmE$react.useState)(()=>$918367b4cbc7189f$var$mergeContexts(parentCtx, {
            media: media,
            theme: theme
        }));
    // contextValue should only update (and cause re-renders) when relevant properties change.
    // `media` is treated as special because providing an array of strings is easier to do inline,
    // but we don't want to cause descendent re-renders if the values don't change.
    (0, $4eafd441781a8103$export$2e2bcd8739ae039)(()=>{
        setContextValue($918367b4cbc7189f$var$mergeContexts(parentCtx, {
            media: media,
            theme: theme
        }));
    }, [
        parentCtx,
        media?.join("|") || "",
        theme
    ], false);
    return /*#__PURE__*/ (0, ($parcel$interopDefault($cPdmE$react))).createElement($918367b4cbc7189f$var$stylixContext.Provider, {
        value: contextValue
    }, children);
}



function $3cb141540b096e82$export$2e2bcd8739ae039(ctx) {
    const flattenedRules = [];
    for(const key in ctx.rules){
        const val = ctx.rules[key];
        flattenedRules.push(...val.rules);
    }
    if (ctx.styleCollector) {
        ctx.styleCollector.length = 0;
        ctx.styleCollector.push(...flattenedRules);
        return;
    }
    if (ctx.devMode) ctx.styleElement.innerHTML = flattenedRules.join("\n");
    else {
        const stylesheet = ctx.stylesheet;
        if (stylesheet.cssRules) try {
            stylesheet.replaceSync(flattenedRules.join("\n"));
        } catch (e) {
            // Errors are ignored, this just means that a browser doesn't support a certain CSS feature.
            console.warn(e);
        }
        else {
            // Legacy method
            while(stylesheet.rules.length)stylesheet.deleteRule(0);
            for(const i in flattenedRules)try {
                stylesheet.insertRule(flattenedRules[i], +i);
            } catch (e) {
                // Errors are ignored, this just means that a browser doesn't support a certain CSS feature.
                console.warn(e);
            }
        }
    }
}



function $c9948cbb03d86ace$export$e2d100a3f83db87c() {
    return (0, ($parcel$interopDefault($cPdmE$react)))["__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED"]?.ReactDebugCurrentFrame?.getStackAddendum?.()?.split("\n")?.map((line)=>{
        // Look for a component name like "Component$123", either at the start of the line (Firefox) or after "at " (Safari/Chrome)
        const m = line.match(/^([A-Z][A-Za-z0-9$]*)|^\s*at ([A-Z][A-Za-z0-9$]*)/);
        return m?.[1] || m?.[2];
    }).filter(Boolean).reverse().slice(-1)[0];
}





function $d7b71dffbc028505$export$2e2bcd8739ae039(styles, hash, context) {
    try {
        const processedStyles = (0, $cb46c37cd304d3d0$export$dd20d84ec8823bbf)("processStyles", styles, hash, context);
        // serialize to css rules array
        const serialize = function serialize(selector, styles) {
            const lines = [];
            for(const key in styles){
                const value = styles[key];
                if ((0, $36e7f66f12914cd9$export$53b83ca8eaab0383)(value)) lines.push(serialize(key, value));
                else lines.push(`  ${key}: ${value};`);
            }
            return `${selector} {\n${lines.join("\n")} }`;
        };
        const result = [];
        for(const key in processedStyles){
            const value = processedStyles[key];
            result.push(serialize(key, value));
        }
        return result;
    } catch (e) {
        if (e.name && e.reason) console.error(`${e.name}: ${e.reason}\n`, e.source.replace("\n", " ").substr(Math.max(0, e.column - 20), 100) + "\n", " ".repeat(20) + "^");
        else console.error(e);
        return [];
    }
}



/**
 * Cheap string hashing, suitable for generating css class names
 */ function $472b80d0b3855b37$export$9169be2e06c9c165(str) {
    let hash = 5381;
    let i = str.length;
    while(i)hash = hash * 33 ^ str.charCodeAt(--i);
    return "stylix-" + (hash >>> 0).toString(36);
}



function $b7bb7699b24ef4bd$var$cleanup(ctx) {
    if (typeof ctx.cleanupRequest !== "undefined") return;
    ctx.cleanupRequest = setTimeout(()=>{
        let deleted = false;
        for(const i in ctx.rules){
            const rule = ctx.rules[i];
            if (!rule.refs) {
                delete ctx.rules[rule.hash];
                deleted = true;
            }
        }
        deleted && (0, $3cb141540b096e82$export$2e2bcd8739ae039)(ctx);
        delete ctx.cleanupRequest;
    }, 100);
}
function $b7bb7699b24ef4bd$var$compare(a, b) {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a === "object") {
        if (Array.isArray(a) && Array.isArray(b) && a.length !== b.length) return false;
        else if (Object.keys(a).length !== Object.keys(b).length) return false;
        for(const key in b){
            if (!$b7bb7699b24ef4bd$var$compare(a[key], b[key])) return false;
        }
    }
    return a === b;
}
function $b7bb7699b24ef4bd$export$28e6b9b82ee883c(styles, options = {
    global: false,
    disabled: false
}) {
    const stylixCtx = (0, $918367b4cbc7189f$export$e3c6fdf4e371f028)();
    const prevRef = (0, $cPdmE$react.useRef)({
        styles: {},
        hash: ""
    });
    const changed = !$b7bb7699b24ef4bd$var$compare(styles, prevRef.current.styles);
    options.debugLabel ||= !!stylixCtx.devMode && (0, $c9948cbb03d86ace$export$e2d100a3f83db87c)();
    prevRef.current.styles = styles;
    if (changed) {
        // Preprocess styles with plugins
        if (!options.disabled && styles) styles = (0, $cb46c37cd304d3d0$export$dd20d84ec8823bbf)("preprocessStyles", styles, null, stylixCtx);
        // Serialize value and generate hash
        const json = !options.disabled && styles && JSON.stringify(styles);
        prevRef.current.hash = json && json !== "{}" && json !== "[]" ? (0, $472b80d0b3855b37$export$9169be2e06c9c165)(JSON.stringify(stylixCtx.media || []) + json) + (options.debugLabel ? "-" + options.debugLabel : "") : "";
    }
    const { hash: hash  } = prevRef.current;
    if (hash && changed && !stylixCtx.rules[hash]) {
        // If not global styles, wrap original styles with classname
        if (!options.global) styles = {
            ["." + hash]: styles
        };
        stylixCtx.rules[hash] = {
            hash: hash,
            rules: (0, $d7b71dffbc028505$export$2e2bcd8739ae039)(styles, hash, stylixCtx),
            refs: 1
        };
        stylixCtx.requestApply = true;
    }
    // Apply styles if requested.
    // This runs on every render. We utilize useLayoutEffect so that it runs *after* all the other
    // renders have completed. stylixCtx.requestApply guards against multiple runs. This reduces the number of calls
    // to applyRules(), but prevents styles potentially being added to the DOM after other components force the
    // browser to compute styles.
    (0, $4eafd441781a8103$export$2e2bcd8739ae039)(()=>{
        if (!stylixCtx.requestApply) return;
        stylixCtx.requestApply = false;
        (0, $3cb141540b096e82$export$2e2bcd8739ae039)(stylixCtx);
    }, undefined, true);
    // When hash changes, add/remove ref count
    (0, $4eafd441781a8103$export$2e2bcd8739ae039)(()=>{
        if (!hash || !changed) return;
        if (stylixCtx.rules[hash]) stylixCtx.rules[hash].refs++;
        return ()=>{
            stylixCtx.rules[hash].refs--;
            $b7bb7699b24ef4bd$var$cleanup(stylixCtx);
        };
    }, [
        hash
    ], false);
    return hash;
}
function $b7bb7699b24ef4bd$export$f3922bb611b91373(keyframes, options = {
    disabled: false
}) {
    return $b7bb7699b24ef4bd$export$28e6b9b82ee883c({
        "@keyframes $$class": keyframes
    }, {
        global: true,
        ...options
    });
}
function $b7bb7699b24ef4bd$export$abac79b9db5ae47b(styles, options = {
    disabled: false
}) {
    return $b7bb7699b24ef4bd$export$28e6b9b82ee883c(styles, {
        ...options,
        global: true
    });
}












function $a4e8092b68236a62$export$7204462c24cfcb17(props, ref) {
    const { $el: $el , $css: $css , $disabled: $disabled , className: className , children: children , ...rest } = props;
    const ctx = (0, $918367b4cbc7189f$export$e3c6fdf4e371f028)();
    const [styleProps, otherProps] = (0, $d4abddb46f405b94$export$54b296e95917282f)(rest, ctx.styleProps);
    if ($css) styleProps.$css = $css;
    const hash = (0, $b7bb7699b24ef4bd$export$28e6b9b82ee883c)(styleProps, {
        disabled: $disabled
    });
    const allProps = {
        className: `${hash} ${className || ""}`.trim(),
        ref: ref,
        ...otherProps
    };
    if (/*#__PURE__*/ (0, ($parcel$interopDefault($cPdmE$react))).isValidElement($el)) {
        const $elProps = {
            ...$el.props,
            /**
       * `allProps` must override `$el.props` because the latter may contain default prop values provided by defaultProps.
       * The expectation is that for <$ $el={<SomeComponent />} someComponentProp="my value" />,
       * the `someComponentProp` prop would override any default value specified by SomeComponent.defaultProps.
       */ ...allProps,
            className: (($el.props.className || "") + " " + allProps.className).trim()
        };
        return /*#__PURE__*/ (0, ($parcel$interopDefault($cPdmE$react))).cloneElement($el, $elProps, ...(0, ($parcel$interopDefault($cPdmE$react))).Children.toArray(children) || []);
    }
    return /*#__PURE__*/ (0, ($parcel$interopDefault($cPdmE$react))).createElement($el, allProps, children);
}
const $a4e8092b68236a62$var$Stylix = /*#__PURE__*/ (0, ($parcel$interopDefault($cPdmE$react))).forwardRef($a4e8092b68236a62$export$7204462c24cfcb17);
$a4e8092b68236a62$var$Stylix.displayName = "Stylix";
$a4e8092b68236a62$var$Stylix.__isStylix = true;
var $a4e8092b68236a62$export$2e2bcd8739ae039 = $a4e8092b68236a62$var$Stylix;


function $f7963c5fb85d4dcf$export$3817b7a54a07cec7($el, addProps, conflictingPropMapping) {
    const Element = typeof $el === "string" ? $el : /*#__PURE__*/ (0, ($parcel$interopDefault($cPdmE$react))).forwardRef($el);
    const r = /*#__PURE__*/ (0, ($parcel$interopDefault($cPdmE$react))).forwardRef((props, ref)=>{
        if (conflictingPropMapping) for(const k in conflictingPropMapping){
            props[conflictingPropMapping[k]] = props[k];
            delete props[k];
        }
        return (0, $a4e8092b68236a62$export$7204462c24cfcb17)({
            $el: Element,
            ...addProps,
            ...props,
            ...addProps?.$css || props?.$css ? {
                $css: [
                    addProps?.$css,
                    props?.$css
                ].filter(Boolean)
            } : {}
        }, ref);
    });
    r.displayName = `$.${$el.displayName || $el.name || $el.toString?.() || "Unnamed"}`;
    r.__isStylix = true;
    return r;
}


var $d8489f3ea07e10a9$exports = {};
$d8489f3ea07e10a9$exports = JSON.parse('["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","math","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rb","rp","rt","rtc","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"]');




for(const i in 0, (/*@__PURE__*/$parcel$interopDefault($d8489f3ea07e10a9$exports))){
    // Types are specified in ./types.ts, so we don't care what they type of htmlTags[i] is.
    // JSX.IntrinsicElements is a union of all HTML tags, so it is too complex for TypeScript to infer.
    const tag = (0, (/*@__PURE__*/$parcel$interopDefault($d8489f3ea07e10a9$exports)))[i];
    (0, $a4e8092b68236a62$export$2e2bcd8739ae039)[tag] = (0, $f7963c5fb85d4dcf$export$3817b7a54a07cec7)(tag);
}





//# sourceMappingURL=index.js.map
