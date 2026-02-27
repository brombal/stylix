import '@testing-library/jest-dom';
import { cleanup, type RenderResult, render } from '@testing-library/react';
import type React from 'react';

import { type StylixContext, StylixProvider } from '../index';
import type { StylixMediaDefinition } from '../plugins/mediaObjects';

type RenderStylixReturn = readonly [string, string, ReturnType<typeof render>, HTMLStyleElement] & {
  containerHtml: string;
  styles: string;
  result: ReturnType<typeof render>;
  styleElement: HTMLStyleElement;
};

export function renderStylix(
  element: React.ReactElement,
  config?: {
    context?: StylixContext;
    plugins?: any[];
    media?: StylixMediaDefinition;
  },
): RenderStylixReturn {
  cleanup();

  let result: RenderResult;
  let htmlStyleElement: HTMLStyleElement;
  if (config?.context) {
    htmlStyleElement = config.context.styleElement!;
    const r = <StylixProvider context={config.context}>{element}</StylixProvider>;
    result = render(r);
  } else {
    htmlStyleElement = document.createElement('style');
    document.head.appendChild(htmlStyleElement);
    const r = (
      <StylixProvider
        devMode
        styleElement={htmlStyleElement}
        plugins={config?.plugins}
        media={config?.media}
      >
        {element}
      </StylixProvider>
    );
    result = render(r);
  }

  const returnVal = [
    result.container.innerHTML,
    htmlStyleElement.innerHTML,
    result,
    htmlStyleElement,
  ] as unknown as RenderStylixReturn;
  returnVal.containerHtml = result.container.innerHTML;
  returnVal.styles = htmlStyleElement.innerHTML;
  returnVal.result = result;
  returnVal.styleElement = htmlStyleElement;
  return returnVal;
}
