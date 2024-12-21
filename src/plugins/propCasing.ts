import type { StylixContext } from '../StylixProvider';
import { simplifyStylePropName } from '../classifyProps';
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
  object,
  context: { ctx: StylixContext },
  mapRecursive,
) => {
  if (typeof key !== 'string' || key === '&') return { [key]: mapRecursive(value) };
  const simpleKey = simplifyStylePropName(key);
  if (simpleKey && simpleKey in context.ctx.styleProps) {
    return { [context.ctx.styleProps[simpleKey]]: mapRecursive(value) };
  }
  return { [key]: mapRecursive(value) };
};
