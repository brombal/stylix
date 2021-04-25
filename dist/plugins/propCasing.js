import { simplifyStylePropName } from '../classifyProps';
import { mapObjectRecursive } from '../util/mapObjectRecursive';
/**
 * Fixes casing and hyphenation on known style props
 */
export const propCasing = {
    name: 'normalizeStyleProps',
    type: 'processStyles',
    plugin(ctx, styles) {
        return mapObjectRecursive(styles, (key, value) => {
            if (typeof key === 'string' && ctx.styleProps[simplifyStylePropName(key)]) {
                return { [ctx.styleProps[simplifyStylePropName(key)]]: value };
            }
        });
    },
};
//# sourceMappingURL=propCasing.js.map