import { simplifyStylePropName } from '../classifyProps';
import { mapObjectRecursive } from '../util/mapObjectRecursive';
import { StylixPlugin, StylixPluginFunctionContext } from './index';

/**
 * Fixes casing and hyphenation on known style props
 */
export const propCasing: StylixPlugin = {
  name: 'propCasing',
  type: 'processStyles',
  plugin(ctx: StylixPluginFunctionContext, styles: any) {
    return mapObjectRecursive(styles, propCasingMap, { ctx });
  },
};

function propCasingMap(key: string | number, value: any, object: any, context: any) {
  if (typeof key !== 'string' || key === '&') return;
  const simpleKey = simplifyStylePropName(key);
  if (simpleKey && simpleKey in context.ctx.styleProps) {
    return { [context.ctx.styleProps[simpleKey]]: value };
  }
}
