/**
 * Applies rules from given StylixContext to the <style> element.
 */
export default function applyRules(ctx) {
    const flattenedRules = Object.values(ctx.rules).reduce((acc, val) => acc.concat(val.rules), []);
    if (ctx.devMode) {
        const container = ctx.styleElement;
        container.innerHTML = flattenedRules.join('\n');
    }
    else {
        const container = ctx.stylesheet;
        if (container.rules)
            while (container.rules.length) {
                container.deleteRule(0);
            }
        flattenedRules.forEach((rule, i) => container.insertRule(rule, i));
    }
}
//# sourceMappingURL=applyRules.js.map