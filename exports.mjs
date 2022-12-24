export { useStylixContext, useStylixTheme, StylixProvider, StylixTheme, } from './dist/StylixProvider';
export { useStyles, useKeyframes, useGlobalStyles } from './dist/useStyles';
export { defaultPlugins, customProps } from './dist/plugins';
export { mapObjectRecursive } from './dist/util/mapObjectRecursive';
export { walkRecursive } from './dist/util/walkRecursive';
export { createStyleCollector, styleCollectorContext } from './dist/styleCollector';
import $ from './dist/Stylix';
export default $.default;