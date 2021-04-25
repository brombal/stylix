import { isPlainObject } from '../util/isPlainObject';
import { StylixPlugin, StylixPluginFunctionContext } from './index';

function cleanObject(object: any): any {
  Object.entries(object).forEach(([key, value]: [number | string, any]) => {
    if (isPlainObject(value) || Array.isArray(value)) {
      cleanObject(value);
      if (!Object.keys(value).length) delete object[key];
    } else if (value === null || value === undefined || value === '') delete object[key];
  });
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
