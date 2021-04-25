import { isPlainObject } from '../util/isPlainObject';
function cleanObject(object) {
    Object.entries(object).forEach(([key, value]) => {
        if (isPlainObject(value) || Array.isArray(value)) {
            cleanObject(value);
            if (!Object.keys(value).length)
                delete object[key];
        }
        else if (value === null || value === undefined || value === '')
            delete object[key];
    });
    return object;
}
/**
 * Fixes casing and hyphenation on known style props
 */
export const cleanStyles = {
    name: 'cleanStyles',
    type: 'processStyles',
    plugin(ctx, styles) {
        return cleanObject(styles);
    },
};
//# sourceMappingURL=cleanStyles.js.map