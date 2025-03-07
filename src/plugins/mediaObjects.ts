import { simplifyStylePropName } from '../classifyProps';
import type { StylixObject, StylixStyles } from '../index';
import type { StylixPlugin, StylixPluginFunctionContext } from './index';

type OpaqueMediaStyles = { __opaqueMediaStyles: true };

export type StylixMediaValue = {
  [key: string]: OpaqueMediaStyles | StylixMediaValue;
};

type StylixMediaFunc = (styles: OpaqueMediaStyles) => StylixMediaValue;

export type StylixMediaDefinition = Record<string, StylixMediaFunc>;

/**
 * Expands media objects using the media definitions from the Stylix context.
 */
export const mediaObjects: StylixPlugin = {
  name: 'mediaObjects',
  type: 'processStyles',
  plugin: mediaObjectsPlugin,
};

function mediaObjectsPlugin(ctx: StylixPluginFunctionContext, styles: StylixStyles): StylixObject {
  if (!ctx.media) return styles as StylixObject;
  return processMediaStyles(ctx.media, ctx.styleProps, styles);
}

export function processMediaStyles(
  mediaDef: StylixMediaDefinition,
  styleProps: Record<string, string>,
  styles: any,
): any {
  if (!styles || typeof styles !== 'object') return styles;

  // If styles is an array, just recursively map it
  if (Array.isArray(styles)) {
    return styles.map((style: any) => processMediaStyles(mediaDef, styleProps, style));
  }

  mediaDef.default ||= (styles: any) => styles;

  const result = { default: [] } as Record<string, any[]>;

  for (const styleKey in styles) {
    const styleValue = styles[styleKey];

    if (styleProps[simplifyStylePropName(styleKey)]) {
      if (typeof styleValue !== 'object') {
        // Regular style prop
        result.default.push({ [styleKey]: styleValue });
        continue;
      }

      // An object for a style prop is definitely a media object
      for (const mediaKey in styleValue) {
        result[mediaKey] ||= [];
        result[mediaKey].push(
          mediaDef[mediaKey]({
            // process recursively
            [styleKey]: processMediaStyles(mediaDef, styleProps, styleValue[mediaKey]),
          } as OpaqueMediaStyles),
        );
      }
      continue;
    }

    if (styleKey in mediaDef) {
      result[styleKey] ||= [];
      result[styleKey].push(
        mediaDef[styleKey](
          // process recursively
          processMediaStyles(mediaDef, styleProps, styleValue),
        ),
      );
      continue;
    }

    // Key is a selector, just process recursively and add to plain styles
    result.default.push({ [styleKey]: processMediaStyles(mediaDef, styleProps, styleValue) });
  }

  const results = Object.values(result);
  return results.length === 1 ? results[0] : results.length === 0 ? null : results;
}
