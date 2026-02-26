import type { StylixContext } from '../stylixContext';
import type { StylixStyles } from '../types';
import { cleanStyles } from './cleanStyles';
import { defaultPixelUnits } from './defaultUnits';
import { hoistKeyframes } from './hoistKeyframes';
import { mediaObjects } from './mediaObjects';
import { mergeArrays } from './mergeArrays';
import { prepareStyles } from './prepareStyles';
import { propCasing } from './propCasing';
import { replace$$class } from './replace$$class';
import {hoistLayers} from "./hoistLayers";

/**
 * Stylix plugin function context object
 */
export type StylixPluginFunctionContext = Pick<
  StylixContext,
  'id' | 'devMode' | 'media' | 'stylesheet' | 'styleElement' | 'styleProps'
> & { className: string | null };

/**
 * Stylix plugin interface
 */
export type StylixPlugin = {
  name: string;
  before?: string;
  after?: string;
  atIndex?: number;
} & (
  | {
      name: string;
      type: 'initialize';
      plugin(ctx: StylixPluginFunctionContext): void;
    }
  | {
      type: 'processStyles' | 'preprocessStyles';
      plugin(ctx: StylixPluginFunctionContext, styles: StylixStyles): StylixStyles;
    }
);

export function applyPlugins(
  type: 'initialize',
  styles: null,
  className: null,
  context: StylixContext,
): void;

export function applyPlugins(
  type: 'processStyles' | 'preprocessStyles',
  styles: StylixStyles,
  className: string | null,
  context: StylixContext,
): StylixStyles;

export function applyPlugins(
  type: StylixPlugin['type'],
  styles: StylixStyles | null,
  className: string | null,
  context: StylixContext,
): StylixStyles {
  const pluginContext: StylixPluginFunctionContext = {
    id: context.id,
    devMode: context.devMode,
    media: context.media,
    stylesheet: context.stylesheet,
    styleElement: context.styleElement,
    styleProps: context.styleProps,
    className,
  };

  let processedStyles: StylixStyles = styles || {};
  for (const i in context.plugins) {
    const plugin = context.plugins[i];
    if (plugin.type === type)
      processedStyles = plugin.plugin(pluginContext, processedStyles) as StylixStyles;
  }
  return processedStyles;
}

export { customProps } from './customProps';

export const defaultPlugins: StylixPlugin[] = [
  prepareStyles,
  mediaObjects,
  mergeArrays,
  propCasing,
  hoistKeyframes,
  hoistLayers,
  replace$$class,
  defaultPixelUnits,
  cleanStyles,
];
