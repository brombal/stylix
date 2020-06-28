import React from 'react';

import { useStylixSheetContext } from './context';
import { applyContextRules } from './utils';

export function useStyles(styles: string, hash: string) {
  const ctx = useStylixSheetContext();

  React.useLayoutEffect(() => {
    if (hash in ctx.styles) {
      ctx.styles[hash].uses++;
    } else {
      ctx.styles[hash] = { styles: '', uses: 1 };
    }
    ctx.styles[hash].styles = styles;
    applyContextRules(ctx);

    requestAnimationFrame(() => {
      if (!ctx.styles[hash]?.uses || ctx.styles[hash]?.uses <= 0) {
        delete ctx.styles[hash];
      }
    });

    return () => {
      ctx.styles[hash].uses--;
    };
  }, [styles]);
}
