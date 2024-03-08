import React from 'react';

import $, { styled } from '../src';
import { renderStylix } from './util';

describe('styled()', () => {
  it('should work with basic styles', () => {
    void (<$ $el="div" color="red" />);

    const Component = function Component(props: { otherProp: string }) {
      const { otherProp, ...other } = props;
      return <$.div {...other} data-otherProp={otherProp} />;
    };

    const StyledComponent = styled(Component);

    // Accepts style prop
    void (<StyledComponent otherProp="test" color="red" />);
    void (<StyledComponent otherProp="test" color={['red']} />);
    void (<StyledComponent otherProp="test" color={() => 'red'} />);

    // @ts-expect-error - color is wrong type
    void (<StyledComponent otherProp="test" color={0} />);
    // @ts-expect-error - color is wrong type
    void (<StyledComponent otherProp="test" color={[0]} />);
    // @ts-expect-error - color is wrong type
    void (<StyledComponent otherProp="test" color={() => 0} />);
    // @ts-expect-error - otherProp is missing
    void (<StyledComponent color="red" />);
    // @ts-expect-error - otherProp has wrong type
    void (<StyledComponent otherProp={5} color="red" />);

    const [json, styles] = renderStylix(<StyledComponent otherProp="foo" color="red" />);
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should map props to same name with different type', () => {
    function Component(props: { color: 'must be this value'; otherProp: string }) {
      return <$.div {...props} />;
    }

    const StyledComponent = styled(Component, {}, { color: 'color' });
    void (<StyledComponent color="must be this value" otherProp="" />);
    // @ts-expect-error - color is wrong value
    void (<StyledComponent color="red" otherProp="" />);
    // @ts-expect-error - otherProp is missing
    void (<StyledComponent color="must be this value" />);

    const [json, styles] = renderStylix(
      <StyledComponent otherProp="foo" color="must be this value" />,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should map props to different name with same type', () => {
    function Component(props: { color: 'must be this value'; otherProp: string }) {
      const { color, ...other } = props;
      return <$.div {...other}>{color}</$.div>;
    }

    // @ts-expect-error - 'wrong' is not a prop
    styled(Component, {}, { newColor: 'wrong' });
    // @ts-expect-error - 'otherProp' is not css prop
    styled(Component, {}, { newColor: 'otherProp' });
    const StyledComponent = styled(Component, {}, { newColor: 'color' });

    void (<StyledComponent newColor="must be this value" otherProp="" />);
    // @ts-expect-error - newColor is wrong value
    void (<StyledComponent newColor="red" otherProp="" />);
    // @ts-expect-error - newColor is missing
    void (<StyledComponent color="must be this value" otherProp="" />);
    // @ts-expect-error - color has wrong type (css color is not numeric)
    void (<StyledComponent color={0} otherProp="" />);
    // @ts-expect-error - otherProp is missing
    void (<StyledComponent newColor="must be this value" />);
    // @ts-expect-error - otherProp is wrong type
    void (<StyledComponent newColor="must be this value" otherProp={0} />);

    const [json, styles] = renderStylix(
      <StyledComponent newColor="must be this value" otherProp="" />,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should forward htmlContent prop to content', () => {
    const [json, styles] = renderStylix(<$.div content="css content" htmlContent="html content" />);

    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should forward htmlTranslate prop to translate', () => {
    // @ts-expect-error - htmlTranslate has invalid value
    renderStylix(<$.div htmlTranslate="html content" />);

    const [json, styles] = renderStylix(<$.div translate="css content" htmlTranslate="yes" />);

    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
