import type React from 'react';
import { createContext, useContext, useEffect, useRef } from 'react';
import { classifyProps, simplifyStylePropName } from './classifyProps';
import cssProps from './css-props.json';
import { applyPlugins, defaultPlugins, type StylixPlugin } from './plugins';
import type { StylixMediaDefinition } from './plugins/mediaObjects';
import { styleCollectorContext } from './styleCollector';
import { detectSSR } from './util/useIsoLayoutEffect';
import { StylixStyles } from './types';
import { createStyles } from './useStyles';
import applyRules from './applyRules';

/**
 * Stylix context
 *
 * A Stylix context represents an "instance" of Stylix - a configuration, set of plugins, and reference to
 * the <style> element where css is output.
 *
 * A <StylixProvider> creates a context instance and provides it via React context to its descendent elements.
 * All nodes contained within a <StylixProvider> element will share this context.
 */

/**
 * The Stylix context object.
 */
export type StylixContext = {
  id: string;
  devMode: boolean;
  media: StylixMediaDefinition | undefined;
  plugins: StylixPlugin[];
  stylesheet?: CSSStyleSheet;
  styleElement?: HTMLStyleElement;
  styleCollector?: string[];
  styleCounter: number;
  rules: {
    [key: string]:
      | undefined
      | {
          className: string;
          rules: string[];
          refs: number;
        };
  };
  styleProps: Record<string, string>;
  ssr?: boolean;
  cleanupRequest?: number;
  requestApply: boolean;

  classifyProps(props: Record<string, unknown>): [Record<string, unknown>, Record<string, unknown>];
  styles(styles: StylixStyles, config?: { global: boolean }): string;
};

/**
 * Default style props mapping. This will be populated on the first call to createStylixContext.
 */
let defaultStyleProps: Record<string, string> | undefined;

/**
 * Configuration options for creating a Stylix context.
 */
type CreateStylixContextConfig = {
  id?: string;
  devMode?: boolean;
  plugins?: StylixPlugin[] | StylixPlugin[][];
  styleElement?: HTMLStyleElement;
  media?: StylixMediaDefinition;
  ssr?: boolean;
};

export function createStylixContext(userValues: CreateStylixContextConfig = {}): StylixContext {
  if (!defaultStyleProps) {
    defaultStyleProps = {};
    for (const value of cssProps) {
      defaultStyleProps[simplifyStylePropName(value)] = value;
    }
  }

  const ctx: StylixContext = {
    id: userValues.id || '$default',
    devMode: !!userValues.devMode,
    styleProps: defaultStyleProps,
    media: userValues.media,
    styleElement: userValues.styleElement,
    plugins: defaultPlugins.flat(),
    styleCounter: 0,
    rules: {},
    ssr: userValues.ssr ?? detectSSR(),
    cleanupRequest: undefined,
    requestApply: false,

    classifyProps(props: Record<string, unknown>) {
      const [styles, other] = classifyProps(props, this.styleProps);
      return [styles, other];
    },

    styles(styles: StylixStyles, config?: { global: boolean }): string {
      const s = createStyles({
        stylixCtx: ctx,
        styles,
        global: config?.global || false,
      });
      applyRules(ctx);
      return s.className;
    },
  };

  if (userValues.plugins?.length) {
    const flatPlugins = userValues.plugins.flat();
    for (const i in flatPlugins) {
      const plugin = flatPlugins[i];
      let pluginIndex = -1;
      if (plugin.before) pluginIndex = ctx.plugins.findIndex((v) => v.name === plugin.before);
      else if (plugin.after) {
        pluginIndex = ctx.plugins.findIndex((v) => v.name === plugin.before);
        if (pluginIndex !== -1) pluginIndex += 1;
      } else if (plugin.atIndex !== undefined) pluginIndex = plugin.atIndex;

      if (pluginIndex === -1) ctx.plugins.push(plugin);
      else ctx.plugins.splice(pluginIndex, 0, plugin);
    }
  }
  applyPlugins('initialize', null, null, ctx);

  return ctx;
}

/**
 * The React context object for Stylix.
 */
const stylixContext = createContext<StylixContext | undefined>(undefined);

/**
 * Default Stylix context, used when no provider is present.
 */
let defaultStylixContext: StylixContext | undefined;

/**
 * React hook that gets the current Stylix context.
 */
export function useStylixContext(): StylixContext {
  const ctx = useContext(stylixContext);
  if (!ctx) {
    if (!defaultStylixContext) defaultStylixContext = createStylixContext();
    return defaultStylixContext;
  }
  return ctx;
}

/**
 * Props for StylixProvider when passing an existing context.
 */
type StylixProviderPropsWithContext = {
  context: StylixContext;
};

/**
 * Props for StylixProvider when creating a new context.
 */
type StylixProviderPropsWithConfig = {
  id?: string;
  devMode?: boolean;
  plugins?: StylixPlugin[] | StylixPlugin[][];
  styleElement?: HTMLStyleElement;
  media?: StylixMediaDefinition;
  ssr?: boolean;
  children: any;
};

/**
 * Props for the StylixProvider component.
 */
type StylixProviderProps = StylixProviderPropsWithContext | StylixProviderPropsWithConfig;

/**
 * StylixProvider component. Provides a Stylix context to its descendent elements.
 * Can either accept an existing context via the `context` prop, or create a new context
 * using the other configuration props.
 */
export function StylixProvider(props: StylixProviderProps): React.ReactElement {
  const { context, id, devMode, plugins, media, styleElement, children, ssr } =
    props as StylixProviderPropsWithContext & StylixProviderPropsWithConfig;

  const ctx = useRef(context);
  if (!ctx.current)
    ctx.current = createStylixContext({
      id,
      devMode,
      plugins,
      media,
      styleElement,
      ssr,
    });

  ctx.current.styleCollector = useContext(styleCollectorContext);

  // When the component is unmounted, remove the style element, if any
  useEffect(() => {
    return () => {
      ctx.current?.styleElement?.remove();
    };
  }, []);

  return <stylixContext.Provider value={ctx.current}>{children}</stylixContext.Provider>;
}
