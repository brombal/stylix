import $, { type StylixProps } from '../index';
import { renderStylix } from './util';

describe('Custom component', () => {
  it('should work with basic styles', () => {
    function MyComponent(props: StylixProps) {
      return <$.div {...props} />;
    }

    // Accepts style prop
    void (<MyComponent color="red" />);

    // @ts-expect-error - color is wrong type
    void (<MyComponent color={0} />);
    // @ts-expect-error - color is wrong type
    void (<MyComponent color={[0]} />);
    // @ts-expect-error - color is wrong type
    void (<MyComponent color={() => 0} />);

    const [json, styles] = renderStylix(<MyComponent color="red" />);
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should work with extended styles', () => {
    function MyComponent({
      otherProp,
      ...other
    }: StylixProps<{ otherProp: string; color: 'onlyThis' }>) {
      return <$.div {...other} data-other={otherProp} />;
    }

    // Accepts style prop
    void (<MyComponent otherProp="test" color="onlyThis" />);

    // @ts-expect-error - color is wrong type
    void (<MyComponent otherProp="test" color="red" />);
    // @ts-expect-error - otherProp is missing
    void (<MyComponent color="red" />);
    // @ts-expect-error - otherProp has wrong type
    void (<MyComponent otherProp={5} color="red" />);

    const [json, styles] = renderStylix(<MyComponent otherProp="foo" color="onlyThis" />);
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should map props to new name', () => {
    function MyComponent({
      otherProp,
      cssColor,
      color,
      ...styles
    }: StylixProps<{ color: 'must be this value'; otherProp: string }, { cssColor: 'red' }>) {
      return <$.div {...styles} color={cssColor} data-otherprop={otherProp} data-color={color} />;
    }

    void (<MyComponent color="must be this value" otherProp="" cssColor="red" />);

    // @ts-expect-error - color is wrong value
    void (<MyComponent color="red" otherProp="" />);
    // @ts-expect-error - otherProp & newColor missing
    void (<MyComponent color="must be this value" />);

    const [json, styles] = renderStylix(
      <MyComponent otherProp="foo" color="must be this value" cssColor="red" />,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should map optional props', () => {
    function MyComponent({
      cssColor,
      color,
      otherProp,
      ...styles
    }: StylixProps<{ color: 'must be this value'; otherProp: string }, { cssColor?: 'red' }>) {
      return <$.div {...styles} color={cssColor} data-otherprop={otherProp} data-color={color} />;
    }

    void (<MyComponent color="must be this value" otherProp="" cssColor="red" />);
    void (<MyComponent color="must be this value" otherProp="" />);

    const [json, styles] = renderStylix(<MyComponent color="must be this value" otherProp="" />);
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
