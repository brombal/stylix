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

  it('should render scopes', () => {
    const el = (
      <$.div
        $css={{
          color: 'purple',

          '@scope (.foo) to (.bar)': {
            color: 'red',
          },
        }}
      >
        <span className=".foo">
          <span>foo</span>
          <span className=".bar">
            <span>bar</span>
          </span>
        </span>
      </$.div>
    );

    const [json, styles] = renderStylix(el);

    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
