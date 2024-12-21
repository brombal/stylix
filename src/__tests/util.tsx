import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import type React from 'react';

import { StylixProvider } from '../index';
import type { StylixMediaDefinition } from '../plugins/mediaObjects';

type RenderStylixReturn = readonly [string, string, ReturnType<typeof render>, HTMLStyleElement] & {
  containerHtml: string;
  styles: string;
  result: ReturnType<typeof render>;
  styleElement: HTMLStyleElement;
};

export function renderStylix(
  element: React.ReactElement,
  plugins?: any[],
  media?: StylixMediaDefinition,
): RenderStylixReturn {
  cleanup();
  const htmlStyleElement = document.createElement('style');
  document.head.appendChild(htmlStyleElement);
  const r = (
    <StylixProvider devMode styleElement={htmlStyleElement} plugins={plugins} media={media}>
      {element}
    </StylixProvider>
  );
  const result = render(r);

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
