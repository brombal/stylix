import $ from '../index';
import { renderStylix } from './util';

describe('Stylix $el prop as element', () => {
  it('should render element with class name', () => {
    void (<$ $el={<div data-other="other" />} unknown="unknown" />);

    const [json, styles] = renderStylix(
      <$
        $el={<div data-other="other" />}
        color="red"
        font-size={13}
        className="mergedClass"
        data-passthru="passthru"
      />,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
