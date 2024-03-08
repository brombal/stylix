import React from 'react';

import $ from '../src';
import { renderStylix } from './util';

describe('container queries', () => {
  it('should render', () => {
    const el = (
      <$.div
        $css={{
          '@container card (min-width: 1px)': {
            '&': {
              fontSize: '100cqw',
            },
          },
        }}
      />
    );

    const [json, styles] = renderStylix(el);

    console.log(json, styles);
  });

  it('should output container queries inside media queries', () => {
    const el = (
      <$.div
        $css={{
          '@media (min-width: 1px)': {
            '@container card (min-width: 1px)': {
              '&': {
                fontSize: '100cqw',
              },
            },
          },
        }}
      />
    );

    const [json, styles] = renderStylix(el);

    console.log(json, styles);
  });
});
