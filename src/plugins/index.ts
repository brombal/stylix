import { StylixContext, StylixPublicContext } from '../StylixProvider.tsx';
import { cleanStyles } from './cleanStyles.ts';
import { defaultPixelUnits } from './defaultUnits.ts';
import { flattenNestedStyles } from './flattenNestedStyles.ts';
import { mediaArrays } from './mediaArrays.ts';
import { merge$css } from './merge$css.ts';
import { propCasing } from './propCasing.ts';
import { replace$$class } from './replace$$class.ts';
import { themeFunctions } from './themeFunctions.ts';

/**
 * Stylix plugin function context object
 */
export type StylixPluginFunctionContext = StylixPublicContext & { hash: string | null };

/**
 * Stylix plugin interface
 */
export interface StylixPlugin {
  name: string;
  type: 'initialize' | 'processStyles' | 'preprocessStyles';
  plugin(ctx: StylixPluginFunctionContext, styles: any): any;
  before?: StylixPlugin;
  after?: StylixPlugin;
  atIndex?: number;
}

export function applyPlugins(
  type: StylixPlugin['type'],
  styles: any,
  hash: string | null,
  context: StylixContext,
) {
  const pluginContext = {
    id: context.id,
    devMode: context.devMode,
    theme: context.theme,
    media: context.media,
    stylesheet: context.stylesheet,
    styleElement: context.styleElement,
    styleProps: context.styleProps,
    hash,
  };

  let processedStyles = styles;
  for (const i in context.plugins) {
    const plugin = context.plugins[i];
    if (plugin.type === type) processedStyles = plugin.plugin(pluginContext, processedStyles);
  }
  return processedStyles;
}

export { customProps } from './customProps.ts';

export const defaultPlugins = {
  themeFunctions,
  merge$css,
  mediaArrays,
  propCasing,
  flattenNestedStyles,
  replace$$class,
  defaultPixelUnits,
  cleanStyles,
};
