import React from 'react';

import $, { StylixProps } from '../src';
import { renderStylix } from './util';

describe('Custom component', () => {
  it('should work with basic styles', () => {
    function MyComponent(props: StylixProps) {
      return <$.div {...props} />;
    }

    // Accepts style prop
    void (<MyComponent color="red" />);
    void (<MyComponent marginTop={5} color={['red']} />);
    void (<MyComponent margin-top={5} color={() => 'red'} />);

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
    function MyComponent(props: StylixProps<{ otherProp: string; color: 'onlyThis' }>) {
      return <$.div {...props} />;
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
    function MyComponent(
      props: StylixProps<{ color: 'must be this value'; otherProp: string }, { newColor: 'color' }>,
    ) {
      return <$.div {...props} />;
    }

    void (<MyComponent color="must be this value" otherProp="" newColor="color" />);

    // @ts-expect-error - color is wrong value
    void (<MyComponent color="red" otherProp="" />);
    // @ts-expect-error - otherProp & newColor missing
    void (<MyComponent color="must be this value" />);

    const [json, styles] = renderStylix(
      <MyComponent otherProp="foo" color="must be this value" newColor="color" />,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should map optional props', () => {
    function MyComponent(
      props: StylixProps<
        { color: 'must be this value'; otherProp: string },
        { newColor?: 'color' }
      >,
    ) {
      return <$.div {...props} />;
    }

    void (<MyComponent color="must be this value" otherProp="" newColor="color" />);
    void (<MyComponent color="must be this value" otherProp="" />);
  });
});
