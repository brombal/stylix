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

  let plainStyles = null as any;
  const result = [] as any[];

  for (const styleKey in styles) {
    const styleValue = styles[styleKey];

    if (styleProps[simplifyStylePropName(styleKey)]) {
      if (typeof styleValue !== 'object') {
        // Regular style prop
        if (!plainStyles) {
          plainStyles = {};
          result.push(plainStyles);
        }
        plainStyles[styleKey] = styleValue;
        continue;
      }

      // An object for a style prop is definitely a media object
      plainStyles = null;
      for (const mediaKey in styleValue) {
        result.push(
          mediaDef[mediaKey]({
            // process recursively
            [styleKey]: processMediaStyles(mediaDef, styleProps, styleValue[mediaKey]),
          } as OpaqueMediaStyles),
        );
      }
      continue;
    }

    if (styleKey in mediaDef) {
      plainStyles = null;
      result.push(
        mediaDef[styleKey](
          // process recursively
          processMediaStyles(mediaDef, styleProps, styleValue),
        ),
      );
      continue;
    }

    // Key is a selector, just process recursively and add to plain styles
    if (!plainStyles) {
      plainStyles = {};
      result.push(plainStyles);
    }
    plainStyles[styleKey] = processMediaStyles(mediaDef, styleProps, styleValue);
  }

  return result.length === 1 ? result[0] : result.length === 0 ? null : result;
}
