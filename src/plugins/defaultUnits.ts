import { type MapObjectFunction, mapObject } from '../util/mapObject';
import type { StylixPlugin } from './index';

export const defaultIgnoreUnits = [
  'aspect-ratio',
  'column-count',
  'columns',
  'fill-opacity',
  'flex',
  'flex-grow',
  'flex-shrink',
  'font-weight',
  'line-height',
  'opacity',
  'order',
  'orphans',
  'stroke-opacity',
  'widows',
  'z-index',
  'zoom',
];

/**
 * Adds unit (px, em, etc) to numeric values for any style properties not included in `ignoreProps`.
 */
export const defaultUnits = (unit = 'px', ignoreProps = defaultIgnoreUnits): StylixPlugin => {
  return {
    name: 'defaultUnits',
    type: 'processStyles',
    plugin(_ctx, styles) {
      return mapObject(styles, defaultUnitsMap, { unit, ignoreProps });
    },
  };
};

const defaultUnitsMap: MapObjectFunction<{ unit: string; ignoreProps: string[] }> = (
  key,
  value,
  target,
  ctx,
  mapRecursive,
) => {
  if (typeof value === 'number' && !ctx.ignoreProps.includes(key as string)) {
    target[key] = String(value) + ctx.unit;
    return;
  }
  target[key] = mapRecursive(value);
};

export const defaultPixelUnits = defaultUnits();
