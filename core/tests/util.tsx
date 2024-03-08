import React from 'react';
import renderer from 'react-test-renderer';

import { createStyleCollector, StylixProvider } from '../src';

export function renderStylix(element: React.ReactElement) {
  const x = createStyleCollector();
  const r = x.collect(<StylixProvider>{element}</StylixProvider>);
  const el = renderer.create(r);
  return [el.toJSON(), x.styles];
}
