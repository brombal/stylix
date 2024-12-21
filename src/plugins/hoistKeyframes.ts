import { isPlainObject } from '../util/isPlainObject';
import type { StylixPlugin } from './index';

function _hoistKeyframes(styles: any, root: any) {
  for (const key in styles) {
    const value = styles[key];
    if (key.startsWith('@keyframes')) {
      // Add keyframe rules as-is directly to root object
      root[key] = value;
      if (styles !== root) delete styles[key];
    } else if (isPlainObject(value)) {
      // Recursively flatten nested styles
      _hoistKeyframes(value, root);
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
  plugin(ctx, styles) {
    return _hoistKeyframes(styles, styles);
  },
};
