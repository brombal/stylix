import { isEmpty } from '../util/isEmpty';
import { isPlainObject } from '../util/isPlainObject';
import type { StylixPlugin } from './index';

export function _cleanStyles(object: any): void {
  for (const key in object) {
    const value = object[key];
    if (value === null || value === undefined || value === '' || value === false)
      delete object[key];
    else if (isPlainObject(value) || Array.isArray(value)) {
      _cleanStyles(value);
      if (isEmpty(value)) delete object[key];
    }
  }
}

/**
 * Removes null, undefined, and empty string values from style objects.
 */
export const cleanStyles: StylixPlugin = {
  name: 'cleanStyles',
  type: 'processStyles',
  plugin(_ctx, styles) {
    _cleanStyles(styles);
    return styles;
  },
};
