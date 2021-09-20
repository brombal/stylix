"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeFunctions = void 0;
const mapObjectRecursive_1 = require("../util/mapObjectRecursive");
/**
 * Evaluates functions in style objects, providing the theme and media from the current Stylix context.
 */
exports.themeFunctions = {
    name: 'themeFunctions',
    type: 'preprocessStyles',
    plugin(ctx, styles) {
        return mapObjectRecursive_1.mapObjectRecursive(styles, themeFunctionsMap, { ctx });
    },
};
function themeFunctionsMap(key, value, object, context) {
    if (typeof value === 'function') {
        return { [key]: value(context.ctx.theme, context.ctx) };
    }
}
//# sourceMappingURL=themeFunctions.js.map