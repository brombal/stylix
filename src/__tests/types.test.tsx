import $, { type Extends, type HTMLProps, type StylixProps } from '../index';
import type { StylixHTMLProps } from '../types';

describe('Types', () => {
  it('should work', () => {
    /**
     * Tests that the StylixProps type works as expected.
     * The first argument should override style props. The second argument should be extended from, so
     * new properties are fine but conflicting css properties are overridden.
     */
    type TestStylixProps = Extends<
      { color: number; otherProp: string },
      StylixProps,
      { padding: 'must be this value' }
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

    const x: Extends<
      { margin: { fizz: 'buzz' } },
      StylixHTMLProps<'div'>,
      { customProp?: string; fontSize?: { f: 1 } }
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

    function Input(props: Extends<StylixHTMLProps<'input'>, Pick<HTMLProps<'input'>, 'width'>>) {
      return <$.input {...props} />;
    }

    void (<Input />); // no width is fine
    void (<Input width={50} />);
    void (<Input width="50" />);
    // @ts-expect-error invalid value ('width' is the real HTML property, does not accept a media object):
    void (<Input width={{ mobile: 50 }} />);
    // @ts-expect-error real invalid value:
    void (<Input width={[50]} />);

    function Button(props: StylixHTMLProps<'button'>) {
      return <$.button {...props} />;
    }

    void (<Button content="50" />);
    void (<Button content={{ mobile: '50' }} />);
    // @ts-expect-error real invalid value:
    void (<Button content={50} />);
  });
});
