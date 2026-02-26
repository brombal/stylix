import './elements';

export type { HTMLProps, IntrinsicElements } from './elements';
export {
  customProps,
  defaultPlugins,
  type StylixPlugin,
  type StylixPluginFunctionContext,
} from './plugins';
export { RenderServerStyles } from './RenderServerStyles';
export { StyleElement } from './StyleElement';
export { Stylix as default, type Stylix$Component } from './Stylix';
export { createStyleCollector, type StyleCollector, styleCollectorContext } from './styleCollector';
export { type StylixContext, StylixProvider, useStylixContext } from './stylixContext';
export type {
  Extends,
  StylixHTMLProps,
  StylixObject,
  StylixProps,
  StylixPropsExtensions,
  StylixStyles,
  StylixValue,
} from './types';
export { useGlobalStyles, useKeyframes, useStyles } from './useStyles';
export { cx } from './util/cx';
export { mapObject } from './util/mapObject';
