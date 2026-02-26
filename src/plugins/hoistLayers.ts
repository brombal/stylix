import { isPlainObject } from '../util/isPlainObject';
import type { StylixPlugin } from './index';

export function _hoistLayers(styles: any, root: any) {
  for (const key in styles) {
    const value = styles[key];
    if (typeof value === 'string' && key.startsWith('@layer')) {
      // Add layer rules as-is directly to root object
      root['@layer'] ||= [];
      root['@layer'].push(value.replace('@layer', '').trim());
      if (styles !== root) delete styles[key];
    } else if (isPlainObject(value)) {
      // Recursively flatten nested styles
      _hoistLayers(value, root);
    }
  }
  return styles;
}

/**
 * Hoists @layer declarations to root of styles object.
 */
export const hoistLayers: StylixPlugin = {
  name: 'hoistLayers',
  type: 'processStyles',
  plugin(_ctx, styles) {
    if (styles && typeof styles === 'object' && !Array.isArray(styles)) styles['@layer'] = [];
    return _hoistLayers(styles, styles);
  },
};
