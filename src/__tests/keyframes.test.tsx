import $, { useKeyframes } from '../index';
import { renderStylix } from './util';

describe('useKeyframes()', () => {
  it('should work', () => {
    const Component1 = function Component() {
      const animation = useKeyframes({
        from: { color: 'red' },
        to: { color: 'blue' },
      });
      return <$.div data-testid="div1" animation={`${animation} 1s linear infinite`} />;
    };

    const { styles } = renderStylix(<Component1 />);
    expect(styles).toMatchSnapshot();
  });

  it('should hoist nested keyframes to root', () => {
    const Component1 = function Component() {
      const animation = useKeyframes({
        from: { color: 'red' },
        to: { color: 'blue' },
      });
      return (
        <$.div
          data-testid="div1"
          animation={`${animation} 1s linear infinite`}
          $css={{
            '@keyframes tester': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          <$.div
            $css={{
              '@keyframes tester-2': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            test
          </$.div>
        </$.div>
      );
    };

    const { containerHtml, styles } = renderStylix(<Component1 />);
    expect(containerHtml).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should merge duplicate keyframes', () => {
    const Component1 = function Component() {
      const animation = useKeyframes({
        from: { color: 'red' },
        to: { color: 'blue' },
      });
      return <$.div data-testid="div1" animation={`${animation} 1s linear infinite`} />;
    };

    // Second component with same styles should merge keyframes
    const Component2 = function Component() {
      const animation = useKeyframes({
        from: { color: 'red' },
        to: { color: 'blue' },
      });
      return <$.div data-testid="div2" animation={`${animation} 1s linear infinite`} />;
    };

    // Third component with new styles
    const Component3 = function Component() {
      const animation = useKeyframes({
        from: { color: 'green' },
        to: { color: 'purple' },
      });
      return <$.div data-testid="div3" animation={`${animation} 1s linear infinite`} />;
    };

    const { styles } = renderStylix(
      <>
        <Component1 />
        <Component2 />
        <Component3 />
      </>,
    );
    expect(styles).toMatchSnapshot();
  });

  it('should work with percentage frames', () => {
    const Component = function Component() {
      const animation = useKeyframes({
        '0%': { color: 'red' },
        '100%': { color: 'blue' },
      });
      return <$.div data-testid="div" animation={`${animation} 1s linear infinite`} />;
    };

    const { styles } = renderStylix(<Component />);
    expect(styles).toMatchSnapshot();
  });
});
