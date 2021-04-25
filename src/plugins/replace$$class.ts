import { mapObjectRecursive } from '../util/mapObjectRecursive';
import { StylixPlugin, StylixPluginFunctionContext } from './index';

/**
 * Replaces $$class with hash in string values
 */
export const replace$$class: StylixPlugin = {
  name: 'replace$$class',
  type: 'processStyles',
  plugin(ctx: StylixPluginFunctionContext, styles: any) {
    return mapObjectRecursive(styles, (key, value) => {
      value = typeof value === 'string' ? value.replace('$$class', ctx.hash) : value;
      key = typeof key === 'string' ? key.replace('$$class', ctx.hash) : key;
      return { [key]: value };
    });
  },
};
