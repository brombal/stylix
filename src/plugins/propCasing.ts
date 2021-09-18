import { simplifyStylePropName } from '../classifyProps';
import { mapObjectRecursive } from '../util/mapObjectRecursive';
import { StylixPlugin, StylixPluginFunctionContext } from './index';

/**
 * Fixes casing and hyphenation on known style props
 */
export const propCasing: StylixPlugin = {
  name: 'normalizeStyleProps',
  type: 'processStyles',
  plugin(ctx: StylixPluginFunctionContext, styles: any) {
    return mapObjectRecursive(styles, propCasingMap, { ctx });
  },
};

function propCasingMap(key, value, object, context) {
  if (typeof key === 'string' && context.ctx.styleProps[simplifyStylePropName(key)]) {
    return { [context.ctx.styleProps[simplifyStylePropName(key)]]: value };
  }
}
