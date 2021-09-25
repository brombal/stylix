import { flatten } from '../util/flatten';
import { isPlainObject } from '../util/isPlainObject';
import { StylixPlugin, StylixPluginFunctionContext } from './index';

/**
 * Merges $css property into parent styles
 */
export const merge$css: StylixPlugin = {
  name: 'merge$css',
  type: 'processStyles',
  plugin(ctx: StylixPluginFunctionContext, styles: any) {
    const result = {};
    _merge$css(styles, result);
    return result;
  },
};

export function _merge$css(obj: any, ctx: any) {
  if (!isPlainObject(obj)) return;
  for (const key in obj) {
    if (key === '$css') {
      const $css = obj[key];
      if (Array.isArray($css)) {
        const flat$css = flatten($css);
        for (const val of flat$css) {
          _merge$css(val, ctx);
        }
      } else {
        _merge$css($css, ctx);
      }
    } else {
      let value = obj[key];
      if (isPlainObject(value)) {
        value = ctx[key] || {};
        _merge$css(obj[key], value);
      }
      ctx[key] = value;
    }
  }
}
