"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = void 0;
/**
 * Flatten an array recursively.
 */
function flatten(array) {
    const result = [];
    _flatten(array, result);
    return result;
}
exports.flatten = flatten;
function _flatten(array, result) {
    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        Array.isArray(value) ? _flatten(value, result) : result.push(value);
    }
}
//# sourceMappingURL=flatten.js.map