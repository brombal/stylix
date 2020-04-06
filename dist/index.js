function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var nanoCss = require('nano-css');
var cache = require('nano-css/addon/cache');
var drule = require('nano-css/addon/drule');
var nesting = require('nano-css/addon/nesting');
var prefixer = require('nano-css/addon/prefixer');
var rule = require('nano-css/addon/rule');
var stable = require('nano-css/addon/stable');
var unitless = require('nano-css/addon/unitless');
var React = _interopDefault(require('react'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var cssPropertyNames = [
	"-ms-accelerator",
	"msAccelerator",
	"-ms-block-progression",
	"msBlockProgression",
	"-ms-content-zoom-chaining",
	"msContentZoomChaining",
	"-ms-content-zooming",
	"msContentZooming",
	"-ms-content-zoom-limit",
	"msContentZoomLimit",
	"-ms-content-zoom-limit-max",
	"msContentZoomLimitMax",
	"-ms-content-zoom-limit-min",
	"msContentZoomLimitMin",
	"-ms-content-zoom-snap",
	"msContentZoomSnap",
	"-ms-content-zoom-snap-points",
	"msContentZoomSnapPoints",
	"-ms-content-zoom-snap-type",
	"msContentZoomSnapType",
	"-ms-filter",
	"msFilter",
	"-ms-flow-from",
	"msFlowFrom",
	"-ms-flow-into",
	"msFlowInto",
	"-ms-high-contrast-adjust",
	"msHighContrastAdjust",
	"-ms-hyphenate-limit-chars",
	"msHyphenateLimitChars",
	"-ms-hyphenate-limit-lines",
	"msHyphenateLimitLines",
	"-ms-hyphenate-limit-zone",
	"msHyphenateLimitZone",
	"-ms-ime-align",
	"msImeAlign",
	"-ms-overflow-style",
	"msOverflowStyle",
	"-ms-scrollbar-3dlight-color",
	"msScrollbar3DlightColor",
	"-ms-scrollbar-arrow-color",
	"msScrollbarArrowColor",
	"-ms-scrollbar-base-color",
	"msScrollbarBaseColor",
	"-ms-scrollbar-darkshadow-color",
	"msScrollbarDarkshadowColor",
	"-ms-scrollbar-face-color",
	"msScrollbarFaceColor",
	"-ms-scrollbar-highlight-color",
	"msScrollbarHighlightColor",
	"-ms-scrollbar-shadow-color",
	"msScrollbarShadowColor",
	"-ms-scrollbar-track-color",
	"msScrollbarTrackColor",
	"-ms-scroll-chaining",
	"msScrollChaining",
	"-ms-scroll-limit",
	"msScrollLimit",
	"-ms-scroll-limit-x-max",
	"msScrollLimitXMax",
	"-ms-scroll-limit-x-min",
	"msScrollLimitXMin",
	"-ms-scroll-limit-y-max",
	"msScrollLimitYMax",
	"-ms-scroll-limit-y-min",
	"msScrollLimitYMin",
	"-ms-scroll-rails",
	"msScrollRails",
	"-ms-scroll-snap-points-x",
	"msScrollSnapPointsX",
	"-ms-scroll-snap-points-y",
	"msScrollSnapPointsY",
	"-ms-scroll-snap-type",
	"msScrollSnapType",
	"-ms-scroll-snap-x",
	"msScrollSnapX",
	"-ms-scroll-snap-y",
	"msScrollSnapY",
	"-ms-scroll-translation",
	"msScrollTranslation",
	"-ms-text-autospace",
	"msTextAutospace",
	"-ms-touch-select",
	"msTouchSelect",
	"-ms-user-select",
	"msUserSelect",
	"-ms-wrap-flow",
	"msWrapFlow",
	"-ms-wrap-margin",
	"msWrapMargin",
	"-ms-wrap-through",
	"msWrapThrough",
	"-moz-appearance",
	"mozAppearance",
	"-moz-binding",
	"mozBinding",
	"-moz-border-bottom-colors",
	"mozBorderBottomColors",
	"-moz-border-left-colors",
	"mozBorderLeftColors",
	"-moz-border-right-colors",
	"mozBorderRightColors",
	"-moz-border-top-colors",
	"mozBorderTopColors",
	"-moz-context-properties",
	"mozContextProperties",
	"-moz-float-edge",
	"mozFloatEdge",
	"-moz-force-broken-image-icon",
	"mozForceBrokenImageIcon",
	"-moz-image-region",
	"mozImageRegion",
	"-moz-orient",
	"mozOrient",
	"-moz-outline-radius",
	"mozOutlineRadius",
	"-moz-outline-radius-bottomleft",
	"mozOutlineRadiusBottomleft",
	"-moz-outline-radius-bottomright",
	"mozOutlineRadiusBottomright",
	"-moz-outline-radius-topleft",
	"mozOutlineRadiusTopleft",
	"-moz-outline-radius-topright",
	"mozOutlineRadiusTopright",
	"-moz-stack-sizing",
	"mozStackSizing",
	"-moz-text-blink",
	"mozTextBlink",
	"-moz-user-focus",
	"mozUserFocus",
	"-moz-user-input",
	"mozUserInput",
	"-moz-user-modify",
	"mozUserModify",
	"-moz-window-dragging",
	"mozWindowDragging",
	"-moz-window-shadow",
	"mozWindowShadow",
	"-webkit-appearance",
	"webkitAppearance",
	"-webkit-border-before",
	"webkitBorderBefore",
	"-webkit-border-before-color",
	"webkitBorderBeforeColor",
	"-webkit-border-before-style",
	"webkitBorderBeforeStyle",
	"-webkit-border-before-width",
	"webkitBorderBeforeWidth",
	"-webkit-box-reflect",
	"webkitBoxReflect",
	"-webkit-line-clamp",
	"webkitLineClamp",
	"-webkit-mask",
	"webkitMask",
	"-webkit-mask-attachment",
	"webkitMaskAttachment",
	"-webkit-mask-clip",
	"webkitMaskClip",
	"-webkit-mask-composite",
	"webkitMaskComposite",
	"-webkit-mask-image",
	"webkitMaskImage",
	"-webkit-mask-origin",
	"webkitMaskOrigin",
	"-webkit-mask-position",
	"webkitMaskPosition",
	"-webkit-mask-position-x",
	"webkitMaskPositionX",
	"-webkit-mask-position-y",
	"webkitMaskPositionY",
	"-webkit-mask-repeat",
	"webkitMaskRepeat",
	"-webkit-mask-repeat-x",
	"webkitMaskRepeatX",
	"-webkit-mask-repeat-y",
	"webkitMaskRepeatY",
	"-webkit-mask-size",
	"webkitMaskSize",
	"-webkit-overflow-scrolling",
	"webkitOverflowScrolling",
	"-webkit-tap-highlight-color",
	"webkitTapHighlightColor",
	"-webkit-text-fill-color",
	"webkitTextFillColor",
	"-webkit-text-stroke",
	"webkitTextStroke",
	"-webkit-text-stroke-color",
	"webkitTextStrokeColor",
	"-webkit-text-stroke-width",
	"webkitTextStrokeWidth",
	"-webkit-touch-callout",
	"webkitTouchCallout",
	"-webkit-user-modify",
	"webkitUserModify",
	"align-content",
	"alignContent",
	"align-items",
	"alignItems",
	"align-self",
	"alignSelf",
	"all",
	"animation",
	"animation-delay",
	"animationDelay",
	"animation-direction",
	"animationDirection",
	"animation-duration",
	"animationDuration",
	"animation-fill-mode",
	"animationFillMode",
	"animation-iteration-count",
	"animationIterationCount",
	"animation-name",
	"animationName",
	"animation-play-state",
	"animationPlayState",
	"animation-timing-function",
	"animationTimingFunction",
	"appearance",
	"aspect-ratio",
	"aspectRatio",
	"azimuth",
	"backdrop-filter",
	"backdropFilter",
	"backface-visibility",
	"backfaceVisibility",
	"background",
	"background-attachment",
	"backgroundAttachment",
	"background-blend-mode",
	"backgroundBlendMode",
	"background-clip",
	"backgroundClip",
	"background-color",
	"backgroundColor",
	"background-image",
	"backgroundImage",
	"background-origin",
	"backgroundOrigin",
	"background-position",
	"backgroundPosition",
	"background-position-x",
	"backgroundPositionX",
	"background-position-y",
	"backgroundPositionY",
	"background-repeat",
	"backgroundRepeat",
	"background-size",
	"backgroundSize",
	"block-overflow",
	"blockOverflow",
	"block-size",
	"blockSize",
	"border",
	"border-block",
	"borderBlock",
	"border-block-color",
	"borderBlockColor",
	"border-block-style",
	"borderBlockStyle",
	"border-block-width",
	"borderBlockWidth",
	"border-block-end",
	"borderBlockEnd",
	"border-block-end-color",
	"borderBlockEndColor",
	"border-block-end-style",
	"borderBlockEndStyle",
	"border-block-end-width",
	"borderBlockEndWidth",
	"border-block-start",
	"borderBlockStart",
	"border-block-start-color",
	"borderBlockStartColor",
	"border-block-start-style",
	"borderBlockStartStyle",
	"border-block-start-width",
	"borderBlockStartWidth",
	"border-bottom",
	"borderBottom",
	"border-bottom-color",
	"borderBottomColor",
	"border-bottom-left-radius",
	"borderBottomLeftRadius",
	"border-bottom-right-radius",
	"borderBottomRightRadius",
	"border-bottom-style",
	"borderBottomStyle",
	"border-bottom-width",
	"borderBottomWidth",
	"border-collapse",
	"borderCollapse",
	"border-color",
	"borderColor",
	"border-end-end-radius",
	"borderEndEndRadius",
	"border-end-start-radius",
	"borderEndStartRadius",
	"border-image",
	"borderImage",
	"border-image-outset",
	"borderImageOutset",
	"border-image-repeat",
	"borderImageRepeat",
	"border-image-slice",
	"borderImageSlice",
	"border-image-source",
	"borderImageSource",
	"border-image-width",
	"borderImageWidth",
	"border-inline",
	"borderInline",
	"border-inline-end",
	"borderInlineEnd",
	"border-inline-color",
	"borderInlineColor",
	"border-inline-style",
	"borderInlineStyle",
	"border-inline-width",
	"borderInlineWidth",
	"border-inline-end-color",
	"borderInlineEndColor",
	"border-inline-end-style",
	"borderInlineEndStyle",
	"border-inline-end-width",
	"borderInlineEndWidth",
	"border-inline-start",
	"borderInlineStart",
	"border-inline-start-color",
	"borderInlineStartColor",
	"border-inline-start-style",
	"borderInlineStartStyle",
	"border-inline-start-width",
	"borderInlineStartWidth",
	"border-left",
	"borderLeft",
	"border-left-color",
	"borderLeftColor",
	"border-left-style",
	"borderLeftStyle",
	"border-left-width",
	"borderLeftWidth",
	"border-radius",
	"borderRadius",
	"border-right",
	"borderRight",
	"border-right-color",
	"borderRightColor",
	"border-right-style",
	"borderRightStyle",
	"border-right-width",
	"borderRightWidth",
	"border-spacing",
	"borderSpacing",
	"border-start-end-radius",
	"borderStartEndRadius",
	"border-start-start-radius",
	"borderStartStartRadius",
	"border-style",
	"borderStyle",
	"border-top",
	"borderTop",
	"border-top-color",
	"borderTopColor",
	"border-top-left-radius",
	"borderTopLeftRadius",
	"border-top-right-radius",
	"borderTopRightRadius",
	"border-top-style",
	"borderTopStyle",
	"border-top-width",
	"borderTopWidth",
	"border-width",
	"borderWidth",
	"bottom",
	"box-align",
	"boxAlign",
	"box-decoration-break",
	"boxDecorationBreak",
	"box-direction",
	"boxDirection",
	"box-flex",
	"boxFlex",
	"box-flex-group",
	"boxFlexGroup",
	"box-lines",
	"boxLines",
	"box-ordinal-group",
	"boxOrdinalGroup",
	"box-orient",
	"boxOrient",
	"box-pack",
	"boxPack",
	"box-shadow",
	"boxShadow",
	"box-sizing",
	"boxSizing",
	"break-after",
	"breakAfter",
	"break-before",
	"breakBefore",
	"break-inside",
	"breakInside",
	"caption-side",
	"captionSide",
	"caret-color",
	"caretColor",
	"clear",
	"clip",
	"clip-path",
	"clipPath",
	"color",
	"color-adjust",
	"colorAdjust",
	"column-count",
	"columnCount",
	"column-fill",
	"columnFill",
	"column-gap",
	"columnGap",
	"column-rule",
	"columnRule",
	"column-rule-color",
	"columnRuleColor",
	"column-rule-style",
	"columnRuleStyle",
	"column-rule-width",
	"columnRuleWidth",
	"column-span",
	"columnSpan",
	"column-width",
	"columnWidth",
	"columns",
	"contain",
	"content",
	"counter-increment",
	"counterIncrement",
	"counter-reset",
	"counterReset",
	"counter-set",
	"counterSet",
	"cursor",
	"direction",
	"display",
	"empty-cells",
	"emptyCells",
	"filter",
	"flex",
	"flex-basis",
	"flexBasis",
	"flex-direction",
	"flexDirection",
	"flex-flow",
	"flexFlow",
	"flex-grow",
	"flexGrow",
	"flex-shrink",
	"flexShrink",
	"flex-wrap",
	"flexWrap",
	"float",
	"font",
	"font-family",
	"fontFamily",
	"font-feature-settings",
	"fontFeatureSettings",
	"font-kerning",
	"fontKerning",
	"font-language-override",
	"fontLanguageOverride",
	"font-optical-sizing",
	"fontOpticalSizing",
	"font-variation-settings",
	"fontVariationSettings",
	"font-size",
	"fontSize",
	"font-size-adjust",
	"fontSizeAdjust",
	"font-stretch",
	"fontStretch",
	"font-style",
	"fontStyle",
	"font-synthesis",
	"fontSynthesis",
	"font-variant",
	"fontVariant",
	"font-variant-alternates",
	"fontVariantAlternates",
	"font-variant-caps",
	"fontVariantCaps",
	"font-variant-east-asian",
	"fontVariantEastAsian",
	"font-variant-ligatures",
	"fontVariantLigatures",
	"font-variant-numeric",
	"fontVariantNumeric",
	"font-variant-position",
	"fontVariantPosition",
	"font-weight",
	"fontWeight",
	"gap",
	"grid",
	"grid-area",
	"gridArea",
	"grid-auto-columns",
	"gridAutoColumns",
	"grid-auto-flow",
	"gridAutoFlow",
	"grid-auto-rows",
	"gridAutoRows",
	"grid-column",
	"gridColumn",
	"grid-column-end",
	"gridColumnEnd",
	"grid-column-gap",
	"gridColumnGap",
	"grid-column-start",
	"gridColumnStart",
	"grid-gap",
	"gridGap",
	"grid-row",
	"gridRow",
	"grid-row-end",
	"gridRowEnd",
	"grid-row-gap",
	"gridRowGap",
	"grid-row-start",
	"gridRowStart",
	"grid-template",
	"gridTemplate",
	"grid-template-areas",
	"gridTemplateAreas",
	"grid-template-columns",
	"gridTemplateColumns",
	"grid-template-rows",
	"gridTemplateRows",
	"hanging-punctuation",
	"hangingPunctuation",
	"height",
	"hyphens",
	"image-orientation",
	"imageOrientation",
	"image-rendering",
	"imageRendering",
	"image-resolution",
	"imageResolution",
	"ime-mode",
	"imeMode",
	"initial-letter",
	"initialLetter",
	"initial-letter-align",
	"initialLetterAlign",
	"inline-size",
	"inlineSize",
	"inset",
	"inset-block",
	"insetBlock",
	"inset-block-end",
	"insetBlockEnd",
	"inset-block-start",
	"insetBlockStart",
	"inset-inline",
	"insetInline",
	"inset-inline-end",
	"insetInlineEnd",
	"inset-inline-start",
	"insetInlineStart",
	"isolation",
	"justify-content",
	"justifyContent",
	"justify-items",
	"justifyItems",
	"justify-self",
	"justifySelf",
	"left",
	"letter-spacing",
	"letterSpacing",
	"line-break",
	"lineBreak",
	"line-clamp",
	"lineClamp",
	"line-height",
	"lineHeight",
	"line-height-step",
	"lineHeightStep",
	"list-style",
	"listStyle",
	"list-style-image",
	"listStyleImage",
	"list-style-position",
	"listStylePosition",
	"list-style-type",
	"listStyleType",
	"margin",
	"margin-block",
	"marginBlock",
	"margin-block-end",
	"marginBlockEnd",
	"margin-block-start",
	"marginBlockStart",
	"margin-bottom",
	"marginBottom",
	"margin-inline",
	"marginInline",
	"margin-inline-end",
	"marginInlineEnd",
	"margin-inline-start",
	"marginInlineStart",
	"margin-left",
	"marginLeft",
	"margin-right",
	"marginRight",
	"margin-top",
	"marginTop",
	"mask",
	"mask-border",
	"maskBorder",
	"mask-border-mode",
	"maskBorderMode",
	"mask-border-outset",
	"maskBorderOutset",
	"mask-border-repeat",
	"maskBorderRepeat",
	"mask-border-slice",
	"maskBorderSlice",
	"mask-border-source",
	"maskBorderSource",
	"mask-border-width",
	"maskBorderWidth",
	"mask-clip",
	"maskClip",
	"mask-composite",
	"maskComposite",
	"mask-image",
	"maskImage",
	"mask-mode",
	"maskMode",
	"mask-origin",
	"maskOrigin",
	"mask-position",
	"maskPosition",
	"mask-repeat",
	"maskRepeat",
	"mask-size",
	"maskSize",
	"mask-type",
	"maskType",
	"max-block-size",
	"maxBlockSize",
	"max-height",
	"maxHeight",
	"max-inline-size",
	"maxInlineSize",
	"max-lines",
	"maxLines",
	"max-width",
	"maxWidth",
	"min-block-size",
	"minBlockSize",
	"min-height",
	"minHeight",
	"min-inline-size",
	"minInlineSize",
	"min-width",
	"minWidth",
	"mix-blend-mode",
	"mixBlendMode",
	"object-fit",
	"objectFit",
	"object-position",
	"objectPosition",
	"offset",
	"offset-anchor",
	"offsetAnchor",
	"offset-distance",
	"offsetDistance",
	"offset-path",
	"offsetPath",
	"offset-position",
	"offsetPosition",
	"offset-rotate",
	"offsetRotate",
	"opacity",
	"order",
	"orphans",
	"outline",
	"outline-color",
	"outlineColor",
	"outline-offset",
	"outlineOffset",
	"outline-style",
	"outlineStyle",
	"outline-width",
	"outlineWidth",
	"overflow",
	"overflow-anchor",
	"overflowAnchor",
	"overflow-block",
	"overflowBlock",
	"overflow-clip-box",
	"overflowClipBox",
	"overflow-inline",
	"overflowInline",
	"overflow-wrap",
	"overflowWrap",
	"overflow-x",
	"overflowX",
	"overflow-y",
	"overflowY",
	"overscroll-behavior",
	"overscrollBehavior",
	"overscroll-behavior-x",
	"overscrollBehaviorX",
	"overscroll-behavior-y",
	"overscrollBehaviorY",
	"padding",
	"padding-block",
	"paddingBlock",
	"padding-block-end",
	"paddingBlockEnd",
	"padding-block-start",
	"paddingBlockStart",
	"padding-bottom",
	"paddingBottom",
	"padding-inline",
	"paddingInline",
	"padding-inline-end",
	"paddingInlineEnd",
	"padding-inline-start",
	"paddingInlineStart",
	"padding-left",
	"paddingLeft",
	"padding-right",
	"paddingRight",
	"padding-top",
	"paddingTop",
	"page-break-after",
	"pageBreakAfter",
	"page-break-before",
	"pageBreakBefore",
	"page-break-inside",
	"pageBreakInside",
	"paint-order",
	"paintOrder",
	"perspective",
	"perspective-origin",
	"perspectiveOrigin",
	"place-content",
	"placeContent",
	"place-items",
	"placeItems",
	"place-self",
	"placeSelf",
	"pointer-events",
	"pointerEvents",
	"position",
	"quotes",
	"resize",
	"right",
	"rotate",
	"row-gap",
	"rowGap",
	"ruby-align",
	"rubyAlign",
	"ruby-merge",
	"rubyMerge",
	"ruby-position",
	"rubyPosition",
	"scale",
	"scrollbar-color",
	"scrollbarColor",
	"scrollbar-width",
	"scrollbarWidth",
	"scroll-behavior",
	"scrollBehavior",
	"scroll-margin",
	"scrollMargin",
	"scroll-margin-block",
	"scrollMarginBlock",
	"scroll-margin-block-start",
	"scrollMarginBlockStart",
	"scroll-margin-block-end",
	"scrollMarginBlockEnd",
	"scroll-margin-bottom",
	"scrollMarginBottom",
	"scroll-margin-inline",
	"scrollMarginInline",
	"scroll-margin-inline-start",
	"scrollMarginInlineStart",
	"scroll-margin-inline-end",
	"scrollMarginInlineEnd",
	"scroll-margin-left",
	"scrollMarginLeft",
	"scroll-margin-right",
	"scrollMarginRight",
	"scroll-margin-top",
	"scrollMarginTop",
	"scroll-padding",
	"scrollPadding",
	"scroll-padding-block",
	"scrollPaddingBlock",
	"scroll-padding-block-start",
	"scrollPaddingBlockStart",
	"scroll-padding-block-end",
	"scrollPaddingBlockEnd",
	"scroll-padding-bottom",
	"scrollPaddingBottom",
	"scroll-padding-inline",
	"scrollPaddingInline",
	"scroll-padding-inline-start",
	"scrollPaddingInlineStart",
	"scroll-padding-inline-end",
	"scrollPaddingInlineEnd",
	"scroll-padding-left",
	"scrollPaddingLeft",
	"scroll-padding-right",
	"scrollPaddingRight",
	"scroll-padding-top",
	"scrollPaddingTop",
	"scroll-snap-align",
	"scrollSnapAlign",
	"scroll-snap-coordinate",
	"scrollSnapCoordinate",
	"scroll-snap-destination",
	"scrollSnapDestination",
	"scroll-snap-points-x",
	"scrollSnapPointsX",
	"scroll-snap-points-y",
	"scrollSnapPointsY",
	"scroll-snap-stop",
	"scrollSnapStop",
	"scroll-snap-type",
	"scrollSnapType",
	"scroll-snap-type-x",
	"scrollSnapTypeX",
	"scroll-snap-type-y",
	"scrollSnapTypeY",
	"shape-image-threshold",
	"shapeImageThreshold",
	"shape-margin",
	"shapeMargin",
	"shape-outside",
	"shapeOutside",
	"tab-size",
	"tabSize",
	"table-layout",
	"tableLayout",
	"text-align",
	"textAlign",
	"text-align-last",
	"textAlignLast",
	"text-combine-upright",
	"textCombineUpright",
	"text-decoration",
	"textDecoration",
	"text-decoration-color",
	"textDecorationColor",
	"text-decoration-line",
	"textDecorationLine",
	"text-decoration-skip",
	"textDecorationSkip",
	"text-decoration-skip-ink",
	"textDecorationSkipInk",
	"text-decoration-style",
	"textDecorationStyle",
	"text-decoration-thickness",
	"textDecorationThickness",
	"text-emphasis",
	"textEmphasis",
	"text-emphasis-color",
	"textEmphasisColor",
	"text-emphasis-position",
	"textEmphasisPosition",
	"text-emphasis-style",
	"textEmphasisStyle",
	"text-indent",
	"textIndent",
	"text-justify",
	"textJustify",
	"text-orientation",
	"textOrientation",
	"text-overflow",
	"textOverflow",
	"text-rendering",
	"textRendering",
	"text-shadow",
	"textShadow",
	"text-size-adjust",
	"textSizeAdjust",
	"text-transform",
	"textTransform",
	"text-underline-offset",
	"textUnderlineOffset",
	"text-underline-position",
	"textUnderlinePosition",
	"top",
	"touch-action",
	"touchAction",
	"transform",
	"transform-box",
	"transformBox",
	"transform-origin",
	"transformOrigin",
	"transform-style",
	"transformStyle",
	"transition",
	"transition-delay",
	"transitionDelay",
	"transition-duration",
	"transitionDuration",
	"transition-property",
	"transitionProperty",
	"transition-timing-function",
	"transitionTimingFunction",
	"translate",
	"unicode-bidi",
	"unicodeBidi",
	"user-select",
	"userSelect",
	"vertical-align",
	"verticalAlign",
	"visibility",
	"white-space",
	"whiteSpace",
	"widows",
	"width",
	"will-change",
	"willChange",
	"word-break",
	"wordBreak",
	"word-spacing",
	"wordSpacing",
	"word-wrap",
	"wordWrap",
	"writing-mode",
	"writingMode",
	"z-index",
	"zIndex",
	"zoom"
];

var htmlTags = [
	"a",
	"abbr",
	"address",
	"area",
	"article",
	"aside",
	"audio",
	"b",
	"base",
	"bdi",
	"bdo",
	"blockquote",
	"body",
	"br",
	"button",
	"canvas",
	"caption",
	"cite",
	"code",
	"col",
	"colgroup",
	"data",
	"datalist",
	"dd",
	"del",
	"details",
	"dfn",
	"dialog",
	"div",
	"dl",
	"dt",
	"em",
	"embed",
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"head",
	"header",
	"hgroup",
	"hr",
	"html",
	"i",
	"iframe",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"link",
	"main",
	"map",
	"mark",
	"math",
	"menu",
	"menuitem",
	"meta",
	"meter",
	"nav",
	"noscript",
	"object",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"param",
	"picture",
	"pre",
	"progress",
	"q",
	"rb",
	"rp",
	"rt",
	"rtc",
	"ruby",
	"s",
	"samp",
	"script",
	"section",
	"select",
	"slot",
	"small",
	"source",
	"span",
	"strong",
	"style",
	"sub",
	"summary",
	"sup",
	"svg",
	"table",
	"tbody",
	"td",
	"template",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"title",
	"tr",
	"track",
	"u",
	"ul",
	"var",
	"video",
	"wbr"
];

const nano = nanoCss.create({
  pfx: 'stylix'
});

function myplugin(renderer) {
  const origPut = renderer.put;
  const cache = {};

  renderer.put = (selector, decls, atrule) => {
    const cacheKey = atrule ? `${atrule}{${selector}}` : selector;

    if (cache[cacheKey]) {
      return;
    }

    cache[cacheKey] = true;
    origPut(selector, decls, atrule);
  };
}

cache.addon(nano);
rule.addon(nano);
drule.addon(nano);
unitless.addon(nano);
prefixer.addon(nano);
stable.addon(nano);
nesting.addon(nano);
myplugin(nano);

function classifyProps(props) {
  const values = {
    styles: {},
    advanced: {},
    other: {}
  };
  Object.keys(props).forEach(key => {
    if (cssPropertyNames.includes(key)) {
      values.styles[key] = props[key];
    } else if (key[0] === '@' || key.includes('&')) {
      values.advanced[key] = props[key];
    } else {
      values.other[key] = props[key];
    }
  });
  return values;
}

function createRule(ref, styles) {
  if (!ref.current) {
    ref.current = nano.drule(styles);
    return ref.current();
  } else {
    return ref.current(styles);
  }
}

const Stylix = React.forwardRef(function Stylix(props, ref) {
  const {
    $el: El = 'div',
    $media,
    $selector,
    $inject,
    $injected,
    className,
    children
  } = props,
        rest = _objectWithoutPropertiesLoose(props, ["$el", "$disable", "$enable", "$media", "$selector", "$inject", "$injected", "className", "children"]);

  const styleProps = classifyProps(rest);
  let enabled = true;
  if ('$enable' in props && !props.$enable) enabled = false;
  if ('$disable' in props && props.$disable) enabled = false;
  const druleRef = React.useRef();

  if ($inject || $media) {
    const styles = _extends({}, styleProps.advanced);

    if ($media && $selector) {
      styles[`@media ${$media}`] = {
        [$selector]: styleProps.styles
      };
    } else if ($media) {
      styles[`@media ${$media}`] = styleProps.styles;
    } else if ($selector) {
      styles[$selector] = styleProps.styles;
    }

    return React.createElement(React.Fragment, null, React.Children.map(children, child => {
      if (!child.type) throw new Error("Sorry, you can't $inject styles to a child text node.");

      if (child.type.__isStylix) {
        return React.cloneElement(child, {
          $injected: enabled ? _extends({}, styles, {}, $injected) : $injected,
          ref
        });
      } else {
        const generatedClass = createRule(druleRef, _extends({}, enabled ? styles : {}, {}, $injected));
        return React.cloneElement(child, {
          className: [generatedClass || '', child.props.className || ''].join(' '),
          ref
        });
      }
    }));
  }

  if ($selector) {
    Object.assign(styleProps.advanced, {
      [$selector]: styleProps.styles
    });
    styleProps.styles = {};
  }

  const generatedClass = enabled ? createRule(druleRef, _extends({}, styleProps.styles, {}, styleProps.advanced, {}, $injected)) : '';
  return React.createElement(El, Object.assign({
    className: [generatedClass || '', className || ''].join(' ').trim(),
    ref: ref
  }, styleProps.other), children);
});
Stylix.displayName = 'Stylix';
Stylix.__isStylix = true;

for (const i in htmlTags) {
  const tag = htmlTags[i];

  const htmlComponent = props => React.createElement(Stylix, Object.assign({
    "$el": tag
  }, props));

  htmlComponent.displayName = 'Stylix.' + htmlTags[i];
  htmlComponent.__isStylix = true;
  Stylix[tag] = htmlComponent;
}

module.exports = Stylix;
//# sourceMappingURL=index.js.map
