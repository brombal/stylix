import { mapObjectRecursive } from '../util/mapObjectRecursive';
/**
 * Replaces $$class with hash in string values
 */
export const replace$$class = {
    name: 'replace$$class',
    type: 'processStyles',
    plugin(ctx, styles) {
        return mapObjectRecursive(styles, (key, value) => {
            value = typeof value === 'string' ? value.replace('$$class', ctx.hash) : value;
            key = typeof key === 'string' ? key.replace('$$class', ctx.hash) : key;
            return { [key]: value };
        });
    },
};
//# sourceMappingURL=replace$$class.js.map