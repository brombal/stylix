import * as CSS from 'csstype';
import React, { CSSProperties } from 'react';

/**
 * A string type that represents any MDN-defined css property name.
 */
type CSSProperty = keyof CSSProperties;

/**
 * These are the basic Box props, not including css properties, shortcuts, or pseudo classes.
 */
interface StylixCoreProps<T extends React.ElementType> {
  $el?: T; // Specifies element (default is <div>).
  $selector?: string; // Instead of creating an element, you can apply styles to a custom selector (such as "& > a").
  $inject?: boolean; // Instead of creating an element, you can inject props down to the Stylix's child element.
  $global?: string; // Specifies a global selector
  $disable?: boolean; // Pass true to disable applying styles
  $enable?: boolean; // Pass false to disable applying styles
  children?: any;
}

/**
 * Additional css shortcut props.
 * These props are accepted in addition to all other valid css properties. These mostly just get converted to the
 * long versions (see `shortcutMappings` values below), but some have special treatment (see `shortcutConversions`).
 * Comments indicate what shortcuts are for.
 */
interface IBoxCssShortcutProps {
  inline?: boolean; // display="inline"
  block?: boolean; // display="block"
  inlineBlock?: boolean; // display="inline-block"
  flex?: boolean; // display="flex"
  inlineFlex?: boolean; // display="inline-flex"
  flexMe?: CSS.FlexProperty<string | number>; // flex="...", needed because of 'flex' shorthand above
  flexChildren?: CSS.FlexProperty<string | number>; // flex="..." on all immediate children
  align?: CSS.AlignItemsProperty; // alignItems
  justify?: CSS.JustifyContentProperty; // justifyContent
  wrap?: CSS.FlexWrapProperty;
  absolute?: boolean; // position="absolute"
  relative?: boolean; // position="relative"
  column?: boolean; // flexDirection="column"
  bg?: CSS.BackgroundProperty<string | number>; // background
  bgColor?: CSS.BackgroundColorProperty; // backgroundColor
  m?: CSS.MarginProperty<string | number>; // margin
  mt?: CSS.MarginTopProperty<string | number>; // marginTop, etc
  mr?: CSS.MarginRightProperty<string | number>;
  mb?: CSS.MarginBottomProperty<string | number>;
  ml?: CSS.MarginLeftProperty<string | number>;
  p?: CSS.PaddingProperty<string | number>; // padding
  pt?: CSS.PaddingTopProperty<string | number>; // paddingTop, etc
  pr?: CSS.PaddingRightProperty<string | number>;
  pb?: CSS.PaddingBottomProperty<string | number>;
  pl?: CSS.PaddingLeftProperty<string | number>;
  size?: CSS.FontSizeProperty<string | number>; // fontSize
  weight?: CSS.FontWeightProperty; // fontWeight
  bold?: boolean; // weight="bold"
  italic?: boolean; // fontStyle="italic"
  vAlign?: CSS.VerticalAlignProperty<string | number>; // verticalAlign
  alignCenter?: boolean; // textAlign="center"
  alignRight?: boolean; // textAlign="right"
  alignLeft?: boolean; // textAlign="left"
  ellipsis?: boolean; // textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap"
}

/**
 * A string type that represents any valid key in IBoxCssShortcutProps.
 */
type BoxCssShortcutPropsKey = keyof IBoxCssShortcutProps;

/**
 * A type that represents any object containing style information that Box understands.
 * This includes all known css properties (kebab-case and camelCase), Box css shortcut props, and all css pseudo classes.
 */
type StylixStyleProps = Omit<CSSProperties, BoxCssShortcutPropsKey> & IBoxCssShortcutProps;

/**
 * All Stylix component props:
 * 1. Core props (StylixCoreProps)
 * 2. Style properties (StylixStyleProps)
 * 3. General React props and ref (React.ComponentPropsWithRef)
 */
export type StylixProps<T extends React.ElementType> = StylixCoreProps<T> &
  StylixStyleProps &
  React.ComponentPropsWithRef<T>;

export type StylixComponentType<T extends React.ElementType = 'div'> = React.ComponentType<
  StylixProps<T>
> & { __isStylix?: boolean };
