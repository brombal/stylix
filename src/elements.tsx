import React from 'react';
import { Stylix } from './Stylix';

const htmlTags = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'main',
  'map',
  'mark',
  'menu',
  'menuitem',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'picture',
  'pre',
  'progress',
  'q',
  'rt',
  'ruby',
  's',
  'samp',
  'section',
  'select',
  'slot',
  'small',
  'source',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'svg',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
];

/**
 * Gets the props of a given HTML tag.
 */
export type HTMLProps<TTag extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[TTag];

for (const i in htmlTags) {
  const Tag = htmlTags[i];
  (Stylix as any)[Tag] = React.forwardRef(({ htmlContent, htmlTranslate, ...props }: any, ref) => (
    <Stylix
      $render={(className, props) => (
        <Tag
          className={className}
          content={htmlContent}
          translate={htmlTranslate}
          ref={ref}
          {...props}
        />
      )}
      {...props}
    />
  ));
  (Stylix as any)[Tag].__isStylix = true;
  (Stylix as any)[Tag].displayName = `$.${Tag}`;
}
