import { useLayoutEffect } from 'react';

import applyRules from './applyRules';
import { applyPlugins } from './plugins';
import stylesToRuleArray from './stylesToRuleArray';
import { StylixContext, useStylixContext } from './StylixProvider';
import { hashString } from './util/hashString';

function cleanup(ctx: StylixContext): void {
  if (typeof ctx.cleanupRequest !== 'undefined') return;

  ctx.cleanupRequest = setTimeout(() => {
    let deleted = false;

    Object.values(ctx.rules).forEach((rule) => {
      if (!rule.refs) {
        delete ctx.rules[rule.hash];
        deleted = true;
      }
    });
    deleted && applyRules(ctx);

    delete ctx.cleanupRequest;
  }, 100) as any;
}

/**
 * Accepts a Stylix CSS object and returns a unique className based on the styles' hash.
 * The styles are registered with the Stylix context and will be applied to the document.
 * If `global` is false, provided styles will be nested within the generated classname.
 * Returns the className hash if enabled, or an empty string.
 */
export function useStyles(
  styles: any,
  options: { global?: boolean; disabled?: boolean } = { global: false, disabled: false },
): string {
  const stylixCtx = useStylixContext();

  // Preprocess styles with plugins
  if (!options.disabled && styles)
    styles = applyPlugins('preprocessStyles', styles, null, stylixCtx);

  // Serialize value and generate hash
  const json = !options.disabled && styles && JSON.stringify(styles);
  const hash =
    json && json !== '{}' && json !== '[]'
      ? hashString(JSON.stringify(stylixCtx.media || []) + json)
      : '';

  // When hash changes, add/remove ref count
  useLayoutEffect(() => {
    if (!hash) return;

    stylixCtx.rules[hash].refs++;

    return () => {
      stylixCtx.rules[hash].refs--;
      cleanup(stylixCtx);
    };
  }, [hash]);

  if (!hash) {
    return '';
  }

  // If css is not cached, process css and apply it.
  if (!stylixCtx.rules[hash]) {
    // If not global styles, wrap original styles with classname
    if (!options.global) styles = { ['.' + hash]: styles };
    stylixCtx.rules[hash] = {
      hash,
      rules: stylesToRuleArray(styles, hash, stylixCtx),
      refs: 0, // Immediately increased in useLayoutEffect above
    };
    applyRules(stylixCtx);
  }

  return hash;
}

export function useKeyframes(
  keyframes: any,
  options: { disabled?: boolean } = { disabled: false },
) {
  return useStyles({ '@keyframes $$class': keyframes }, { global: true, ...options });
}

export function useGlobalStyles(
  styles: any,
  options: { disabled?: boolean } = { disabled: false },
) {
  return useStyles(styles, { ...options, global: true });
}
