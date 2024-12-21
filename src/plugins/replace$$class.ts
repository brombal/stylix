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

const replace$$classMap: MapObjectFunction = (
  key,
  value,
  object,
  context: { ctx: StylixPluginFunctionContext },
  mapRecursive,
) => {
  value =
    typeof value === 'string'
      ? value.replace('$$class', context.ctx.className || '')
      : mapRecursive(value);
  key = typeof key === 'string' ? key.replace('$$class', context.ctx.className || '') : key;
  return { [key]: value };
};
