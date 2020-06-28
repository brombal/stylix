import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import $ from 'stylix';

import reactMarkdownSandbox from './react-markdown-sandbox';
import useFetchText from './useFetchText';

const htmlParser = require('react-markdown/plugins/html-parser')();

declare const Prism: any;

type MarkdownProps = { path: string; onRender(el: HTMLDivElement): void } & any;

function mergeRefs(...refs: any[]) {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];
  return (inst: any) => {
    for (const ref of filteredRefs) {
      if (typeof ref === 'function') {
        ref(inst);
      } else if (ref) {
        ref.current = inst;
      }
    }
  };
};

export default React.forwardRef<HTMLDivElement, MarkdownProps>(function Markdown(
  { path, onRender, ...rest }: MarkdownProps,
  ref,
) {
  path = path.replace(/^\//, '');

  const req = useFetchText('/stylix/pages/' + (path || 'home') + '.md', {}, [path]);

  const error = req.error || !req.response.ok;

  useEffect(() => {
    if (!error && req.text) {
      onRender && onRender();
      Prism.highlightAll();
    }
  }, [req.text, error]);

  const wrapperRef = useRef<any>();
  useEffect(() => {
    if (wrapperRef.current && req.text) {
      wrapperRef.current.querySelectorAll('script').forEach((script: HTMLScriptElement) => {
        const f = new Function('React', 'ReactDOM', script.innerText);
        f(React, ReactDOM);
      });
    }
  }, [req.text]);

  return (
    <>
      {req.loading ? (
        <$.div ref={ref} color="blue" {...rest}>
          Loading...
        </$.div>
      ) : error ? (
        <$.div ref={ref} color="red" {...rest}>
          Error! Not found: {path}
        </$.div>
      ) : (
        req.text && (
          <$.div
            ref={mergeRefs(ref, wrapperRef)}
            className="markdown-wrapper"
            line-height={1.8}
            $selectors={{
              h1: { fontSize: 50, fontWeight: 'normal', marginBottom: 30 },
              h2: { fontSize: 28, fontWeight: 'normal', marginBottom: 30 },
              'p, pre, ul': { marginBottom: 30 },
              code: {
                fontSize: 15,
                background: '#EEE',
                padding: '3px 5px',
                borderRadius: 3,
                margin: '0 2px',
              },
              'pre code': {
                fontSize: 15,
                background: 'none',
                padding: 0,
                borderRadius: 0,
                margin: 0,
              },
              '.code-sandbox': {
                border: '1px solid #CCC',
                borderRadius: 4,
                overflow: 'hidden',
                margin: '0 auto 35px',
              },
              '.code-sandbox iframe': {
                width: '100%',
                height: '100%',
                display: 'block',
              },
              ul: {
                marginLeft: 30,
              },
              li: {
                marginBottom: 10,
              },
            }}
            {...rest}
          >
            <ReactMarkdown
              astPlugins={[htmlParser, reactMarkdownSandbox]}
              escapeHtml={false}
              source={req.text}
            />
          </$.div>
        )
      )}
    </>
  );
});
