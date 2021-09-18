"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Applies rules from given StylixContext to the <style> element.
 */
function applyRules(ctx) {
    const flattenedRules = [];
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
    }
    else {
        const container = ctx.stylesheet;
        if (container.rules)
            while (container.rules.length) {
                container.deleteRule(0);
            }
        for (const i in flattenedRules)
            container.insertRule(flattenedRules[i], +i);
    }
}
exports.default = applyRules;
//# sourceMappingURL=applyRules.js.map