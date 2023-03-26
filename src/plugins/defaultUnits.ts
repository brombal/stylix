import { mapObjectRecursive } from '../util/mapObjectRecursive.ts';
import { StylixPlugin } from './index.ts';

export const defaultIgnoreUnits = [
  'columns',
  'column-count',
  'fill-opacity',
  'flex',
  'flex-grow',
  'flex-shrink',
  'font-weight',
  'line-height',
  'opacity',
  'orphans',
  'stroke-opacity',
  'widows',
  'z-index',
  'zoom',
  'order',
];

/**
 * Adds unit (px, em, etc) to numeric values for any style properties not included in `ignoreProps`..
 */
export const defaultUnits = (unit = 'px', ignoreProps = defaultIgnoreUnits): StylixPlugin => {
  return {
    name: 'defaultUnits',
    type: 'processStyles',
    plugin(ctx, styles: any) {
      return mapObjectRecursive(styles, defaultUnitsMap, { unit, ignoreProps });
    },
  };
};

const defaultUnitsMap = (key: string | number, value: any, object :any, ctx:any) => {
  if (typeof value === 'number' && !ctx.ignoreProps.includes(key as string)) {
    return { [key]: String(value) + ctx.unit };
  }
};

export const defaultPixelUnits = defaultUnits();
