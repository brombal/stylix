import { StylixContext } from './StylixProvider';

/**
 * Applies rules from given StylixContext to the <style> element.
 */
export default function applyRules(ctx: StylixContext): void {
  const flattenedRules: string[] = [];

  for (const key in ctx.rules) {
    const val = ctx.rules[key];
    flattenedRules.push(...val.rules);
  }

  if (ctx.styleCollector) {
    ctx.styleCollector.length = 0;
    ctx.styleCollector.push(...flattenedRules);
    return;
  }

  if (ctx.devMode) {
    ctx.styleElement.innerHTML = flattenedRules.join('\n');
  } else {
    const container = ctx.stylesheet;
    if (container.cssRules)
      while (container.cssRules.length) {
        container.deleteRule(0);
      }
    for (const i in flattenedRules) container.insertRule(flattenedRules[i], +i);
  }
}
