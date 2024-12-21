import { isEmpty } from '../util/isEmpty';
import { isPlainObject } from '../util/isPlainObject';
import type { StylixPlugin } from './index';

function _cleanStyles(object: any): any {
  for (const key in object) {
    const value = object[key];
    if (value === null || value === undefined || value === '') delete object[key];
    else if (isPlainObject(value) || Array.isArray(value)) {
      _cleanStyles(value);
      if (isEmpty(value)) delete object[key];
    }
  }
  return object;
}

/**
 * Removes null, undefined, and empty string values from style objects.
 */
export const cleanStyles: StylixPlugin = {
  name: 'cleanStyles',
  type: 'processStyles',
  plugin(ctx, styles) {
    return _cleanStyles(styles);
  },
};
