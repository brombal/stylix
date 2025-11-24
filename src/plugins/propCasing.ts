import { isStyleProp } from '../classifyProps';
import { type MapObjectFunction, mapObject } from '../util/mapObject';
import type { StylixPlugin, StylixPluginFunctionContext } from './index';

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

const propCasingMap: MapObjectFunction<{ ctx: StylixPluginFunctionContext }> = (
  key,
  value,
  target,
  context,
  mapRecursive,
) => {
  if (typeof key !== 'string' || key === '&') {
    target[key] = mapRecursive(value);
    return;
  }

  const simpleKey = isStyleProp(key, context.ctx.styleProps);
  if (simpleKey) {
    target[context.ctx.styleProps[simpleKey]] = mapRecursive(value);
    return;
  }

  target[key] = mapRecursive(value);
};
