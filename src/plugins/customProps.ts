import { isValidJSXProp, simplifyStylePropName } from '../classifyProps';
import type { StylixStyles } from '../types';
import { isPlainObject } from '../util/isPlainObject';
import { mapObject } from '../util/mapObject';
import type { StylixPlugin } from './index';
import { mergeArrays } from './mergeArrays';

export function _customPropsProcess(styles: StylixStyles, customProps: Record<string, any>): any {
  return mapObject(styles, (key, value, source, _ctx, mapRecursive) => {
    if (!isValidJSXProp(key) || isPlainObject(value))
      return Array.isArray(source) ? [mapRecursive(value)] : { [key]: mapRecursive(value) };

    const simpleKey = simplifyStylePropName(key);
    const propValue = customProps[simpleKey];
    if (!propValue) return { [key]: mapRecursive(value) };

    if (typeof propValue === 'object') {
      if (value) return mapRecursive(propValue);
      return undefined;
    }
    if (typeof propValue === 'string') {
      return { [propValue]: mapRecursive(value) };
    }
    if (typeof propValue === 'function') {
      return mapRecursive(propValue(value));
    }

    return { [key]: mapRecursive(value) };
  });
}

export const customProps = (customProps: Record<string, any>): StylixPlugin[] => {
  for (const key in customProps) {
    customProps[simplifyStylePropName(key)] = customProps[key];
  }

  return [
    {
      name: 'customPropsInit',
      type: 'initialize',
      plugin(ctx) {
        for (const key in customProps) {
          ctx.styleProps[simplifyStylePropName(key)] = key;
        }
      },
    },
    {
      name: 'customPropsProcess',
      type: 'processStyles',
      before: mergeArrays,
      plugin(_ctx, styles) {
        return _customPropsProcess(styles, customProps);
      },
    },
  ];
};
