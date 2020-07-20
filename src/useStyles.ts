import { useLayoutEffect } from 'react';
import { throttle } from 'throttle-debounce';

import applyRules from './applyRules';
import postcssToRuleArray from './postcssToRuleArray';
import serializeToPostcss from './serializeToPostcss';
import { StylixContext, useStylixContext } from './StylixProvider';
import { useStylixTheme } from './StylixTheme';
import { hashString } from './utils';

function cleanup(ctx: StylixContext): void {
  let deleted = false;
  Object.keys(ctx.hashRefs).forEach((hash) => {
    if (!ctx.hashRefs[hash]) {
      delete ctx.rules[hash];
      delete ctx.hashRefs[hash];
      deleted = true;
    }
  });
  deleted && applyRules(ctx);
}

const throttledCleanup = throttle(100, false, cleanup, false);

/**
 * Accepts an object of postcss-compatible styles and returns a className based on the styles' hash.
 * If `global` is false, provided styles are contained within the generated classname.
 * Returns the className hash if enabled, or an empty string.
 */
export function useStyles(styles: any, global: boolean, enabled: boolean): string {
  const stylixCtx = useStylixContext();
  const themeCtx = useStylixTheme();

  const stylesRef = { postcss: '', hash: '', rules: [] }; // useRef<string>();

  // Serialize value into postcss and generate hash
  const json = enabled && styles && JSON.stringify(styles);
  stylesRef.hash = json && json !== '{}' && json !== '[]' ? hashString(json) : '';

  // When hash changes, add/remove ref count
  useLayoutEffect(() => {
    if (!stylesRef.hash) return;

    stylixCtx.hashRefs[stylesRef.hash] = (stylixCtx.hashRefs[stylesRef.hash] || 0) + 1;

    return () => {
      stylixCtx.hashRefs[stylesRef.hash]--;
      throttledCleanup(stylixCtx);
    };
  }, [stylesRef.hash]);

  if (!stylesRef.hash) {
    return '';
  }

  // If css is not cached, process postcss to css and cache.
  // Apply rules here, since this is the only way rules are changed
  if (!stylixCtx.rules[stylesRef.hash]) {
    // If not global styles, wrap original styles with classname
    stylesRef.postcss = serializeToPostcss(
      global ? styles : { ['.' + stylesRef.hash]: styles },
      stylixCtx,
      themeCtx,
    );
    stylesRef.rules = postcssToRuleArray(stylesRef.postcss, stylixCtx);
    stylixCtx.rules[stylesRef.hash] = stylesRef;
    applyRules(stylixCtx);
  }

  return stylesRef.hash;
}
