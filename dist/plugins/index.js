"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPlugins = exports.customProps = exports.applyPlugins = void 0;
const cleanStyles_1 = require("./cleanStyles");
const defaultUnits_1 = require("./defaultUnits");
const flattenNestedStyles_1 = require("./flattenNestedStyles");
const mediaArrays_1 = require("./mediaArrays");
const merge_css_1 = require("./merge$css");
const propCasing_1 = require("./propCasing");
const replace__class_1 = require("./replace$$class");
const themeFunctions_1 = require("./themeFunctions");
function applyPlugins(type, styles, hash, context) {
    const pluginContext = {
        id: context.id,
        devMode: context.devMode,
        theme: context.theme,
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
exports.applyPlugins = applyPlugins;
var customProps_1 = require("./customProps");
Object.defineProperty(exports, "customProps", { enumerable: true, get: function () { return customProps_1.customProps; } });
exports.defaultPlugins = {
    themeFunctions: themeFunctions_1.themeFunctions,
    merge$css: merge_css_1.merge$css,
    mediaArrays: mediaArrays_1.mediaArrays,
    propCasing: propCasing_1.propCasing,
    flattenNestedStyles: flattenNestedStyles_1.flattenNestedStyles,
    replace$$class: replace__class_1.replace$$class,
    defaultPixelUnits: defaultUnits_1.defaultPixelUnits,
    cleanStyles: cleanStyles_1.cleanStyles,
};
//# sourceMappingURL=index.js.map