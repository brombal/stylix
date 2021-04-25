/**
 * Flatten an array recursively.
 */
export function flatten(array) {
    const result = [];
    _flatten(array, result);
    return result;
}
function _flatten(array, result) {
    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        Array.isArray(value) ? _flatten(value, result) : result.push(value);
    }
}
//# sourceMappingURL=flatten.js.map