import { mapObjectRecursive } from '../util/mapObjectRecursive';
import { StylixPlugin, StylixPluginFunctionContext } from './index';

/**
 * Evaluates functions in style objects, providing the theme and media from the current Stylix context.
 */
export const themeFunctions: StylixPlugin = {
  name: 'themeFunctions',
  type: 'preprocessStyles',
  plugin(ctx: StylixPluginFunctionContext, styles: any) {
    return mapObjectRecursive(styles, (key, value) => {
      if (typeof value === 'function') {
        return { [key]: value(ctx.theme, ctx) };
      }
    });
  },
};
