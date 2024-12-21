import $ from '../index';
import { renderStylix } from './util';

describe('Basic Stylix usage', () => {
  it('should work', () => {
    const [json, styles, result] = renderStylix(
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
});
