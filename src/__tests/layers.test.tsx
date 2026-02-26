import $ from '../index';
import { renderStylix } from './util';

describe('layer declarations', () => {
  it('should render', () => {
    const el = (
      <$.div
        $css={{
          span: {
            '@layer': 'test, span',
            '@layer span': {},
          },
          '@layer': 'test, span, other',
          '@layer test': {
            fontSize: 20,
          },
        }}
      />
    );

    const [json, styles] = renderStylix(el);

    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
