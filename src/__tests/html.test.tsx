import $ from '../index';
import { renderStylix } from './util';

declare module '../types' {
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
    void (<$.a href="/">content</$.a>);
    // @ts-expect-error - invalid prop for element
    void (<$.div href="" />);

    // @ts-expect-error - unknown prop
    void (<$.div unknownProp />);
    // @ts-expect-error - unknown prop
    void (<$.div id="test" unknownProp />);

    // @ts-expect-error - wrong custom prop value
    void (<$.div fizz="wrong" />);

    const props: { otherProp: string } = null as any;
    // @ts-expect-error - prop spread has invalid prop
    void (<$.div {...props} />);
    // Prop spread is okay when valid prop exists (TS quirk :( )
    void (<$.div id="foo" {...props} />);
  });

  it('should pass htmlContent and htmlTranslate props correctly', () => {
    const {
      containerHtml: json,
      result: r,
      styleElement,
    } = renderStylix(
      <$.div
        data-testid="div"
        color="red"
        content='"css-content"'
        translate="10px"
        htmlContent="html-content"
        htmlTranslate="yes"
      />,
    );

    expect(json).toMatchSnapshot();
    expect(styleElement.innerHTML).toMatchSnapshot();

    void (
      <$.div
        // @ts-expect-error - invalid css content value
        content={0}
        // @ts-expect-error - invalid css translate value
        translate={[]}
        // @ts-expect-error - invalid htmlContent value
        htmlContent={0}
        // @ts-expect-error - invalid htmlTranslate value
        htmlTranslate="wrong"
      />
    );
  });
});
