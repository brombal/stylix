import { isPlainObject } from '../util/isPlainObject';
import { StylixPlugin, StylixPluginFunctionContext } from './index';

function cleanObject(object: any): any {
  for (const key in object) {
    const value = object[key];
    if (value === null || value === undefined || value === '') delete object[key];
    else if (isPlainObject(value) || Array.isArray(value)) {
      cleanObject(value);
      if (!Object.keys(value).length) delete object[key];
    }
  }
  return object;
}

/**
 * Fixes casing and hyphenation on known style props
 */
export const cleanStyles: StylixPlugin = {
  name: 'cleanStyles',
  type: 'processStyles',
  plugin(ctx: StylixPluginFunctionContext, styles: any) {
    return cleanObject(styles);
  },
};
