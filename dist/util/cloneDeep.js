"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneDeep = void 0;
const isPlainObject_1 = require("./isPlainObject");
/**
 * Deeply clones a value.
 */
function cloneDeep(value) {
    if (!value || typeof value !== 'object')
        return value;
    if (Array.isArray(value)) {
        const clone = [];
        for (let index = 0; index < value.length; ++index) {
            clone.push(cloneDeep(value[index]));
        }
        return clone;
    }
    if (isPlainObject_1.isPlainObject(value)) {
        const clone = {};
        for (const key in value) {
            clone[key] = cloneDeep(value[key]);
        }
        return clone;
    }
    return value;
}
exports.cloneDeep = cloneDeep;
//# sourceMappingURL=cloneDeep.js.map