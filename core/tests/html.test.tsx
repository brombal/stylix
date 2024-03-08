import React from 'react';

import $ from '../src';

declare module '../src' {
  interface StylixPropsExtensions {
    customProp: 'customValue';
  }
}

describe('html elements', () => {
  it('should have proper type checks', () => {
    // Empty is okay
    void (<$.div />);

    // Known html prop is okay
    void (<$.div id="test" onClick={() => {}} />);

    // Known style prop is okay
    void (<$.div margin="1px" />);
    void (<$.div margin={0} />);

    // Correct custom prop value
    void (<$.div customProp="customValue" />);
    // @ts-expect-error - wrong custom prop value
    void (<$.div customProp="wrong" />);

    // @ts-expect-error - invalid style prop value
    void (<$.div color={0} />);

    // Valid prop for element
    void (<$.a href="" />);
    // @ts-expect-error - invalid prop for element
    void (<$.div href="" />);

    // @ts-expect-error - unknown prop
    void (<$.div unknownProp />);
    // @ts-expect-error - unknown prop
    void (<$.div id="test" unknownProp />);

    // @ts-expect-error - wrong custom prop value
    void (<$.div fizz="wrong" />);

    const props: { otherProp: string } = null!;
    // @ts-expect-error - prop spread has invalid prop
    void (<$.div {...props} />);
    // Prop spread is okay when valid prop exists (TS quirk :( )
    void (<$.div id="foo" {...props} />);
  });
});
