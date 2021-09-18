import { StylixContext, StylixPublicContext } from '../StylixProvider';
import { cleanStyles } from './cleanStyles';
import { defaultPixelUnits } from './defaultUnits';
import { flattenNestedStyles } from './flattenNestedStyles';
import { mediaArrays } from './mediaArrays';
import { merge$css } from './merge$css';
import { propCasing } from './propCasing';
import { replace$$class } from './replace$$class';
import { themeFunctions } from './themeFunctions';

/**
 * Stylix plugin function context object
 */
export type StylixPluginFunctionContext = StylixPublicContext & { hash: string };

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
  hash: string,
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

export { customProps } from './customProps';

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
