import { render } from '@testing-library/react';
import $, { RenderServerStyles, StylixProvider } from '../index';

describe('RenderServerStyles', () => {
  it('should work with basic styles', () => {
    const result = render(
      <StylixProvider ssr>
        <$.div color="red">red</$.div>
        <$.div color="green">green</$.div>
        <RenderServerStyles />
      </StylixProvider>,
    );

    expect(result.container.innerHTML).toMatchSnapshot();
  });

  it('should not render anything on client', () => {
    const result = render(
      <StylixProvider ssr={false}>
        <$.div color="red">red</$.div>
        <$.div color="green">green</$.div>
        <RenderServerStyles />
      </StylixProvider>,
    );

    expect(result.container.innerHTML).toMatchSnapshot();
  });
});
