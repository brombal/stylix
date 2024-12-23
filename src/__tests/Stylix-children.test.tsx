import $ from '../index';
import { renderStylix } from './util';

describe('Stylix $render prop', () => {
  it('should render component with className prop', () => {
    const [json, styles] = renderStylix(
      <$ className="mergedClass" data-other="other" color="red" font-size={13}>
        {(className, props) => <div className={className} {...props} />}
      </$>,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
