"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPixelUnits = exports.defaultUnits = exports.defaultIgnoreUnits = void 0;
const mapObjectRecursive_1 = require("../util/mapObjectRecursive");
exports.defaultIgnoreUnits = [
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
const defaultUnits = (unit = 'px', ignoreProps = exports.defaultIgnoreUnits) => {
    return {
        name: 'defaultUnits',
        type: 'processStyles',
        plugin(ctx, styles) {
            return mapObjectRecursive_1.mapObjectRecursive(styles, defaultUnitsMap, { unit, ignoreProps });
        },
    };
};
exports.defaultUnits = defaultUnits;
const defaultUnitsMap = (key, value, object, ctx) => {
    if (typeof value === 'number' && !ctx.ignoreProps.includes(key)) {
        return { [key]: String(value) + ctx.unit };
    }
};
exports.defaultPixelUnits = exports.defaultUnits();
//# sourceMappingURL=defaultUnits.js.map