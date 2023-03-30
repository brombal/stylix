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
    const stylesheet = ctx.stylesheet;
    if (stylesheet.cssRules) {
      try {
        stylesheet.replace(flattenedRules.join('\n'));
      } catch (e) {
        // Errors are ignored, this just means that a browser doesn't support a certain CSS feature.
        console.warn(e);
      }
    } else if (stylesheet.rules) {
      // Legacy method
      while (stylesheet.rules.length) {
        stylesheet.deleteRule(0);
      }
      for (const i in flattenedRules)
        try {
          stylesheet.insertRule(flattenedRules[i], +i);
        } catch (e) {
          // Errors are ignored, this just means that a browser doesn't support a certain CSS feature.
          console.warn(e);
        }
    }
  }
}
