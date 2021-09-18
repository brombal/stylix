import { mapObjectRecursive } from '../util/mapObjectRecursive';
import { StylixPlugin, StylixPluginFunctionContext } from './index';

/**
 * Evaluates functions in style objects, providing the theme and media from the current Stylix context.
 */
export const themeFunctions: StylixPlugin = {
  name: 'themeFunctions',
  type: 'preprocessStyles',
  plugin(ctx: StylixPluginFunctionContext, styles: any) {
    return mapObjectRecursive(styles, themeFunctionsMap, { ctx });
  },
};

function themeFunctionsMap(key, value, object, context) {
  if (typeof value === 'function') {
    return { [key]: value(context.ctx.theme, context.ctx) };
  }
}
