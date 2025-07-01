import type { ReactNode } from 'react';
import $ from '../index';
import { renderStylix } from './util';

describe('Stylix $el prop as function component', () => {
  it('should succeed', () => {
    function TestComponent({
      className,
      other,
      ...rest
    }: {
      className?: string;
      other?: 'other';
    }): ReactNode {
      return <div className={className} data-other={other} {...rest} />;
    }

    void (<$ $el={TestComponent} />);

    const [json, styles] = renderStylix(
      <$ $el={TestComponent} color="red" font-size={13} other="other" className="mergedClass" />,
    );
    expect(json).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
