import postcss from 'postcss';
import Stringifier from 'postcss/lib/stringifier';
/**
 * Converts styles to an array of rules (suitable for passing to StyleSheet#insertRule()
 */
export default function postcssToRuleArray(styles, ctx) {
    try {
        const defs = [];
        ctx.defs.forEach((def) => defs.push(def));
        const rules = [''];
        postcss(ctx.postcssPlugins).process([...defs].join('\n') + styles, {
            map: true,
            // Dummy value that shows in debugger
            from: 'stylix-source',
            // We use postcss' built-in stringifier, but instead of stringifying, we append each root rule to an array.
            stringifier: (node, builder) => {
                let stackSize = 0;
                let currentRule = 0;
                const stringifier = new Stringifier((part, node, type) => {
                    if (node === undefined)
                        return;
                    if (type === 'start' && stackSize++ === 0) {
                        rules[++currentRule] = '';
                    }
                    rules[currentRule] += part;
                    if (type === 'end')
                        stackSize -= 1;
                });
                stringifier.stringify(node, builder);
            },
        }).css;
        return rules.map((r) => r.trim()).filter(Boolean);
    }
    catch (e) {
        if (e.name && e.reason) {
            console.error(`${e.name}: ${e.reason}\n`, e.source.replace('\n', ' ').substr(Math.max(0, e.column - 20), 100) + '\n', ' '.repeat(20) + '^');
        }
        else {
            console.error(e);
        }
        return [];
    }
}
//# sourceMappingURL=postcssToRuleArray.js.map