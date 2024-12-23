import type { StylixProps } from '../index';
import type { StylixHTMLProps } from '../types';

describe('Types', () => {
  it('should work', () => {
    /**
     * Tests that the StylixProps type works as expected.
     * The first argument should override style props. The second argument should be extended from, so
     * new properties are fine but conflicting css properties are overridden.
     */
    type TestStylixProps = StylixProps<
      { padding: 'must be this value' },
      { color: number; otherProp: string }
    >;

    const props: TestStylixProps = {
      // prop overrides css style prop
      padding: 'must be this value',
      // prop is overridden by css style prop
      // @ts-expect-error invalid value
      color: 5,
      otherProp: 'valid',
    };

    // @ts-expect-error unknown prop
    void props.unknown;

    // Valid additional prop
    void props.otherProp;

    // @ts-expect-error invalid prop value
    void (props.otherProp === 5);

    // @ts-expect-error invalid prop value
    props.content = 4;

    const x: StylixHTMLProps<
      'div',
      { customProp?: string; fontSize?: { f: 1 } },
      { margin: { fizz: 'buzz' } }
    > = {};

    // ok - valid prop
    void x.onClick;
    // @ts-expect-error - unknown prop for div
    void x.href;
    // @ts-expect-error - unknown prop
    void x.unknown;
    // ok - valid custom prop
    void x.customProp;
    // ok - valid style prop override
    void x.fontSize?.f;
    // @ts-expect-error - prop is overridden
    void x.margin?.fizz;
  });
});
