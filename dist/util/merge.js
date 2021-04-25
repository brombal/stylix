import { isPlainObject } from './isPlainObject';
export function merge(...items) {
    items = items.filter((item) => typeof item !== 'undefined' && item !== null);
    if (!(items === null || items === void 0 ? void 0 : items.length))
        return undefined;
    if (items.length === 1)
        return items[0];
    // If items are not all objects/arrays, return the last object/array if possible, otherwise last non-undefined value
    if (!items.every((item) => Array.isArray(item) || isPlainObject(item))) {
        items.reverse();
        return (items.find((item) => Array.isArray(item) || isPlainObject(item)) ||
            items.find((item) => typeof item !== 'undefined'));
    }
    return items.reduce((merged, item) => {
        if (!Array.isArray(item) && !isPlainObject(item))
            return merged;
        [...Object.keys(item), ...Object.getOwnPropertySymbols(item)].forEach((key) => {
            const result = merge(merged[key], item[key]);
            if (typeof result !== 'undefined')
                merged[key] = result;
        });
        return merged;
    }, Array.isArray(items[0]) ? [] : {});
}
//# sourceMappingURL=merge.js.map