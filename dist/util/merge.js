"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const isPlainObject_1 = require("./isPlainObject");
function merge(...items) {
    items = items.filter((item) => typeof item !== 'undefined' && item !== null);
    if (!(items === null || items === void 0 ? void 0 : items.length))
        return undefined;
    if (items.length === 1)
        return items[0];
    // If items are not all objects/arrays, return the last object/array if possible, otherwise last non-undefined value
    if (!items.every((item) => Array.isArray(item) || (0, isPlainObject_1.isPlainObject)(item))) {
        items.reverse();
        return (items.find((item) => Array.isArray(item) || (0, isPlainObject_1.isPlainObject)(item)) ||
            items.find((item) => typeof item !== 'undefined'));
    }
    const merged = Array.isArray(items[0]) ? [] : {};
    for (const item of items) {
        if (!Array.isArray(item) && !(0, isPlainObject_1.isPlainObject)(item))
            return merged;
        const keys = [...Object.keys(item), ...Object.getOwnPropertySymbols(item)];
        for (const key of keys) {
            const result = merge(merged[key], item[key]);
            if (typeof result !== 'undefined')
                merged[key] = result;
        }
    }
    return merged;
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map