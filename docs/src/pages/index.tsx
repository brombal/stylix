import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo, { logoSrc } from '@site/src/components/HomepageFeatures/Logo';
import { prismTheme } from '@site/src/prismTheme';
import $, { StylixProps } from '@stylix/core';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import { PrismTheme } from 'prism-react-renderer';
import React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider, LiveProviderProps } from 'react-live';
import { Link } from 'react-router-dom';

interface CodeEditorProps {
  editable?: boolean;
  children: string;
}

const TsxLiveProvider = React.forwardRef(function TsxLiveProvider(
  props: Partial<LiveProviderProps>,
  ref: React.ForwardedRef<any>,
) {
  return (
    <LiveProvider
      language="tsx"
      scope={{ $ }}
      theme={prismTheme as PrismTheme}
      noInline
      transformCode={(snippet) => {
        const transpiled =
          (window as any).ts?.transpile(snippet, {
            noImplicitUseStrict: true,
            target: 'es2015',
            jsx: 'react',
            module: 'esnext',
          }) || snippet;
        // Get rid of import statements
        return transpiled.replace(/^\s*import .*$/gim, '');
      }}
      {...props}
      ref={ref}
    />
  );
});

function CodeEditor(props: StylixProps<'div', CodeEditorProps>) {
  const { editable = true, children, ...other } = props;

  const editorStyles: any = { padding: 'var(--ifm-pre-padding)' };

  return (
    <TsxLiveProvider code={children}>
      <$.div
        display="flex"
        borderRadius={5}
        overflow="hidden"
        boxShadow="var(--stylix-docs-code-box-shadow)"
        margin="0 0 var(--ifm-paragraph-margin-bottom)"
        {...other}
      >
        <$.div flex="0 0 auto" width="50%" position="relative">
          <LiveEditor {...editorStyles} />

          {editable && (
            <$.span
              position="absolute"
              font="12px Nunito, sans-serif"
              color="white"
              bottom={10}
              right={10}
              border="1px solid rgba(255, 255, 255, 0.8)"
              padding="0 8px"
              border-radius={20}
              opacity={0.5}
            >
              Editable
            </$.span>
          )}
        </$.div>
        <$.div
          flex="0 0 auto"
          width="50%"
          padding="var(--ifm-pre-padding)"
          overflow="auto"
          background="var(--stylix-docs-code-preview-background)"
        >
          <LiveError />
          <$ $el={LivePreview} line-height={1} />
        </$.div>
      </$.div>
    </TsxLiveProvider>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Hello asdf from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <LiveProvider
        language="tsx"
        code={logoSrc}
        scope={{ $ }}
        theme={prismTheme as PrismTheme}
        noInline
        transformCode={(snippet) => {
          const transpiled =
            (window as any).ts?.transpile(snippet, {
              noImplicitUseStrict: true,
              target: 'es2015',
              jsx: 'react',
              module: 'esnext',
            }) || snippet;
          // Get rid of import statements
          return transpiled.replace(/^\s*import .*$/gim, '');
        }}
      >
        <$.div
          background-image="radial-gradient(at 80% 10%, rgb(7, 104, 255) 0%, rgb(0, 213, 163) 100%)"
          color="white"
          text-shadow="0 0.1em 0.1em rgba(0, 0, 0, 0.15)"
        >
          <$.div className="container" position="relative">
            <$.div position="absolute" width="500px" top={50}>
              <$.span
                color="white"
                font="24px Nunito, sans-serif"
                display="inline-block"
                transform={[
                  'translate(-20px, -5px) rotate(-10deg)',
                  null,
                  'translate(-5px, -5px) rotate(-6deg)',
                ]}
                text-shadow="0 4px 12px rgba(0, 0, 0, 0.3)"
              >
                Editable!
                <$
                  $el={<FontAwesomeIcon icon={faLevelDownAlt} />}
                  margin-left={10}
                  vertical-align="-40%"
                />
              </$.span>

              <$.div border-radius={5} border-top="1px solid #FFF3" overflow="hidden">
                <LiveEditor />
                <LiveError />
              </$.div>
            </$.div>

            <$.div
              padding={['120px 0 150px 550px', '120px 0 150px', '60px 0 100px']}
              text-align="center"
            >
              <Logo />
              <$.div font-size={[30, 26, 20]} font-weight={400} opacity={0.75} line-height={1.2}>
                React, with style.
              </$.div>
            </$.div>
          </$.div>
        </$.div>

        <$.div position="relative" className="container" padding-bottom={50}>
          <$.div
            display="flex"
            align-items={['flex-start', null, 'center']}
            flex-direction={['row', null, 'column']}
          >
            <$.div flex="1 1 auto" padding={['50px 0 0 550px', '50px 0 0 50px', '50px 0 0 0']}>
              <$.h2>Style your app with pure React code.</$.h2>

              <$.p>
                Stylix is a new library and methodology for styling your React apps. With Stylix,
                you add styles to your components the same way you add any other information: with{' '}
                <b>props</b>.
              </$.p>

              <$.p>
                No separate CSS files, quirky alternative JavaScript syntax, or build tool
                configuration—<b>everything is React</b>, minimizing your learning curve and
                encouraging the same patterns and organizational best practices that have made React
                so popular.
              </$.p>

              <$.p>
                If you still aren&apos;t convinced, read the{' '}
                <Link to="/why-stylix">Why Stylix?</Link> page to see why we created Stylix, and why
                we think you&apos;ll love it.
              </$.p>

              <nav className="pagination-nav" aria-label="Docs pages navigation">
                <a
                  className="pagination-nav__link pagination-nav__link--next"
                  href="/docs/getting-started"
                >
                  <div className="pagination-nav__sublabel">Next</div>
                  <div className="pagination-nav__label">Getting Started</div>
                </a>
              </nav>

              <$.hr margin="40px 0" />

              <$.h2>Quick Start</$.h2>

              <$.p>Install using npm, yarn, or pnpm:</$.p>

              <Tabs>
                <TabItem value="npm" label="npm">
                  <CodeBlock language="bash">{`npm install @stylix/core`}</CodeBlock>
                </TabItem>
                <TabItem value="yarn" label="yarn">
                  <CodeBlock language="bash">{`yarn add @stylix/core`}</CodeBlock>
                </TabItem>
                <TabItem value="pnpm" label="pnpm">
                  <CodeBlock language="bash">{`pnpm add @stylix/core`}</CodeBlock>
                </TabItem>
              </Tabs>

              <$.p>
                Then, wrap your app with a <code>&lt;StylixProvider&gt;</code> element:
              </$.p>

              <CodeBlock language="tsx">{`import { StylixProvider } from '@stylix/core';

function App() {
  return (
    <StylixProvider>
      <MyComponent />
    </StylixProvider>
  );
}`}</CodeBlock>

              <$.p margin-bottom={50}>
                Now use elements like <code>{'<$.div>'}</code> (<code>$</code> is the default export
                from <code>@stylix/core</code>) and style them with any css properties:
              </$.p>

              <CodeEditor>{`import $ from '@stylix/core';

function MyComponent() {
  return (
    <$.div 
      color="teal" 
      font-size={23}
    >
      Hello, world!
    </$.div>
  );
}

render(<MyComponent />)`}</CodeEditor>
            </$.div>
          </$.div>
        </$.div>
      </LiveProvider>
    </Layout>
  );
}
