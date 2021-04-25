import { isPlainObject } from '../util/isPlainObject';
import { mapObjectRecursive } from '../util/mapObjectRecursive';
import { StylixPlugin, StylixPluginFunctionContext } from './index';

/**
 * Expands arrays as media queries.
 */
export const mediaArrays: StylixPlugin = {
  name: 'mediaArrays',
  type: 'processStyles',
  plugin(ctx: StylixPluginFunctionContext, styles: any) {
    // Fill out ditto values
    styles = mapObjectRecursive(styles, (key, value) => {
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          if (v === '@') value[i] = value[i - 1];
        });
        return { [key]: value };
      }
    });
    const mediaStyles = {};
    let nonMediaStyles = styles;
    ctx.media?.forEach((mediaQuery, i) => {
      if (!mediaQuery) {
        nonMediaStyles = mapObjectRecursive(styles, (key, value) => {
          if (Array.isArray(value)) {
            return { [key]: value[i] };
          }
        });
      } else {
        mediaStyles[`@media ${mediaQuery}`] = mapObjectRecursive(
          styles,
          (key: string, value, object, context) => {
            if (key.startsWith('@keyframes')) context.keyframes = true;
            if (Array.isArray(value)) {
              return { [key]: value[i] };
            }
            if (isPlainObject(value) || context.keyframes) {
              return;
            }
            // delete key/value pair if primitive
            return { [key]: undefined };
          },
        );
      }
    });
    return { ...nonMediaStyles, ...mediaStyles };
  },
};
