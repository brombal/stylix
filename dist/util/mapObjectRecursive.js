"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapObjectRecursive = void 0;
const isPlainObject_1 = require("./isPlainObject");
/**
 * Invokes `map` on each key/value pair in `object`. The key/value pair is deleted from the object and replaced by
 * merging in the object returned from `map`. Recursively descends into all object and array values.
 * The `map` function will receive the key, the value, the current object being mapped, and a context object.
 * The context object is a plain object that you can modify as needed. The value will persist to subsequent calls to
 * `map` on child properties of `value`.
 */
function mapObjectRecursive(object, map, context = {}) {
    const clone = Array.isArray(object) ? [] : {};
    for (const k of Object.keys(object)) {
        let key = k;
        const value = object[key];
        if (Array.isArray(object))
            key = +key;
        const contextClone = Object.assign({}, context);
        let result = map(key, value, object, contextClone);
        if (typeof result !== 'undefined' && typeof result !== 'object' && !Array.isArray(result))
            throw new Error('mapObjectRecursive: return value of map function must be undefined, object, or array!');
        if (typeof result === 'undefined') {
            result = { [key]: value };
        }
        for (const kk in result) {
            let value = result[kk];
            if ((0, isPlainObject_1.isPlainObject)(value) || Array.isArray(value))
                value = mapObjectRecursive(value, map, contextClone);
            if (typeof value !== 'undefined')
                clone[kk] = value;
        }
    }
    return clone;
}
exports.mapObjectRecursive = mapObjectRecursive;
//# sourceMappingURL=mapObjectRecursive.js.map