import type { StylixContext } from './StylixProvider';

export function flattenRules(ctx: StylixContext): string[] {
  return Object.values(ctx.rules)
    .flatMap((val) => (val && val.refs > 0 ? val.rules : []))
    .filter(Boolean);
}

/**
 * Applies rules from given StylixContext to the <style> element.
 */
export default function applyRules(ctx: StylixContext): void {
  if (ctx.styleCollector) {
    const flattenedRules = flattenRules(ctx);
    ctx.styleCollector.length = 0;
    ctx.styleCollector.push(...flattenedRules);
    return;
  }

  if (ctx.ssr) return;

  const supportsAdoptedStylesheets = 'adoptedStyleSheets' in document;

  // If there's no style element, and we're in dev mode or legacy browser, create one
  if (!ctx.styleElement && (ctx.devMode || !supportsAdoptedStylesheets)) {
    ctx.styleElement = document.createElement('style');
    ctx.styleElement.className = 'stylix';
    if (ctx.id) ctx.styleElement.id = `stylix-${ctx.id}`;
    document.head.appendChild(ctx.styleElement);
  }

  if (ctx.devMode && ctx.styleElement) {
    const flattenedRules = flattenRules(ctx);
    ctx.styleElement.innerHTML = flattenedRules.join('\n');
  } else {
    // If there's a style element, use its stylesheet
    if (ctx.styleElement) ctx.stylesheet = ctx.styleElement.sheet as CSSStyleSheet;

    // Still no stylesheet yet, create one
    if (!ctx.stylesheet) {
      ctx.stylesheet = new CSSStyleSheet();
      if (supportsAdoptedStylesheets) {
        document.adoptedStyleSheets.push(ctx.stylesheet);
      } else if (ctx.stylesheet.ownerNode) {
        document.head.appendChild(ctx.stylesheet.ownerNode);
      }
    }

    const stylesheet = ctx.stylesheet;

    const flattenedRules = flattenRules(ctx);
    if (stylesheet.replaceSync) {
      try {
        stylesheet.replaceSync(flattenedRules.join('\n'));
      } catch (e) {
        // Errors are ignored, this just means that a browser doesn't support a certain CSS feature.
        console.warn(e);
      }
    } else {
      // Legacy method
      while (stylesheet.rules?.length || stylesheet.cssRules?.length) {
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
