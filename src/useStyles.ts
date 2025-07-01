import { useRef } from 'react';
import applyRules from './applyRules';
import { getParentComponentName } from './getParentComponentName';
import { applyPlugins } from './plugins';
import { type StylixContext, useStylixContext } from './StylixProvider';
import stylesToRuleArray from './stylesToRuleArray';
import type { StylixObject, StylixStyles } from './types';
import { isEmpty } from './util/isEmpty';
import useIsoLayoutEffect from './util/useIsoLayoutEffect';

function cleanup(ctx: StylixContext): void {
  if (typeof ctx.cleanupRequest !== 'undefined') return;

  const doCleanup = () => {
    for (const i in ctx.rules) {
      const rule = ctx.rules[i];
      if (!rule || rule.refs <= 0) {
        delete ctx.rules[i];
      }
    }
    ctx.cleanupRequest = undefined;
  };

  if (ctx.devMode) {
    doCleanup();
  } else {
    ctx.cleanupRequest = setTimeout(doCleanup, 100) as any;
  }
}

/**
 * Accepts a Stylix CSS object and returns a unique className.
 * The styles are registered with the Stylix context and will be applied to the document.
 * If `global` is false, provided styles will be nested within the generated classname.
 * Returns the className if enabled, or an empty string.
 */
export function useStyles(
  styles: StylixStyles,
  options: { global?: boolean; debugLabel?: string } = { global: false },
): string {
  const stylixCtx = useStylixContext();

  const prevStylesJson = useRef('');

  // Preprocess styles with plugins
  if (styles && !isEmpty(styles))
    styles = applyPlugins('preprocessStyles', styles, null, stylixCtx);

  let stylesJson = styles && !isEmpty(styles) ? JSON.stringify(styles) : '';
  if (stylesJson && options.global) stylesJson = `global:${stylesJson}`;

  const changed = stylesJson !== prevStylesJson.current;
  prevStylesJson.current = stylesJson;

  options.debugLabel ||= stylixCtx.devMode ? getParentComponentName() : '';

  if (stylesJson && !stylixCtx.rules[stylesJson]) {
    stylixCtx.styleCounter++;
    const className = `stylix-${(stylixCtx.styleCounter).toString(36)}${options.debugLabel ? `-${options.debugLabel}` : ''}`;
    // If not global styles, wrap original styles with classname
    if (!options.global) styles = { [`.${className}`]: styles };
    stylixCtx.rules[stylesJson] = {
      className,
      rules: stylesToRuleArray(styles as StylixObject, className, stylixCtx),
      refs: 0,
    };
  }

  if (changed) stylixCtx.requestApply = true;

  // When json changes, add/remove ref count
  const ruleSet = stylixCtx.rules[stylesJson];
  if (stylesJson && changed && ruleSet) {
    ruleSet.refs++;
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
    stylixCtx.ssr,
  );

  useIsoLayoutEffect(
    () => {
      if (!stylesJson || !changed) return;

      return () => {
        const ruleSet = stylixCtx.rules[stylesJson];
        if (!ruleSet) return;
        ruleSet.refs--;
        if (ruleSet.refs <= 0) stylixCtx.rules[stylesJson] = undefined;
        cleanup(stylixCtx);
      };
    },
    [stylesJson],
    false,
    stylixCtx.ssr,
  );

  return stylixCtx.rules[stylesJson]?.className || '';
}

export function useKeyframes(keyframes: any) {
  return useStyles({ '@keyframes $$class': keyframes }, { global: true });
}

export function useGlobalStyles(
  styles: StylixStyles,
  options: { disabled?: boolean } = { disabled: false },
) {
  return useStyles(styles, { ...options, global: true });
}
