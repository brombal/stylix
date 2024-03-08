import React from 'react';

import $ from '../src';

describe('Stylix component', () => {
  it('should allow element for $el prop', () => {
    void (<$ $el={<div />} />);

    // @ts-expect-error - color is wrong type
    void (<$ $el={<div />} color={0} />);

    // Allows other props
    void (<$ $el={<div />} anyProp="value" />);
  });
});
