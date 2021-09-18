"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = void 0;
/**
 * Indicates that an object is most likely just an object literal.
 */
function isPlainObject(obj) {
    return typeof obj === 'object' && (obj === null || obj === void 0 ? void 0 : obj.__proto__) === Object.prototype;
}
exports.isPlainObject = isPlainObject;
//# sourceMappingURL=isPlainObject.js.map