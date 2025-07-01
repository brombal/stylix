import type { ReactNode } from 'react';
import $ from '../index';
import { renderStylix } from './util';

describe('Stylix $el prop as element', () => {
  it('should render intrinsic element with merged class name', () => {
    const [json, styles] = renderStylix(
      <$
        $el={<div data-other="other" className="mergedClass" />}
        color="red"
        font-size={13}
        data-passthru="passthru"
      />,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('should render custom element with merged className', () => {
    function TestComponent({
      className,
      other,
      ...rest
    }: {
      className?: string;
      other: 'other';
    }): ReactNode {
      return <div className={className} data-other={other} {...rest} />;
    }

    const [json, styles] = renderStylix(
      <$
        $el={<TestComponent other="other" className="mergedClass" />}
        color="red"
        font-size={13}
      />,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
