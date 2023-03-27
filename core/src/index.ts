export {
  type StylixProps,
  type StylixPropsExtensions,
  type Stylix$Component,
  type Stylix$elProp,
  type Stylix$elPropOptional,
  type Extends,
} from './types';
export { useStylixContext, useStylixTheme, StylixProvider, StylixTheme } from './StylixProvider';
import { StylixPublicContext } from './StylixProvider';
export type StylixContext = StylixPublicContext;
export { useStyles, useKeyframes, useGlobalStyles } from './useStyles';
export {
  defaultPlugins,
  customProps,
  type StylixPlugin,
  type StylixPluginFunctionContext,
} from './plugins';
export { mapObjectRecursive } from './util/mapObjectRecursive';
export { walkRecursive } from './util/walkRecursive';
export { createStyleCollector, styleCollectorContext, type StyleCollector } from './styleCollector';
export { classifyProps, useClassifyProps } from './classifyProps';
export { styled } from './styled';
import './elements';
export { default } from './Stylix';
