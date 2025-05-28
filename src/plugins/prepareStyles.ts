import { isPlainObject } from '../util/isPlainObject';
import type { StylixPlugin } from './index';

/**
 * Removes null, undefined, and empty string values from style objects.
 */
export const prepareStyles: StylixPlugin = {
  name: 'prepareStyles',
  type: 'preprocessStyles',
  plugin(_ctx, styles) {
    while (Array.isArray(styles) && styles.length === 1) styles = styles[0];
    if (Array.isArray(styles) && !styles.length) return null;
    if (isPlainObject(styles) && Object.values(styles).every((v) => v === undefined)) return null;
    return styles;
  },
};
