import { isStyleProp } from '../classifyProps';
import type { StylixObject, StylixStyles } from '../index';
import type { StylixPlugin, StylixPluginFunctionContext } from './index';

type OpaqueMediaStyles = { __opaqueMediaStyles: true };

type StylixMediaFunc = (styles: OpaqueMediaStyles) => StylixStyles;

export type StylixMediaDefinition = Record<string, StylixMediaFunc>;

/**
 * Expands media objects using the media definitions from the Stylix context.
 */
export const mediaObjects: StylixPlugin = {
  name: 'mediaObjects',
  type: 'processStyles',
  plugin: mediaObjectsPlugin,
};

function mediaObjectsPlugin(ctx: StylixPluginFunctionContext, styles: StylixStyles): StylixStyles {
  if (!ctx.media) return styles as StylixObject;
  return processMediaStyles(ctx.media, ctx.styleProps, styles);
}

export function processMediaStyles(
  mediaDef: StylixMediaDefinition,
  styleProps: Record<string, string>,
  styles: any,
  // styleKey is provided when recursively processing a nested media object for a style prop (e.g. { color: { mobile: { dark: 'red' } } }).
  // It should be continuously passed down until the actual style value is reached, at which point it will be used to construct the styles
  // object passed to the media function (e.g. mediaDef['mobile']({ color: 'red' }))
  nestedStyleKey?: string,
): StylixStyles {
  if (!styles || typeof styles !== 'object')
    return nestedStyleKey ? { [nestedStyleKey]: styles } : styles;

  // If styles is an array, just recursively map it
  if (Array.isArray(styles)) {
    return styles.flatMap((style: any) =>
      processMediaStyles(mediaDef, styleProps, style),
    ) as StylixStyles[];
  }

  mediaDef.default ||= (styles: any) => styles;

  const result = { default: [] } as Record<string, any[]>;

  for (const styleKey in styles) {
    const styleValue = styles[styleKey];

    if (isStyleProp(styleKey, styleProps)) {
      if (typeof styleValue !== 'object') {
        // Regular style prop
        result.default.push({ [styleKey]: styleValue });
        continue;
      }

      // An object for a style prop is definitely a media object
      for (const mediaKey in styleValue) {
        result[mediaKey] ||= [];

        // process recursively
        const processed = processMediaStyles(mediaDef, styleProps, styleValue[mediaKey], styleKey);

        // mediaKey corresponds to a media definition
        if (mediaKey in mediaDef) {
          result[mediaKey].push(mediaDef[mediaKey](processed as OpaqueMediaStyles));
        }

        // mediaKey does not correspond to a media definition, it must be a @media or @container rule
        else {
          result[mediaKey].push({
            [mediaKey]: processed,
          });
        }
      }
      continue;
    }

    if (styleKey in mediaDef) {
      result[styleKey] ||= [];
      result[styleKey].push(
        mediaDef[styleKey](
          // process recursively
          processMediaStyles(
            mediaDef,
            styleProps,
            styleValue,
            nestedStyleKey,
          ) as unknown as OpaqueMediaStyles,
        ),
      );
      continue;
    }

    // Key is a selector, just process recursively and add to plain styles
    result.default.push({
      [styleKey]: processMediaStyles(mediaDef, styleProps, styleValue),
    });
  }

  const results = Object.values(result);
  return results.length === 1 ? results[0] : results.length === 0 ? null : results;
}
