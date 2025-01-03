import $ from '../index';
import { renderStylix } from './util';

describe('Stylix $el prop as component', () => {
  it('should render component with className prop', () => {
    function TestComponent({ className, other, ...rest }: { className?: string; other: 'other' }) {
      return <div className={className} data-other={other} {...rest} />;
    }

    void (
      <$
        $el={TestComponent}
        // @ts-expect-error unknown prop
        unknown="unknown"
      />
    );

    // @ts-expect-error missing required 'other' prop
    void (<$ $el={TestComponent} />);

    // @ts-expect-error invalid 'other' prop value
    void (<$ $el={TestComponent} other="wrong" />);

    const [json, styles] = renderStylix(
      <$ $el={TestComponent} color="red" font-size={13} other="other" className="mergedClass" />,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should require correct prop types when they conflict with styles', () => {
    function TestComponent({
      className,
      margin,
      ...rest
    }: { className?: string; margin: 'this-value' }) {
      return <div className={className} data-margin={margin} {...rest} />;
    }

    // margin is not required
    void (<$ $el={TestComponent} />);

    // margin has original type from styles
    void (<$ $el={TestComponent} margin={5} />);
  });
});
