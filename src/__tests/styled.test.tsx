import $, { type Extends, type StylixProps } from '../index';
import { renderStylix } from './util';

describe('Styled component wrappers', () => {
  it('should have correct type checking', () => {
    function TestComponent(props: {
      className?: string;
      theme: 'red' | 'blue';
      other: 'this-value';
    }) {
      return <div {...props} />;
    }

    // $render method (accepts className and other non-style props)
    void (<$ $render={() => <div />} color="blue" unknown="unknown" />);

    // @ts-expect-error color prop is invalid type
    void (<$ $render={() => <div />} color={9} />);

    // child method (same as $render)
    void (
      <$ color="blue" unknown="unknown">
        {(className) => <div className={className} />}
      </$>
    );
    // @ts-expect-error style prop is invalid type
    void (<$ color={0}>{(className) => <div className={className} />}</$>);

    // $component (will pass className and non-style props to component; type safe)
    void (<$ $component={TestComponent} color="blue" theme="red" other="this-value" />);
    void (
      <$
        $component={TestComponent}
        // @ts-expect-error unknown prop
        asdf="foo"
      />
    );
    // @ts-expect-error missing required props
    void (<$ $component={TestComponent} />);
    // @ts-expect-error wrong TestComponent prop value
    void (<$ $component={TestComponent} theme="wrong" other="this-value" />);
    void (
      <$
        $component={TestComponent}
        theme="red"
        other="this-value"
        // @ts-expect-error style prop is invalid type
        color={0}
      />
    );

    // $el (will clone element and pass className and other non-style props)
    void (
      <$
        $el={<TestComponent className="foo" theme="red" other="this-value" />}
        color="blue"
        unknown="unknown"
      />
    );
    // @ts-expect-error color prop is invalid type
    void (<$ $el={<TestComponent className="foo" theme="red" other="this-value" />} color={0} />);
  });

  it('should style a component with no prop mapping', () => {
    // Original component
    interface ComponentProps {
      prop: string;
      className?: string;
    }
    function MyComponent(props: ComponentProps) {
      return <div className={props.className} data-prop={props.prop} data-testid="MyComponent" />;
    }

    // Styled component wrapper
    function StyledComponent(props: StylixProps & ComponentProps) {
      return (
        <$ {...props}>
          {(className, props) => {
            return <MyComponent className={className} {...props} />;
          }}
        </$>
      );
    }

    // @ts-expect-error invalid prop type
    void (<StyledComponent prop={5} />);
    // @ts-expect-error missing prop
    void (<StyledComponent />);
    // @ts-expect-error invalid css prop type
    void (<StyledComponent prop="foo" color={0} />);

    // no css props is okay
    {
      const [json, styles] = renderStylix(<StyledComponent prop="foo" />);
      expect(json).toEqual('<div data-prop="foo" data-testid="MyComponent"></div>');
      expect(styles).toEqual('');
    }

    // with css props
    {
      const [json, styles] = renderStylix(
        <StyledComponent prop="foo" color="red" font-size={13} />,
      );
      expect(json).toEqual(
        '<div class="stylix-1" data-prop="foo" data-testid="MyComponent"></div>',
      );
      expect(styles).toMatchSnapshot();
    }
  });

  /**
   * Tests that a component with a conflicting style prop (color) can be styled by renaming the
   * css prop to a different name (cssColor).
   */
  it('should style a component with prop mapping (rename css prop)', () => {
    // Original component
    interface ComponentProps {
      color: 'primary' | 'secondary';
      className?: string;
    }
    function MyComponent(props: ComponentProps) {
      return <div className={props.className} data-color={props.color} data-testid="MyComponent" />;
    }

    // Styled component wrapper (color css prop is renamed to cssColor; color prop is passed to the original component)
    function StyledComponent(
      props: Extends<StylixProps, ComponentProps> & { cssColor?: StylixProps['color'] },
    ) {
      const { cssColor, color, ...other } = props;
      return (
        <$ color={cssColor} {...other}>
          {(className, props) => {
            // color is carried through from outer render function
            return <MyComponent className={className} color={color} {...props} />;
          }}
        </$>
      );
    }

    // @ts-expect-error invalid prop type
    void (<StyledComponent color="red" />);
    // @ts-expect-error missing prop
    void (<StyledComponent />);

    // no css props is okay
    {
      const [json, styles] = renderStylix(<StyledComponent color="primary" />);
      expect(json).toEqual('<div data-color="primary" data-testid="MyComponent"></div>');
      expect(styles).toEqual('');
    }

    // with css props
    {
      const [json, styles] = renderStylix(<StyledComponent color="primary" font-size={13} />);
      expect(json).toEqual(
        '<div class="stylix-1" data-color="primary" data-testid="MyComponent"></div>',
      );
      expect(styles).toMatchSnapshot();
    }
  });

  /**
   * Tests that a component with a conflicting style prop (color) can be styled by renaming the
   * component's prop to a different name (themeColor).
   */
  it('should style a component with prop mapping (rename component prop)', () => {
    // Original component
    interface ComponentProps {
      color: 'primary' | 'secondary';
      className?: string;
    }
    function MyComponent(props: ComponentProps) {
      return <div className={props.className} data-color={props.color} data-testid="MyComponent" />;
    }

    // Styled component wrapper (color css prop is consumed as css style; original component's color prop is renamed to themeColor)
    function StyledComponent(
      props: Extends<StylixProps, Omit<ComponentProps, 'color'>> & {
        themeColor: ComponentProps['color'];
      },
    ) {
      return (
        <$ {...props}>
          {(className, props) => {
            // color is carried through from outer render function
            return <MyComponent className={className} color={props.themeColor} {...props} />;
          }}
        </$>
      );
    }

    // @ts-expect-error invalid prop type
    void (<StyledComponent themeColor="red" />);
    // @ts-expect-error missing prop
    void (<StyledComponent />);

    // no css props is okay
    {
      const [json, styles] = renderStylix(<StyledComponent themeColor="primary" />);
      expect(json).toEqual('<div data-color="primary" data-testid="MyComponent"></div>');
      expect(styles).toEqual('');
    }

    // with css props
    {
      const [json, styles] = renderStylix(<StyledComponent themeColor="primary" font-size={13} />);
      expect(json).toEqual(
        '<div class="stylix-1" data-color="primary" data-testid="MyComponent"></div>',
      );
      expect(styles).toMatchSnapshot();
    }
  });
});
