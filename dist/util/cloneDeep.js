import { isPlainObject } from './isPlainObject';
/**
 * Deeply clones a value.
 */
export function cloneDeep(value) {
    if (Array.isArray(value)) {
        const clone = [];
        for (let index = 0; index < value.length; ++index) {
            clone.push(cloneDeep(value[index]));
        }
        return clone;
    }
    else if (isPlainObject(value)) {
        const clone = {};
        for (const key in value) {
            clone[key] = cloneDeep(value[key]);
        }
        return clone;
    }
    else
        return value;
}
//# sourceMappingURL=cloneDeep.js.map