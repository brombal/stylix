import postcssDefaultUnit from 'postcss-default-unit';
import postcssInlineMedia from 'postcss-inline-media';
import postcssNested from 'postcss-nested';
import React, { useContext, useRef } from 'react';

import { StylixTheme, StylixThemeProps } from './StylixTheme';

const IS_DEV_ENV = process.env.NODE_ENV !== 'production';

/**
 * Stylix context
 *
 * The <StylixProvider> wrapper represents an "instance" of Stylix - somewhat vaguely defined as a configuration,
 * set of plugins, and reference to the <style> element where css is output. All nodes contained within a
 * <StylixProvider> element will share this Stylix instance's configuration.
 *
 * A StylixProvider also contains a <StylixTheme>, so you can conveniently provide a theme object and media query array
 * with a single element.
 *
 * See the README for more details.
 */

// Props that are accepted by the <StylixProvider>
export interface StylixContextProps {
  id: string;
  devMode: boolean;
  plugins: StylixPlugin[];
  stylixPluginSettings: { defaultUnit?: any; nested?: any };
  styleElement: HTMLStyleElement;
}

type StylixPlugin = (ctx: StylixContext) => void;

// StylixContext object type
export interface StylixContext extends StylixContextProps {
  stylesheet: CSSStyleSheet;
  defs: Map<any, string>;
  hashRefs: { [key: string]: number };
  rules: {
    [key: string]: { postcss: string; hash: string; rules: string[] };
  };
  postcssPlugins: any[];
  customProps: Set<string>;
  initialized: boolean;
}

// Creates a default empty StylixContext object
function defaultStylixSheetContext() {
  return {
    id: undefined,
    devMode: IS_DEV_ENV,
    plugins: [],
    styleElement: null,
    stylesheet: null,
    defs: new Map(),
    hashRefs: {},
    rules: {},
    postcssPlugins: [],
    customProps: new Set(),
    initialized: false,
  } as StylixContext;
}

// The React context object
const stylixSheetContext = React.createContext(defaultStylixSheetContext());

// Convenience wrapper hook that returns the current Stylix context
export function useStylixContext(): StylixContext {
  return useContext(stylixSheetContext);
}

// <StylixProvider> component props
type StylixProviderProps = Partial<StylixContextProps> &
  Partial<StylixThemeProps> & { children: any };

export function StylixProvider({
  id,
  devMode,
  plugins = [],
  stylixPluginSettings = {},
  styleElement,
  children,
  ...other // `other` will be StylixTheme props
}: StylixProviderProps): React.ReactElement {
  const ctx = useRef<StylixContext>();

  if (!ctx.current) ctx.current = defaultStylixSheetContext();

  if (id) ctx.current.id = id;
  if (devMode !== undefined) ctx.current.devMode = devMode;
  if (styleElement) ctx.current.styleElement = styleElement;
  if (stylixPluginSettings) ctx.current.stylixPluginSettings = stylixPluginSettings;

  if (!ctx.current.styleElement) {
    ctx.current.styleElement = document.createElement('style');
    ctx.current.styleElement.id = 'stylix-styles' + (ctx.current.id ? '-' + ctx.current.id : '');
    ctx.current.styleElement.className = 'stylix-styles';
    document.head.appendChild(ctx.current.styleElement);
  }
  ctx.current.stylesheet = ctx.current.styleElement.sheet as CSSStyleSheet;

  if (!ctx.current.initialized) {
    plugins.forEach((plugin) => {
      if ((plugin as any).postcss) {
        ctx.current.postcssPlugins.push(plugin);
      } else {
        plugin(ctx.current);
      }
    });
    ctx.current.postcssPlugins.push(
      postcssNested(ctx.current.stylixPluginSettings.nested),
      postcssInlineMedia,
      postcssDefaultUnit(ctx.current.stylixPluginSettings.defaultUnit),
    );
    ctx.current.initialized = true;
  }

  return (
    <stylixSheetContext.Provider value={ctx.current}>
      <StylixTheme {...other}>{children}</StylixTheme>
    </stylixSheetContext.Provider>
  );
}
