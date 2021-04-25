import { cloneDeep } from '../util/cloneDeep';
import { cleanStyles } from './cleanStyles';
import { defaultPixelUnits } from './defaultUnits';
import { flattenNestedStyles } from './flattenNestedStyles';
import { mediaArrays } from './mediaArrays';
import { merge$css } from './merge$css';
import { propCasing } from './propCasing';
import { replace$$class } from './replace$$class';
import { themeFunctions } from './themeFunctions';
export function applyPlugins(type, styles, hash, context) {
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
    context.plugins
        .filter((plugin) => plugin.type === type)
        .forEach((plugin) => {
        processedStyles = plugin.plugin(pluginContext, cloneDeep(processedStyles));
    });
    return processedStyles;
}
export { customProps } from './customProps';
export const defaultPlugins = {
    themeFunctions,
    merge$css,
    mediaArrays,
    propCasing,
    flattenNestedStyles,
    replace$$class,
    defaultPixelUnits,
    cleanStyles,
};
//# sourceMappingURL=index.js.map