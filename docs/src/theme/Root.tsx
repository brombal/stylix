import Head from '@docusaurus/Head';
import { customProps, StylixProvider, useGlobalStyles } from '@stylix/core';
import React from 'react';

const myCustomProps = customProps({});

declare module '@stylix/core' {
  interface StylixPropsExtensions {}
}

function RootInner(props) {
  useGlobalStyles({
    html: {
      font: '16px / 2 Montserrat, sans-serif',
    },
    a: {
      // color: '#067F91',
      transition: 'color 100ms linear',
      textDecoration: 'none',
      '&:hover': {
        // color: '#0CAAC1',
        textDecoration: 'underline',
      },
    },
    select: {
      border: '1px solid #CCC',
      padding: '4px 6px',
      borderRadius: 3,
    },
  });

  return (
    <>
      <Head>
        <script src="https://unpkg.com/typescript@5.0.2/lib/typescript.js"></script>

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Nunito:wght@700;900&family=Source+Code+Pro:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      {props.children}
    </>
  );
}

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <StylixProvider
      media={['', '(max-width: 1200px)', '(max-width: 1024px)']}
      plugins={[myCustomProps]}
    >
      <RootInner>{children}</RootInner>
    </StylixProvider>
  );
}
