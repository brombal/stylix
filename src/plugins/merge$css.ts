import { flatten } from '../util/flatten';
import { isPlainObject } from '../util/isPlainObject';
import { StylixPlugin, StylixPluginFunctionContext } from './index';

export function _merge$css(obj: any, ctx: any) {
  if (!isPlainObject(obj)) return;
  Object.keys(obj).forEach((key) => {
    if (key === '$css') {
      const $css = obj[key];
      if (Array.isArray($css)) {
        flatten($css).forEach((val) => {
          _merge$css(val, ctx);
        });
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
  });
}

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
