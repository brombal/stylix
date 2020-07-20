/**
 * Cheap string hashing, suitable for generating css class names
 */
export function hashString(str) {
    let hash = 5381, i = str.length;
    while (i)
        hash = (hash * 33) ^ str.charCodeAt(--i);
    return '_' + (hash >>> 0).toString(36);
}
export function camelToHyphen(str) {
    return str
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase();
}
/**
 * Indicates that an object is most likely just an object literal.
 */
export function isPlainObject(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.__proto__) === Object.prototype;
}
//# sourceMappingURL=utils.js.map