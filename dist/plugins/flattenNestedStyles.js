"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenNestedStyles = void 0;
const isPlainObject_1 = require("../util/isPlainObject");
function flatten(styles, parent, selector, root, mediaRoot) {
    for (let key in styles) {
        const value = styles[key];
        if (key.startsWith('@media')) {
            // Flatten media queries, but nest them under the root object
            root[key] = root[key] || {};
            flatten(value, root[key], selector, root, root[key]);
        }
        else if (key.startsWith('@keyframes')) {
            // Add keyframe rules as-is directly to mediaRoot object
            mediaRoot[key] = value;
        }
        else if ((0, isPlainObject_1.isPlainObject)(styles[key])) {
            // Concatenate or replace & in selectors and then continue flattening styles
            if (key.includes('&')) {
                key = key.replace(/&/g, selector);
            }
            else {
                key = (selector + ' ' + key).trim();
            }
            parent[key] = parent[key] || {};
            flatten(value, parent, key, root, mediaRoot);
        }
        else {
            // Selector is just a css property
            parent[selector] = parent[selector] || {};
            parent[selector][key] = styles[key];
        }
    }
}
/**
 * Flattens nested style objects that use `&` to reference parent class.
 */
exports.flattenNestedStyles = {
    name: 'flattenNestedStyles',
    type: 'processStyles',
    plugin(ctx, styles) {
        const flattened = {};
        flatten(styles, flattened, '', flattened, flattened);
        return flattened;
    },
};
//# sourceMappingURL=flattenNestedStyles.js.map