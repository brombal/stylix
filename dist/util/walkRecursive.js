"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walkRecursive = void 0;
const cloneDeep_1 = require("./cloneDeep");
const isPlainObject_1 = require("./isPlainObject");
/**
 * Invokes a callback for each key/value pair in `object`, and continues recursively on each value that is an array or a
 * plain object. Returns `object`.
 * The `cb` function will receive the key, the value, the current object being mapped, and a context object.
 * The context object is a plain object that you can modify as needed. The value will persist to subsequent calls to
 * `map` on child properties of `value`.
 */
function walkRecursive(object, cb, context) {
    const keys = Object.keys(object);
    for (const key of keys) {
        const value = object[key];
        cb(key, value, object, context);
        if (Array.isArray(value) || (0, isPlainObject_1.isPlainObject)(value)) {
            const contextClone = (0, cloneDeep_1.cloneDeep)(context);
            walkRecursive(value, cb, contextClone);
        }
    }
    return object;
}
exports.walkRecursive = walkRecursive;
//# sourceMappingURL=walkRecursive.js.map