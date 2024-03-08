import React from 'react';
import renderer from 'react-test-renderer';

import $, { RenderServerStyles, StylixProvider } from '../src';

describe('RenderServerStyles', () => {
  it('should work with basic styles', () => {
    const el = renderer.create(
      <StylixProvider ssr>
        <$.div color="red">red</$.div>
        <$.div color="green">green</$.div>
        <RenderServerStyles />
      </StylixProvider>,
    );

    expect(el.toJSON()).toMatchSnapshot();
  });

  it('should not render anything on client', () => {
    const el = renderer.create(
      <StylixProvider ssr={false}>
        <$.div color="red">red</$.div>
        <$.div color="green">green</$.div>
        <RenderServerStyles />
      </StylixProvider>,
    );

    expect(el.toJSON()).toMatchSnapshot();
  });
});
