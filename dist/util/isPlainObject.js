/**
 * Indicates that an object is most likely just an object literal.
 */
export function isPlainObject(obj) {
    return (obj === null || obj === void 0 ? void 0 : obj.__proto__) === Object.prototype;
}
//# sourceMappingURL=isPlainObject.js.map