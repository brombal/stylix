import { isValidJSXProp, simplifyStylePropName } from '../classifyProps';
import type { StylixStyles } from '../types';
import { isPlainObject } from '../util/isPlainObject';
import { mapObject } from '../util/mapObject';
import type { StylixPlugin } from './index';

export function _customPropsProcess(styles: StylixStyles, customProps: Record<string, any>): any {
  if (typeof styles !== 'object' || styles === null) return styles;
  return mapObject(styles, (key, value, target, _ctx, mapRecursive) => {
    if (!isValidJSXProp(key) || isPlainObject(value)) {
      target[key] = mapRecursive(value);
      return;
    }

    const simpleKey = simplifyStylePropName(key);
    const propValue = customProps[simpleKey];

    if (propValue && typeof propValue === 'object') {
      // For object, merge the mapped value into target if original prop value is truthy
      if (value) {
        const mappedValue = mapRecursive(propValue);
        Object.assign(target, mappedValue);
      }
    } else if (typeof propValue === 'string') {
      // For string, just remap the prop name
      target[propValue] = mapRecursive(value);
    } else if (typeof propValue === 'function') {
      // For function, call it with the original value and merge the result
      const mappedValue = mapRecursive(propValue(value));
      Object.assign(target, mappedValue);
    } else {
      // Unknown type, just keep original
      target[key] = mapRecursive(value);
    }
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
      before: 'mergeArrays',
      plugin(_ctx, styles) {
        return _customPropsProcess(styles, customProps);
      },
    },
  ];
};
