import merge from 'merge';
import React, { useContext, useLayoutEffect, useState } from 'react';

/**
 * StylixTheme
 *
 * A <StylixTheme> is a context wrapper that specifies a theme object and media queries.
 *
 * See the README.md for more details.
 */

export interface StylixThemeContext {
  theme: any;
  media: string[];
}

function mergeThemeContexts(...contexts: StylixThemeContext[]) {
  const obj = {} as StylixThemeContext;
  contexts.filter(Boolean).forEach((c) => (obj.theme = merge(obj.theme || {}, c.theme)));
  contexts.filter(Boolean).forEach((c) => (obj.media = c.media || obj.media));
  return obj;
}

function compareMediaArrays(a: string[], b: string[]): boolean {
  return (a?.join('|') || '') === (b?.join('|') || '');
}

const stylixThemeContext = React.createContext({} as StylixThemeContext);

export type StylixThemeProps = Partial<StylixThemeContext> & {
  children: any;
};

export const StylixTheme = React.memo(
  function StylixTheme({ theme, media, children }: StylixThemeProps) {
    const parent = useContext(stylixThemeContext);
    const [contextValue, setContextValue] = useState(() =>
      mergeThemeContexts(parent, { theme, media }),
    );

    useLayoutEffect(() => {
      setContextValue((contextValue) => {
        contextValue.theme = theme;
        contextValue.media = media;
        return mergeThemeContexts(parent, contextValue);
      });
    }, [parent, theme, media?.join('|') || '']);

    return (
      <stylixThemeContext.Provider value={contextValue}>{children}</stylixThemeContext.Provider>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.children === nextProps.children &&
      prevProps.theme === nextProps.theme &&
      compareMediaArrays(prevProps.media, nextProps.media)
    );
  },
);

export function useStylixTheme(): StylixThemeContext {
  return useContext(stylixThemeContext);
}
