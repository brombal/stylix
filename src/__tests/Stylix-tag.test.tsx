import $ from '../index';
import { renderStylix } from './util';

describe('Stylix tag components', () => {
  it('should require correct props', () => {
    void (<$.div onClick={() => {}} />); // known prop
    void (<$.a href="/">test</$.a>); // known prop

    void (
      <$.div
        // @ts-expect-error - unknown prop
        unknown="unknown"
      />
    );

    void (
      <$.div
        // @ts-expect-error - unknown prop
        href="#"
      />
    );

    const [json, styles] = renderStylix(
      <$.div color="red" font-size={13} className="mergedClass" data-passthru="passthru" />,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
