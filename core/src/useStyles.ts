import { useRef } from 'react';

import applyRules from './applyRules';
import { applyPlugins } from './plugins';
import stylesToRuleArray from './stylesToRuleArray';
import { StylixContext, useStylixContext } from './StylixProvider';
import { StylixStyles } from './types';
import { hashString } from './util/hashString';
import useIsoLayoutEffect from './util/useIsoLayoutEffect';

function cleanup(ctx: StylixContext): void {
  if (typeof ctx.cleanupRequest !== 'undefined') return;

  ctx.cleanupRequest = setTimeout(() => {
    let deleted = false;

    for (const i in ctx.rules) {
      const rule = ctx.rules[i];
      if (!rule.refs) {
        delete ctx.rules[rule.hash];
        deleted = true;
      }
    }
    deleted && applyRules(ctx);

    delete ctx.cleanupRequest;
  }, 100) as any;
}

function compare(a: any, b: any): any {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a === 'object') {
    if (Array.isArray(a) && Array.isArray(b) && a.length !== b.length) return false;
    else if (Object.keys(a).length !== Object.keys(b).length) return false;
    for (const key in b) {
      if (!compare(a[key], b[key])) return false;
    }
  }
  return a === b;
}

/**
 * Accepts a Stylix CSS object and returns a unique className based on the styles' hash.
 * The styles are registered with the Stylix context and will be applied to the document.
 * If `global` is false, provided styles will be nested within the generated classname.
 * Returns the className hash if enabled, or an empty string.
 */
export function useStyles(
  styles: Record<string, any>,
  options: { global?: boolean; disabled?: boolean } = { global: false, disabled: false },
): string {
  const stylixCtx = useStylixContext();

  const prevRef = useRef({ styles: {}, hash: '' } as any);

  const changed = !compare(styles, prevRef.current.styles);

  prevRef.current.styles = styles;

  if (changed) {
    // Preprocess styles with plugins
    if (!options.disabled && styles)
      styles = applyPlugins('preprocessStyles', styles, null, stylixCtx);

    // Serialize value and generate hash
    const json = !options.disabled && styles && JSON.stringify(styles);
    prevRef.current.hash =
      json && json !== '{}' && json !== '[]'
        ? hashString(JSON.stringify(stylixCtx.media || []) + json)
        : '';
  }

  const { hash } = prevRef.current;

  if (hash && changed && !stylixCtx.rules[hash]) {
    // If not global styles, wrap original styles with classname
    if (!options.global) styles = { ['.' + hash]: styles };
    stylixCtx.rules[hash] = {
      hash,
      rules: stylesToRuleArray(styles, hash, stylixCtx),
      refs: 1,
    };
    stylixCtx.requestApply = true;
  }

  // Apply styles if requested.
  // This runs on every render. We utilize useLayoutEffect so that it runs *after* all the other
  // renders have completed. stylixCtx.requestApply guards against multiple runs. This reduces the number of calls
  // to applyRules(), but prevents styles potentially being added to the DOM after other components force the
  // browser to compute styles.
  useIsoLayoutEffect(
    () => {
      if (!stylixCtx.requestApply) return;
      stylixCtx.requestApply = false;
      applyRules(stylixCtx);
    },
    undefined,
    true,
  );

  // When hash changes, add/remove ref count
  useIsoLayoutEffect(
    () => {
      if (!hash || !changed) return;

      if (stylixCtx.rules[hash]) {
        stylixCtx.rules[hash].refs++;
      }

      return () => {
        stylixCtx.rules[hash].refs--;
        cleanup(stylixCtx);
      };
    },
    [hash],
    false,
  );

  return hash;
}

export function useKeyframes(
  keyframes: any,
  options: { disabled?: boolean } = { disabled: false },
) {
  return useStyles({ '@keyframes $$class': keyframes }, { global: true, ...options });
}

export function useGlobalStyles(
  styles: StylixStyles,
  options: { disabled?: boolean } = { disabled: false },
) {
  return useStyles(styles, { ...options, global: true });
}
