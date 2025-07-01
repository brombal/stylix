import $ from '../index';
import { renderStylix } from './util';

describe('Stylix $render prop', () => {
  it('should render element with className and passed props', () => {
    const [json, styles] = renderStylix(
      <$
        $render={(className, props) => <div className={className} {...props} />}
        className="mergedClass"
        data-other="other"
        color="red"
        font-size={13}
      />,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
