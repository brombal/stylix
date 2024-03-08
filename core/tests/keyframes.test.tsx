import React from 'react';

import $, { useKeyframes } from '../src';
import { renderStylix } from './util';

describe('useKeyframes()', () => {
  it('should work with basic styles', () => {
    const Component = function Component() {
      const animation = useKeyframes({
        from: { color: 'red' },
        to: { color: 'blue' },
      });
      return <$.div animation={`${animation} 1s linear infinite`} />;
    };

    const [json, styles] = renderStylix(<Component />);
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should work with percentage frames', () => {
    const Component = function Component() {
      const animation = useKeyframes({
        '0%': { color: 'red' },
        '100%': { color: 'blue' },
      });
      return <$.div animation={`${animation} 1s linear infinite`} />;
    };

    const [json, styles] = renderStylix(<Component />);
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
