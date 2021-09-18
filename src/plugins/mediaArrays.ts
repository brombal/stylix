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
    styles = mapObjectRecursive(styles, mapDittoValues);
    const mediaStyles = {};
    let nonMediaStyles = styles;
    for (const i in ctx.media) {
      const mediaQuery = ctx.media[i];
      if (!mediaQuery) {
        nonMediaStyles = mapObjectRecursive(styles, mapNonMedia, { i });
      } else {
        mediaStyles[`@media ${mediaQuery}`] = mapObjectRecursive(styles, mapMediaStyles, { i });
      }
    }
    return { ...nonMediaStyles, ...mediaStyles };
  },
};

function mapDittoValues(key, value) {
  if (Array.isArray(value)) {
    for (const i in value) {
      const v = value[i];
      if (v === '@') value[i] = value[+i - 1];
    }
    return { [key]: value };
  }
}

function mapNonMedia(key, value, object, context) {
  if (Array.isArray(value)) {
    return { [key]: value[context.i] };
  }
}

function mapMediaStyles(key: string, value, object, context) {
  if (key.startsWith('@keyframes')) context.keyframes = true;
  if (Array.isArray(value)) {
    return { [key]: value[context.i] };
  }
  if (isPlainObject(value) || context.keyframes) {
    return;
  }
  // delete key/value pair if primitive
  return { [key]: undefined };
}
