import merge from 'lodash.merge';
import React, { useContext, useEffect, useRef } from 'react';

import { hashString } from './utils';

const IS_DEV_ENV = process.env.NODE_ENV !== 'production';

export interface StylixThemeContext {
  theme?: any;
  media?: string[];
}

const defaultStylixThemeContext: () => StylixThemeContext = () => ({
  media: [],
  theme: {},
});

const stylixThemeContext = React.createContext(defaultStylixThemeContext());

type StylixThemeProps = StylixThemeContext & {
  children: any;
};

export function StylixTheme({ theme, media, children }: StylixThemeProps) {
  const parent = useContext(stylixThemeContext);

  function generateCtx(obj: any) {
    obj.theme = merge({}, parent.theme, theme);
    obj.media = media || parent.media;
    return obj;
  }

  const ctx = useRef(generateCtx(defaultStylixThemeContext()));

  useEffect(() => {
    generateCtx(ctx.current);
  }, [parent, theme, JSON.stringify(media)]);

  return <stylixThemeContext.Provider value={ctx.current}>{children}</stylixThemeContext.Provider>;
}

export function useStylixThemeContext(): StylixThemeContext {
  return useContext(stylixThemeContext);
}

// Sheet context

export interface StylixSheetContextProps {
  id: string;
  devMode: boolean;
  styleElement: HTMLStyleElement;
  stylesheet: CSSStyleSheet;
  plugins: any[];
}

export type StylixSheetContext = StylixSheetContextProps & {
  styles: { [key: string]: { styles: string; uses: number } };
  currentRules: string[];
};

const defaultStylixSheetContext: () => StylixSheetContext = () => ({
  id: '',
  devMode: undefined,
  styleElement: null,
  stylesheet: null,
  styles: {},
  currentRules: [],
  plugins: [],
});

const stylixSheetContext = React.createContext(defaultStylixSheetContext());

/**
 * Returns the current Stylix context value.
 */
export function useStylixSheetContext(): StylixSheetContext {
  const ctx = useContext(stylixSheetContext);
  ctx.devMode = ctx.devMode ?? IS_DEV_ENV;
  ctx.id = ctx.id || hashString(Math.random().toString());

  if (ctx.devMode) {
    (window as any).stylixSheet = ctx.stylesheet;
    (window as any).stylixStyleElement = ctx.styleElement;
  }

  return ctx;
}

// TODO memoize. Currently there is no prop that should cause re-render.

export function StylixProvider({
  id,
  devMode = undefined,
  styleElement,
  stylesheet,
  plugins,
  children,
}: Partial<StylixSheetContextProps> & { children: any }) {
  const ctx = useRef({
    ...defaultStylixSheetContext(),
    id,
    devMode: devMode ?? IS_DEV_ENV,
    styleElement,
    stylesheet,
    plugins,
  } as StylixSheetContext);

  if (!ctx.current.styleElement) {
    ctx.current.styleElement = document.createElement('style');
    ctx.current.styleElement.id = 'stylix-style-' + ctx.current.id;
    document.head.appendChild(ctx.current.styleElement);
    if (!ctx.current.stylesheet)
      ctx.current.stylesheet = ctx.current.styleElement.sheet as CSSStyleSheet;
  }

  // Update mutable values
  useEffect(() => {
    ctx.current.devMode = devMode ?? IS_DEV_ENV;
  }, [devMode]);

  return <stylixSheetContext.Provider value={ctx.current}>{children}</stylixSheetContext.Provider>;
}
