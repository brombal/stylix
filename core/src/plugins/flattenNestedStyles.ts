import { isPlainObject } from '../util/isPlainObject';
import { StylixPlugin, StylixPluginFunctionContext } from './index';

function flatten(styles: any, parent: any, selector: string, root: any, mediaRoot: any) {
  for (let key in styles) {
    const value = styles[key];
    if (key.startsWith('@media')) {
      // Flatten media queries, but nest them under the root object
      root[key] = root[key] || {};
      flatten(value, root[key], selector, root, root[key]);
    } else if (key.startsWith('@keyframes')) {
      // Add keyframe rules as-is directly to mediaRoot object
      mediaRoot[key] = value;
    } else if (key.startsWith('@container')) {
      // Flatten container queries, but nest them under the mediaRoot object
      mediaRoot[key] = mediaRoot[key] || {};
      flatten(value, mediaRoot[key], selector, root, mediaRoot[key]);
    } else if (isPlainObject(styles[key])) {
      // Concatenate or replace & in selectors and then continue flattening styles
      if (key.includes('&')) {
        key = key.replace(/&/g, selector);
      } else {
        key = (selector + ' ' + key).trim();
      }
      parent[key] = parent[key] || {};
      flatten(value, parent, key, root, mediaRoot);
    } else {
      // Selector is just a css property
      parent[selector] = parent[selector] || {};
      parent[selector][key] = styles[key];
    }
  }
}

/**
 * Flattens nested style objects that use `&` to reference parent class.
 */
export const flattenNestedStyles: StylixPlugin = {
  name: 'flattenNestedStyles',
  type: 'processStyles',
  plugin(ctx: StylixPluginFunctionContext, styles: any) {
    const flattened = {};
    flatten(styles, flattened, '', flattened, flattened);
    return flattened;
  },
};
