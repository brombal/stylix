import $ from '../index';
import { renderStylix } from './util';

describe('$css', () => {
  it('should merge $css prop into styles', () => {
    const component = (
      <$.div color="red" background="blue" $css={{ color: 'green', fontSize: 12 }} />
    );

    const [json, styles] = renderStylix(component);
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
