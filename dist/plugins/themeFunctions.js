import { mapObjectRecursive } from '../util/mapObjectRecursive';
/**
 * Evaluates functions in style objects, providing the theme and media from the current Stylix context.
 */
export const themeFunctions = {
    name: 'themeFunctions',
    type: 'preprocessStyles',
    plugin(ctx, styles) {
        return mapObjectRecursive(styles, (key, value) => {
            if (typeof value === 'function') {
                return { [key]: value(ctx.theme, ctx) };
            }
        });
    },
};
//# sourceMappingURL=themeFunctions.js.map