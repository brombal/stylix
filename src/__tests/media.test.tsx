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

  it('should handle media objects combined with $css', () => {
    const [json, styles] = renderStylix(
      <$.div
        visibility={{ default: 'hidden', mobile: 'visible' }}
        $css={[
          {
            '.test': {
              display: 'none',
            },
          },
        ]}
      >
        test
      </$.div>,
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
