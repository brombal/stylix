import $ from '../index';
import { renderStylix } from './util';

describe('Basic Stylix usage', () => {
  it('should work', () => {
    const [json, styles] = renderStylix(
      <$.div>
        <$.span color="red" font-size={13} data-testid="span" />
        <$.main color="blue" font-size={14} data-testid="main-1" />
        <$.article color="purple" font-size={15} data-testid="article" />
        <$.main color="blue" font-size={14} data-testid="main-2" />
      </$.div>,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should merge multiple styles', () => {
    const [json, styles] = renderStylix(
      <$.div
        display="inline-flex"
        align-items="center"
        justify-content="center"
        $css={[
          {
            '&:hover': { color: 'red' },
            '&:disabled': { color: 'gray' },
          },
          [
            {
              background: 'blue',
              '&:hover:not(:disabled)': { background: 'green' },
            },
          ],
          { height: 32, width: 32 },
        ]}
      >
        test
      </$.div>,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should remove falsy styles', () => {
    const [json, styles] = renderStylix(
      <$.div
        $css={[
          {
            '&:hover': false,
          },
        ]}
      >
        test
      </$.div>,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
