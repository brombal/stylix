import $ from '../index';
import { renderStylix } from './util';

describe('mediaObjects', () => {
  it('should work', () => {
    const [json, styles] = renderStylix(
      <$.div flex-direction={{ default: 'row', mobile: 'column' }} />,
      {
        media: {
          mobile: (styles) => ({
            '@media (max-width: 600px)': styles,
          }),
        },
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
      {
        media: {
          mobile: (styles) => ({
            '@media (max-width: 600px)': styles,
          }),
        },
      },
    );

    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should handle media objects combined with $css (2)', () => {
    const [json, styles] = renderStylix(
      <$.div
        padding={{ mobile: '10px 0', default: '20px 0' }}
        $css={[
          {
            mobile: { color: 'red' },
            default: { color: 'blue' },
          },
        ]}
      >
        test
      </$.div>,
      {
        media: {
          mobile: (styles) => ({
            '@media (max-width: 600px)': styles,
          }),
        },
      },
    );

    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
