export {
  type StylixProps,
  type StylixPropsExtensions,
  type Stylix$Component,
  type Stylix$elProp,
  type Stylix$elPropOptional,
  type Extends,
} from './types.ts';
export {
  useStylixContext,
  useStylixTheme,
  StylixProvider,
  type StylixPublicContext as StylixContext,
  StylixTheme,
} from './StylixProvider.tsx';
export { useStyles, useKeyframes, useGlobalStyles } from './useStyles.ts';
export { defaultPlugins, customProps, type StylixPlugin, type StylixPluginFunctionContext } from './plugins/index.ts';
export { mapObjectRecursive } from './util/mapObjectRecursive.ts';
export { walkRecursive } from './util/walkRecursive.ts';
export { createStyleCollector, styleCollectorContext, type StyleCollector } from './styleCollector.tsx';
export { classifyProps, useClassifyProps } from './classifyProps.ts';
export { styled } from './styled.tsx';
import './elements.ts';
export { default } from './Stylix.tsx';
