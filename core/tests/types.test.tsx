/* eslint-disable @typescript-eslint/no-unused-vars */

import * as assert from 'assert';
import * as React from 'react';

import $, { type Extends, styled, type StylixProps, type StylixStyledComponent } from '../src';

/**
 * Test component with StylixProps for an html element.
 * Demonstrates that the component's props can accept any valid stylix prop,
 * and any prop defined in MyComponentProps. Types of props defined by MyComponentProps should always override any
 * conflicting style props.
 */

interface WrappedHtmlComponentProps {
  margin: 'must be this value';
  someOtherProp: number;
}

function WrappedHtmlComponent(
  props: StylixProps<WrappedHtmlComponentProps> & React.ComponentPropsWithoutRef<'div'>,
) {
  const {
    //@ts-expect-error Unknown prop
    unknown,
    margin,
    someOtherProp,
    ...other
  } = props;

  //@ts-expect-error Invalid value
  assert.ok(margin === 'asdf');
  assert.ok(margin === 'must be this value');

  // Check that someOtherProp is a number
  someOtherProp.toFixed();

  return <$.div {...other} />;
  // <$ $el={ComponentWithCssLookingProp} {...other} />
}

// @ts-expect-error Unknown prop
<WrappedHtmlComponent unknown="something" margin="must be this value" someOtherProp={4} />;
// @ts-expect-error Invalid 'margin' value
<WrappedHtmlComponent margin={2} someOtherProp={4} />;
<WrappedHtmlComponent margin="must be this value" someOtherProp={4} />;

/**
 * Test a component with StylixProps for another custom functional component.
 * Demonstrates that the component's props can accept any valid prop for the wrapped component, any valid stylix prop,
 * and any prop defined in MyComponentProps. Types of props defined by MyComponentProps should always override any
 * conflicting style props.
 */

interface ComponentWithCssLookingPropProps {
  margin: 'must be this value';
  someOtherProp: number;
}

function ComponentWithCssLookingProp(props: ComponentWithCssLookingPropProps) {
  // (Assume the component does something with props)
  return <div />;
}

interface WrapperComponentProps {
  padding: 'must be this value';
}

function WrapperComponent(
  props: Extends<StylixProps, ComponentWithCssLookingPropProps, WrapperComponentProps>,
) {
  //@ts-expect-error Wrong value
  props.margin === 'wrong value';
  props.margin === 'must be this value';
  //@ts-expect-error Wrong value
  props.padding === 'wrong value';
  props.padding === 'must be this value';

  // Valid style prop
  props.border;

  // Unknown prop (error)
  //@ts-expect-error Unknown prop
  props.unknown;

  // This should be valid
  <$ $el={ComponentWithCssLookingProp} {...props} />;

  // Unknown prop (error)
  // @ts-expect-error Unknown prop
  <$ $el={ComponentWithCssLookingProp} unknown />;

  // This is okay because Stylix always consumes props that it recognizes as styles
  <$ $el={ComponentWithCssLookingProp} margin={1} someOtherProp={1} />;

  // Invalid value for margin on inner component (error)
  <$
    $el={
      <ComponentWithCssLookingProp
        // @ts-expect-error Invalid value
        margin={1}
        someOtherProp={1}
      />
    }
  />;

  // Valid value for margin on inner component
  <$ $el={<ComponentWithCssLookingProp margin="must be this value" someOtherProp={1} />} />;

  return <div />;
}

export type ForcedStylePropsProps = StylixProps &
  Extends<
    Omit<ComponentWithCssLookingPropProps, 'margin'>,
    {
      padding: 'must be this value';
    }
  >;

export default function ForcedStyleProps(props: ForcedStylePropsProps) {
  props.margin === 'must be this value';
  // This is okay because now margin is forced as a style property
  props.margin === 1;
  //@ts-expect-error Invalid value for margin
  props.margin === { bad: 'value' };
  // Ok
  props.padding === 'must be this value';
  // This is not okay because padding is not a style property and was not forced
  //@ts-expect-error Invalid value for padding
  props.padding === 1;
}

// Test styled

const Flex: StylixStyledComponent<'div'> = styled('div', { display: 'flex' });

describe('Types', () => {
  it('should work', () => {
    // This is an empty test because this file is just used for type checking
  });
});
