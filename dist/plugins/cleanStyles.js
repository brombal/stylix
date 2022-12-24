"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanStyles = void 0;
const isPlainObject_1 = require("../util/isPlainObject");
function cleanObject(object) {
    for (const key in object) {
        const value = object[key];
        if (value === null || value === undefined || value === '')
            delete object[key];
        else if ((0, isPlainObject_1.isPlainObject)(value) || Array.isArray(value)) {
            cleanObject(value);
            if (!Object.keys(value).length)
                delete object[key];
        }
    }
    return object;
}
/**
 * Fixes casing and hyphenation on known style props
 */
exports.cleanStyles = {
    name: 'cleanStyles',
    type: 'processStyles',
    plugin(ctx, styles) {
        return cleanObject(styles);
    },
};
//# sourceMappingURL=cleanStyles.js.map