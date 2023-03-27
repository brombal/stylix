import { mapObjectRecursive } from '../util/mapObjectRecursive';
import { StylixPlugin, StylixPluginFunctionContext } from './index';

/**
 * Replaces $$class with hash in string values
 */
export const replace$$class: StylixPlugin = {
  name: 'replace$$class',
  type: 'processStyles',
  plugin(ctx: StylixPluginFunctionContext, styles: any) {
    return mapObjectRecursive(styles, replace$$classMap, { ctx });
  },
};

function replace$$classMap(key: string | number, value: any, object: any, context: any) {
  value = typeof value === 'string' ? value.replace('$$class', context.ctx.hash) : value;
  key = typeof key === 'string' ? key.replace('$$class', context.ctx.hash) : key;
  return { [key]: value };
}
