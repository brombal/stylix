import { MarkdownAbstractSyntaxTree } from 'react-markdown';

function escapeHtml(html: string) {
  const text = document.createTextNode(html);
  const p = document.createElement('p');
  p.appendChild(text);
  return p.innerHTML.replace(/"/g, '&quot;');
}

/**
 * Plugin for markdown that replaces specially-designed code fences with an editable sandbox.
 *
 * Use a code fence with javascript, typescript, jsx, or tsx in the language name. Certain line comments will
 * configure the sandbox:
 *
 * // sandbox:config { ... }
 * This will configure the sandbox using the specified options, which is an object with the following keys:
 * - height: number; - The height of the iframe
 * - ratio: number; - The ratio of the code editor size to the preview window (0.5 by default)
 * - iframeStyle: object; - CSS styles to apply to the iframe
 */
export default function reactMarkdownSandbox(tree: MarkdownAbstractSyntaxTree) {
  tree.children =
    tree.children &&
    tree.children.map((node) => {
      if (node.type === 'code' && /\b(javascript|typescript|jsx|tsx|)\b/.test(node.lang!)) {
        if (!node.value!.includes('// sandbox')) return node;
        const lines = node.value!.split('\n');
        let currentEditor = { value: [] as string[] | string } as any;
        let opts = {} as any;
        let editors = [currentEditor];
        lines.forEach((line) => {
          if (line.startsWith('// sandbox')) {
            const parts = line.split(':');
            if (parts[1] === 'config') {
              const json = parts.slice(2).join(':');
              opts = JSON.parse(json);
            }
            if (parts[1] === 'split') {
              currentEditor = { value: [] };
              editors.push(currentEditor);
              parts.slice(2).forEach((part) => (currentEditor[part] = true));
            }
            return;
          }
          (currentEditor.value as string[]).push(line);
        });
        editors.forEach((editor) => (editor.value = (editor.value as string[]).join('\n')));
        editors = editors.filter((editor) => editor.value.trim().length > 0);
        return {
          type: 'html',
          value: `
            <div class="code-sandbox" style="height: ${opts.height || 'auto'}; ${opts.iframeStyle}">
              <iframe
                src="/stylix/sandbox.html" 
                onload="${escapeHtml(
                  `this.contentWindow.postMessage({
                    type: 'react', 
                    lib: ${JSON.stringify(process.env.REACT_APP_SANDBOX_LIB)}, 
                    editors: ${JSON.stringify(editors)},
                    opts: ${JSON.stringify(opts)}
                  }, '*')`,
                )}" 
              />
            </div>
          `,
        };
      }
      return node;
    });
  return tree;
}
