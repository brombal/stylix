import { simplifyStylePropName } from '../classifyProps.ts';
import { mapObjectRecursive } from '../util/mapObjectRecursive.ts';
import { StylixPlugin, StylixPluginFunctionContext } from './index.ts';

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

function propCasingMap(key: string | number, value: any, object: any, context: any) {
  if (typeof key === 'string' && context.ctx.styleProps[simplifyStylePropName(key)]) {
    return { [context.ctx.styleProps[simplifyStylePropName(key)]]: value };
  }
}
