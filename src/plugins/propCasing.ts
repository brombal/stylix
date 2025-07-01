import { isStyleProp } from '../classifyProps';
import type { StylixContext } from '../StylixProvider';
import { type MapObjectFunction, mapObject } from '../util/mapObject';
import type { StylixPlugin } from './index';

/**
 * Fixes casing and hyphenation on known style props
 */
export const propCasing: StylixPlugin = {
  name: 'propCasing',
  type: 'processStyles',
  plugin(ctx, styles) {
    return mapObject(styles, propCasingMap, { ctx });
  },
};

const propCasingMap: MapObjectFunction = (
  key,
  value,
  _object,
  context: { ctx: StylixContext },
  mapRecursive,
) => {
  if (typeof key !== 'string' || key === '&') return { [key]: mapRecursive(value) };
  const simpleKey = isStyleProp(key, context.ctx.styleProps);
  if (simpleKey) {
    return { [context.ctx.styleProps[simpleKey]]: mapRecursive(value) };
  }
  return { [key]: mapRecursive(value) };
};
