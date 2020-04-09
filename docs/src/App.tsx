// import './github.css';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faAtomAlt } from '@fortawesome/pro-light-svg-icons';
import { faCopyright } from '@fortawesome/pro-regular-svg-icons';
import { faPaintBrushAlt } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import $ from 'stylix';

import Markdown from './Markdown';

export default function App() {
  const history = useHistory();
  const location = useLocation();

  const navRef = useRef<HTMLDivElement>();

  const updateSelectedNav = useCallback(() => {
    console.log('updateSelectedNav');
    navRef.current &&
      navRef.current.querySelectorAll('a').forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === '/stylix' + location.pathname);
      });
  }, [location]);

  useEffect(updateSelectedNav, [location]);

  return (
    <div
      onClick={(e) => {
        const href = (e.target as HTMLDivElement).getAttribute('href') || '';
        if (href.startsWith('/stylix')) {
          history.push(href.replace(/^\/stylix/, ''));
        }
        e.preventDefault();
      }}
    >
      <$ display="flex" flex-direction="column" align-items="stretch" min-height="100vh">
        <$
          flex="0 0 auto"
          display="flex"
          align-items="center"
          justify-content="space-between"
          border-bottom="1px solid #DDD"
          height={65}
          padding="8px 20px 8px 40px"
        >
          <$ $inject $selector="&:hover .foo" transform="rotate(180deg)">
            <$
              flex="0 0 auto"
              display="flex"
              align-items="center"
              cursor="pointer"
              onClick={() => history.push('/')}
            >
              <$ position="relative" margin-right={15}>
                <$
                  $el={FontAwesomeIcon}
                  icon={faAtomAlt}
                  color="#DDD"
                  font-size={40}
                  transition="transform 300ms ease-in-out"
                  className="foo"
                />
                <$
                  $el={FontAwesomeIcon}
                  icon={faPaintBrushAlt}
                  color="#d81b60"
                  font-size={24}
                  position="absolute"
                  bottom={5}
                  right={0}
                />
              </$>
              <$.a
                font-size={34}
                color="#333"
                font-weight={500}
                letter-spacing="-0.05em"
                margin-top={1}
              >
                Stylix
              </$.a>
            </$>
          </$>
          <$ flex="0 0 auto">
            <$.a href="/" display="flex" align-items="center">
              <$ $el={FontAwesomeIcon} icon={faGithub} margin-right={4} /> GitHub
            </$.a>
          </$>
        </$>
        <$ flex="1 1 auto" display="flex" flex-direction="row">
          <$
            display="flex"
            flex-direction="column"
            width={300}
            flex="0 0 auto"
            border-right="1px solid #DDD"
            background="#f8f8f8"
            padding="30px 40px"
            $selectors={{
              li: { listStyle: 'none', marginTop: 15 },
              'li ul': { paddingLeft: 20 },
              'li ul li': { fontSize: '0.9em' },
              a: { display: 'block' },
              'a.active': { color: '#333', fontWeight: 'bold' },
            }}
          >
            <Markdown ref={navRef} path="_menu" onRender={updateSelectedNav} />
          </$>
          <$ display="flex" flex="1 1 auto" flex-direction="column" align-items="center">
            <$ width="100%" flex="1 1 auto" max-width={800} padding="50px 0 100px">
              <Markdown path={location.pathname} />
            </$>
            <$ text-align="center" color="#BBB" font-style="italic" padding="0 0 50px">
              Copyleft
              <$
                $el={FontAwesomeIcon}
                icon={faCopyright}
                rotation={180}
                margin="0 6px 0 8px"
                font-size={15}
              />
              2020 Alex Brombal. No rights reserved.
            </$>
          </$>
        </$>
      </$>
    </div>
  );
}
/*
function Example() {
  return (
    <div>
      <$ color="green">green</$>
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
*/
