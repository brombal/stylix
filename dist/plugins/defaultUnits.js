import { mapObjectRecursive } from '../util/mapObjectRecursive';
export const defaultIgnoreUnits = [
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
export const defaultUnits = (unit = 'px', ignoreProps = defaultIgnoreUnits) => {
    return {
        name: 'defaultUnits',
        type: 'processStyles',
        plugin(ctx, styles) {
            return mapObjectRecursive(styles, (key, value) => {
                if (typeof value === 'number' && !ignoreProps.includes(key)) {
                    return { [key]: String(value) + unit };
                }
            });
        },
    };
};
export const defaultPixelUnits = defaultUnits();
//# sourceMappingURL=defaultUnits.js.map