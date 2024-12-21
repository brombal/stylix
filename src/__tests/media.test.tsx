import $ from '../index';
import { renderStylix } from './util';

describe('mediaObjects', () => {
  it('should work', () => {
    const [json, styles] = renderStylix(
      <$.div flex-direction={{ default: 'row', mobile: 'column' }} />,
      undefined,
      {
        mobile: (styles) => ({
          '@media (max-width: 600px)': styles,
        }),
      },
    );

    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
