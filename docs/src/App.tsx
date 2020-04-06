import React from 'react';
import Markdown from 'react-markdown';
import './github.css';
import reactMarkdownSandbox from './react-markdown-sandbox';

export default function App() {
  return (
    <div>
      <Markdown className="markdown-body" astPlugins={[reactMarkdownSandbox]} escapeHtml={false}>{`
# Stylix

\`\`\`jsx
<div>
  <p>laskdjflaksjdf</p>
  <div>
    <p>laksdjflks</p>
  </div>
  <Stylix color="blue">aslkdfjals</Stylix>
</div>
\`\`\`

      `}</Markdown>
    </div>
  );
}
