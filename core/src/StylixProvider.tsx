import React, { createContext, useContext, useRef } from 'react';

import { simplifyStylePropName } from './classifyProps';
import cssProps from './css-props.json';
import { applyPlugins, defaultPlugins, StylixPlugin } from './plugins';
import { styleCollectorContext } from './styleCollector';
import { flatten } from './util/flatten';
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
  media?: string[];
  ssr?: boolean;
  children: any;
};

// StylixContext object interface
export type StylixContext = {
  id: string;
  devMode: boolean;
  media: string[] | undefined;
  plugins: StylixPlugin[];
  stylesheet?: CSSStyleSheet;
  styleElement?: HTMLStyleElement;
  styleCollector?: string[];
  rules: {
    [key: string]: {
      hash: string;
      rules: string[];
      refs: number;
    };
  };
  styleProps: Record<string, string>;
  ssr?: boolean;
  cleanupRequest?: number;
  requestApply: boolean;
};

export type StylixPublicContext = Pick<
  StylixContext,
  'id' | 'devMode' | 'media' | 'stylesheet' | 'styleElement' | 'styleProps'
>;

const defaultStyleProps: Record<string, string> = {};
for (const value of cssProps) {
  defaultStyleProps[simplifyStylePropName(value)] = value;
}

function createStylixContext(userValues = {} as Partial<StylixProviderProps>) {
  const ctx = {
    id: userValues.id || Math.round(Math.random() * 10000).toString(10),
    devMode: !!userValues.devMode,
    styleProps: defaultStyleProps,
    media: userValues.media,
    styleElement: userValues.styleElement,
    plugins: flatten<StylixPlugin>(Object.values(defaultPlugins)),
    rules: {},
    ssr: userValues.ssr ?? detectSSR(),
    cleanupRequest: undefined,
    requestApply: false,
  } as StylixContext;

  if (userValues.plugins?.length) {
    const flatPlugins = flatten<StylixPlugin>(userValues.plugins);
    for (const i in flatPlugins) {
      const plugin = flatPlugins[i];
      let pluginIndex = -1;
      if (plugin.before && ctx.plugins.includes(plugin.before))
        pluginIndex = ctx.plugins.indexOf(plugin.before);
      if (plugin.after && ctx.plugins.includes(plugin.after))
        pluginIndex = ctx.plugins.indexOf(plugin.after) + 1;
      if (plugin.atIndex !== undefined) pluginIndex = plugin.atIndex;
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

// Convenience wrapper hook that returns the current Stylix context
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
  styleElement,
  children,
  ssr,
}: StylixProviderProps): React.ReactElement {
  const ctx = useRef<StylixContext>();
  if (!ctx.current) ctx.current = createStylixContext({ id, devMode, plugins, styleElement, ssr });

  ctx.current.styleCollector = useContext(styleCollectorContext);

  return <stylixContext.Provider value={ctx.current}>{children}</stylixContext.Provider>;
}
