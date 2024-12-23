import $ from '../index';
import { renderStylix } from './util';

describe('Stylix $component prop', () => {
  it('should render component with className prop', () => {
    function TestComponent({ className, other, ...rest }: { className?: string; other: 'other' }) {
      return <div className={className} data-other={other} {...rest} />;
    }

    void (
      <$
        $component={TestComponent}
        // @ts-expect-error unknown prop
        unknown="unknown"
      />
    );

    // @ts-expect-error missing required 'other' prop
    void (<$ $component={TestComponent} />);

    // @ts-expect-error invalid 'other' prop value
    void (<$ $component={TestComponent} other="wrong" />);

    const [json, styles] = renderStylix(
      <$
        $component={TestComponent}
        color="red"
        font-size={13}
        other="other"
        className="mergedClass"
      />,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
