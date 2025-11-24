import { type MapObjectFunction, mapObject } from '../util/mapObject';
import type { StylixPlugin, StylixPluginFunctionContext } from './index';

/**
 * Replaces $$class with class name in string values
 */
export const replace$$class: StylixPlugin = {
  name: 'replace$$class',
  type: 'processStyles',
  plugin(ctx, styles) {
    return mapObject(styles, replace$$classMap, { ctx });
  },
};

const replace$$classMap: MapObjectFunction<{ ctx: StylixPluginFunctionContext }> = (
  key,
  value,
  target,
  context,
  mapRecursive,
) => {
  value =
    typeof value === 'string'
      ? value.replaceAll('$$class', context.ctx.className || '')
      : mapRecursive(value);
  key = typeof key === 'string' ? key.replaceAll('$$class', context.ctx.className || '') : key;
  target[key] = value;
};
