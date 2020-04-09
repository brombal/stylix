import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import $ from 'stylix';

import useFetchText from './useFetchText';

declare const Prism: any;

type MarkdownProps = { path: string; onRender(el: HTMLDivElement): void } & any;

export default React.forwardRef(function Markdown({ path, onRender, ...rest }: MarkdownProps, ref) {
  path = path.replace(/^\//, '');

  const req = useFetchText('/stylix/pages/' + (path || 'home') + '.md', {}, [path]);

  const error = req.error || !req.response.ok;

  useEffect(() => {
    if (!error && req.text) {
      onRender && onRender();
      Prism.highlightAll();
    }
  }, [req.text]);

  return (
    <$ ref={ref} {...rest}>
      {req.loading ? (
        <$ color="blue">Loading...</$>
      ) : error ? (
        <$ color="red">Error! Not found: {path}</$>
      ) : (
        req.text && (
          <div className="markdown-body">
            <ReactMarkdown source={req.text} />
          </div>
        )
      )}
    </$>
  );
});
