"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = void 0;
/**
 * Cheap string hashing, suitable for generating css class names
 */
function hashString(str) {
    let hash = 5381;
    let i = str.length;
    while (i)
        hash = (hash * 33) ^ str.charCodeAt(--i);
    return 'stylix-' + (hash >>> 0).toString(36);
}
exports.hashString = hashString;
//# sourceMappingURL=hashString.js.map