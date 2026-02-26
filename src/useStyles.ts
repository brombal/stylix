import { useInsertionEffect, useRef } from 'react';
import applyRules from './applyRules';
import { getParentComponentName } from './getParentComponentName';
import { applyPlugins } from './plugins';
import stylesToRuleArray from './stylesToRuleArray';
import { type StylixContext, useStylixContext } from './stylixContext';
import type { StylixObject, StylixStyles } from './types';
import { isEmpty } from './util/isEmpty';

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

export function createStyles(config: {
  stylixCtx: StylixContext;
  key?: string;
  styles: StylixStyles;
  global?: boolean;
  debugLabel?: string;
}): { className: string; key: string } {
  const { stylixCtx, global } = config;
  let styles = config.styles;
  const priorKey = config.key || '';

  let stylesKey = '';
  if (styles && !isEmpty(styles)) {
    // Preprocess styles with plugins
    styles = applyPlugins('preprocessStyles', styles, null, stylixCtx);
    // Generate styles key
    stylesKey = styles ? (global ? 'global:' : '') + JSON.stringify(styles) : '';
  }

  if (stylesKey && !stylixCtx.rules[stylesKey]) {
    stylixCtx.styleCounter++;
    const debugLabel = config.debugLabel || (stylixCtx.devMode && getParentComponentName()) || '';
    const className = `stylix-${(stylixCtx.styleCounter).toString(36)}${debugLabel ? `-${debugLabel}` : ''}`;
    // If not global styles, wrap original styles with classname
    if (!global) styles = { [`.${className}`]: styles };
    stylixCtx.rules[stylesKey] = {
      className,
      rules: stylesToRuleArray(styles as StylixObject, className, stylixCtx),
      refs: 0,
    };
  }

  const isChanged = stylesKey !== priorKey;
  const ruleSet = stylesKey ? stylixCtx.rules[stylesKey] : null;

  if (isChanged) {
    // Mark styles to be applied
    stylixCtx.requestApply = true;

    // When json changes, add/remove ref count
    const priorRuleSet = priorKey ? stylixCtx.rules[priorKey] : null;
    if (priorRuleSet) priorRuleSet.refs--;
    if (ruleSet) ruleSet.refs++;
  }

  return {
    className: ruleSet?.className || '',
    key: stylesKey,
  };
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

  const prevStylesKey = useRef('');

  const s = createStyles({
    stylixCtx,
    styles,
    global: options.global,
    debugLabel: options.debugLabel,
    key: prevStylesKey.current,
  });

  prevStylesKey.current = s.key;

  // Apply styles if requested.
  // This runs on every render. We utilize useInsertionEffect so that it runs *after* all the other
  // renders have completed. stylixCtx.requestApply guards against multiple runs. This reduces the number of calls
  // to applyRules(), but prevents styles potentially being added to the DOM after other components force the
  // browser to compute styles.
  // biome-ignore lint/correctness/useExhaustiveDependencies: stylixCtx is stable
  useInsertionEffect(() => {
    if (!stylixCtx.requestApply) return;
    stylixCtx.requestApply = false;
    applyRules(stylixCtx);

    return () => {
      cleanup(stylixCtx);
    };
  }, [s.key]);

  return s.className;
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
