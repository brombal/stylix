import { isPlainObject } from '../util/isPlainObject';
import type { StylixPlugin, StylixPluginFunctionContext } from './index';

function _hoistKeyframes(styles: any, root: any, ctx: StylixPluginFunctionContext) {
  for (const key in styles) {
    const value = styles[key];
    if (key.startsWith('@keyframes')) {
      // Add keyframe rules as-is directly to root object
      root[key] = value;
      if (styles !== root) delete styles[key];
    }
    if (key.startsWith('@scope')) {
      // Add scopes rules as-is directly to root object
      root[key] = { [`.${ctx.className}`]: value };
      if (styles !== root) delete styles[key];
    } else if (isPlainObject(value)) {
      // Recursively flatten nested styles
      _hoistKeyframes(value, root, ctx);
    }
  }
  return styles;
}

/**
 * Hoists @keyframe declarations to root of styles object.
 */
export const hoistKeyframes: StylixPlugin = {
  name: 'hoistKeyframes',
  type: 'processStyles',
  plugin(_ctx, styles) {
    return _hoistKeyframes(styles, styles, _ctx);
  },
};
