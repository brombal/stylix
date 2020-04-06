import { MarkdownAbstractSyntaxTree } from 'react-markdown';

function escapeHtml(html: string) {
  const text = document.createTextNode(html);
  const p = document.createElement('p');
  p.appendChild(text);
  return p.innerHTML.replace(/"/g, '&quot;');
}

export default function reactMarkdownSandbox(tree: MarkdownAbstractSyntaxTree) {
  tree.children =
    tree.children &&
    tree.children.map((node) => {
      if (node.type === 'code' && node.lang === 'jsx') {
        const escaped = escapeHtml(node.value!);
        return {
          type: 'html',
          value: `
            <pre><code class="lang-jsx">${escaped}</code></pre>
            <iframe
              src="/stylix/sandbox.html" 
              onload="${escapeHtml(`this.contentWindow.postMessage({ type: 'react', lib: ${JSON.stringify(process.env.REACT_APP_SANDBOX_LIB)}, script: this.getAttribute('data-script') }, '*')`)}" 
              data-script="${escaped}"
            />
          `,
        };
      }
      return node;
    });
  return tree;
}
