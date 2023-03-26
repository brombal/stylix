import { isValidJSXProp, simplifyStylePropName } from '../classifyProps.ts';
import { isPlainObject } from '../util/isPlainObject.ts';
import { walkRecursive } from '../util/walkRecursive.ts';
import { StylixPlugin, StylixPluginFunctionContext } from './index.ts';
import { mediaArrays } from './mediaArrays.ts';

export const customProps = (customProps: Record<string, any>): StylixPlugin[] => {
  for (const key in customProps) {
    customProps[simplifyStylePropName(key)] = customProps[key];
  }

  return [
    {
      name: 'customPropsInit',
      type: 'initialize',
      plugin(ctx: StylixPluginFunctionContext) {
        for (const key in customProps) {
          ctx.styleProps[simplifyStylePropName(key)] = key;
        }
      },
    },
    {
      name: 'customPropsProcess',
      type: 'processStyles',
      before: mediaArrays,
      plugin(ctx: StylixPluginFunctionContext, styles: any) {
        return walkRecursive(styles, (key, value, object) => {
          if (!isValidJSXProp(key) || isPlainObject(value)) return;

          const simpleKey = simplifyStylePropName(key);
          const propValue = customProps[simpleKey];
          if (!propValue) return;

          const objectClone = { ...object };
          const keys = Object.keys(object);
          const afterKeys = keys.slice(keys.indexOf(key) + 1);

          const newStyles: any = {};
          if (typeof propValue === 'object') {
            if (value) Object.assign(newStyles, propValue);
          } else if (typeof propValue === 'string') {
            newStyles[propValue] = value;
          } else if (typeof propValue === 'function') {
            Object.assign(newStyles, propValue(value));
          }
          delete object[key];
          Object.assign(object, newStyles);
          for (const k of afterKeys) {
            const val = objectClone[k];
            delete object[k];
            object[k] = val;
          }
        });
      },
    },
  ];
};
