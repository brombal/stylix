import $ from '../index';
import { renderStylix } from './util';

describe('container queries', () => {
  it('should render', () => {
    const el = (
      <$.div marginRight={4} container="parent / inline-size">
        <$.div
          $css={{
            '@container card (min-width: 1px)': {
              '&': {
                fontSize: '100cqw',
              },
            },
          }}
        />
      </$.div>
    );

    const [json, styles] = renderStylix(el);

    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
