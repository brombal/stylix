import type React from 'react';
import { createContext, useContext, useEffect, useRef } from 'react';

import { classifyProps, simplifyStylePropName } from './classifyProps';
import cssProps from './css-props.json';
import { type StylixPlugin, applyPlugins, defaultPlugins } from './plugins';
import type { StylixMediaDefinition } from './plugins/mediaObjects';
import { styleCollectorContext } from './styleCollector';
import { detectSSR } from './util/useIsoLayoutEffect';

/**
 * Stylix context
 *
 * The <StylixProvider> wrapper represents an "instance" of Stylix - a configuration, set of plugins, and reference to
 * the <style> element where css is output. All nodes contained within a <StylixProvider> element will share this
 * Stylix instance's configuration.
 *
 * See the README for more details.
 */

// StylixProvider component props
type StylixProviderProps = {
  id?: string;
  devMode?: boolean;
  plugins?: StylixPlugin[] | StylixPlugin[][];
  styleElement?: HTMLStyleElement;
  media?: StylixMediaDefinition;
  ssr?: boolean;
  children: any;
};

// StylixContext object interface
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
};

export type StylixPublicContext = Pick<
  StylixContext,
  'id' | 'devMode' | 'media' | 'stylesheet' | 'styleElement' | 'styleProps'
>;

let defaultStyleProps: Record<string, string> | undefined = undefined;

export function createStylixContext(userValues = {} as Partial<StylixProviderProps>) {
  if (!defaultStyleProps) {
    defaultStyleProps = {};
    for (const value of cssProps) {
      defaultStyleProps[simplifyStylePropName(value)] = value;
    }
  }

  const ctx = {
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
  } as StylixContext;

  if (userValues.plugins?.length) {
    const flatPlugins = userValues.plugins.flat();
    for (const i in flatPlugins) {
      const plugin = flatPlugins[i];
      let pluginIndex = -1;
      if (plugin.before && ctx.plugins.includes(plugin.before))
        pluginIndex = ctx.plugins.indexOf(plugin.before);
      else if (plugin.after && ctx.plugins.includes(plugin.after))
        pluginIndex = ctx.plugins.indexOf(plugin.after) + 1;
      else if (plugin.atIndex !== undefined) pluginIndex = plugin.atIndex;

      if (pluginIndex === -1) ctx.plugins.push(plugin);
      else ctx.plugins.splice(pluginIndex, 0, plugin);
    }
  }
  applyPlugins('initialize', null, null, ctx);

  return ctx;
}

// The React context object
const stylixContext = createContext<StylixContext | undefined>(undefined);

let defaultStylixContext: StylixContext | undefined = undefined;

/**
 * Gets the current Stylix context.
 */
export function useStylixContext(): StylixContext {
  const ctx = useContext(stylixContext);
  if (!ctx) {
    if (!defaultStylixContext) defaultStylixContext = createStylixContext();
    return defaultStylixContext;
  }
  return ctx;
}

export function StylixProvider({
  id,
  devMode,
  plugins,
  media,
  styleElement,
  children,
  ssr,
}: StylixProviderProps): React.ReactElement {
  const ctx = useRef<StylixContext | null>(null);
  if (!ctx.current)
    ctx.current = createStylixContext({ id, devMode, plugins, media, styleElement, ssr });

  ctx.current.styleCollector = useContext(styleCollectorContext);

  // When the component is unmounted, remove the style element, if any
  useEffect(() => {
    return () => {
      ctx.current?.styleElement?.remove();
    };
  }, []);

  return <stylixContext.Provider value={ctx.current}>{children}</stylixContext.Provider>;
}
