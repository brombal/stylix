import React, { createContext, useContext, useRef, useState } from 'react';

import { simplifyStylePropName } from './classifyProps';
import cssProps from './css-props.json';
import { applyPlugins, defaultPlugins, StylixPlugin } from './plugins';
import { styleCollectorContext } from './styleCollector';
import { flatten } from './util/flatten';
import { merge } from './util/merge';
import useIsoLayoutEffect from './util/useIsoLayoutEffect';

/**
 * Stylix context
 *
 * The <StylixProvider> wrapper represents an "instance" of Stylix - a configuration, set of plugins, and reference to
 * the <style> element where css is output. All nodes contained within a <StylixProvider> element will share this
 * Stylix instance's configuration.
 *
 * A StylixProvider internally contains a <StylixTheme>, so you can conveniently provide a theme object and media query
 * array with a single element.
 *
 * See the README for more details.
 */

// StylixProvider component props
type StylixProviderProps<Theme = any> = StylixThemeProps<Theme> & {
  id?: string;
  devMode?: boolean;
  plugins?: StylixPlugin[] | StylixPlugin[][];
  styleElement?: HTMLStyleElement;
  children: any;
};

type StylixThemeProps<Theme = any> = {
  theme?: Theme;
  media?: string[];
  children: any;
};

// StylixContext object interface
export type StylixContext<Theme = any> = {
  id: string;
  devMode: boolean;
  theme: Theme;
  media: string[];
  plugins: StylixPlugin[];
  stylesheet: CSSStyleSheet;
  styleElement: HTMLStyleElement;
  styleCollector?: string[];
  rules: {
    [key: string]: {
      hash: string;
      rules: string[];
      refs: number;
    };
  };
  styleProps: Record<string, string>;
  cleanupRequest?: number;
  requestApply: boolean;
};

export type StylixPublicContext = Pick<
  StylixContext,
  'id' | 'devMode' | 'theme' | 'media' | 'stylesheet' | 'styleElement' | 'styleProps'
>;

const defaultStyleProps: Record<string, string> = {};
for (const value of cssProps) {
  defaultStyleProps[simplifyStylePropName(value)] = value;
}

function createStylixContext(userValues = {} as Partial<StylixProviderProps>) {
  const ctx = {
    id: userValues.id || Math.round(Math.random() * 10000).toString(10),
    devMode: userValues.devMode,
    styleProps: defaultStyleProps,
    theme: userValues.theme || null,
    media: userValues.media || null,
    styleElement: userValues.styleElement,
    plugins: flatten<StylixPlugin>(Object.values(defaultPlugins)),
    rules: {},
    cleanupRequest: undefined,
  } as StylixContext;

  if (!ctx.styleElement && typeof document !== 'undefined') {
    ctx.styleElement = document.createElement('style');
    if (ctx.id) ctx.styleElement.id = 'stylix-' + ctx.id;
    ctx.styleElement.className = 'stylix';
    document.head.appendChild(ctx.styleElement);
  }

  if (ctx.styleElement) ctx.stylesheet = ctx.styleElement.sheet as CSSStyleSheet;

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
const stylixContext = createContext(createStylixContext());

// Convenience wrapper hook that returns the current Stylix context
export function useStylixContext<Theme = any>(): StylixContext<Theme> {
  return useContext(stylixContext);
}

// Convenience wrapper hook that returns just the current Stylix theme
export function useStylixTheme<Theme = any>(): Theme {
  return useContext(stylixContext).theme;
}

export function StylixProvider({
  id,
  devMode,
  plugins,
  styleElement,
  children,
  ...themeProps
}: StylixProviderProps): React.ReactElement {
  const ctx = useRef<StylixContext>();
  if (!ctx.current) ctx.current = createStylixContext({ id, devMode, plugins, styleElement });

  ctx.current.styleCollector = useContext(styleCollectorContext);

  return (
    <stylixContext.Provider value={ctx.current}>
      <StylixTheme {...themeProps}>{children}</StylixTheme>
    </stylixContext.Provider>
  );
}

function mergeContexts(contextA: any, contextB: any) {
  const obj = { ...contextA };
  const themeB = contextB.theme;
  if (contextB) {
    for (const key in contextB) {
      const value = contextB[key];
      if (typeof value !== 'undefined') obj[key] = value;
    }
  }
  obj.theme = merge(contextA.theme || {}, themeB);
  return obj;
}

export function StylixTheme({ children, media, theme }: StylixThemeProps) {
  const parentCtx = useContext(stylixContext);
  const [contextValue, setContextValue] = useState(() =>
    mergeContexts(parentCtx, { media, theme }),
  );

  // contextValue should only update (and cause re-renders) when relevant properties change.
  // `media` is treated as special because providing an array of strings is easier to do inline,
  // but we don't want to cause descendent re-renders if the values don't change.

  useIsoLayoutEffect(
    () => {
      setContextValue(mergeContexts(parentCtx, { media, theme }));
    },
    [parentCtx, media?.join('|') || '', theme],
    false,
  );

  return <stylixContext.Provider value={contextValue}>{children}</stylixContext.Provider>;
}
