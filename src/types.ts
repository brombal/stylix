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

export type StylixHtmlTags = {
  a: React.ElementType<JSX.IntrinsicElements['a']>;
  abbr: React.ElementType<JSX.IntrinsicElements['abbr']>;
  address: React.ElementType<JSX.IntrinsicElements['address']>;
  area: React.ElementType<JSX.IntrinsicElements['area']>;
  article: React.ElementType<JSX.IntrinsicElements['article']>;
  aside: React.ElementType<JSX.IntrinsicElements['aside']>;
  audio: React.ElementType<JSX.IntrinsicElements['audio']>;
  b: React.ElementType<JSX.IntrinsicElements['b']>;
  base: React.ElementType<JSX.IntrinsicElements['base']>;
  bdi: React.ElementType<JSX.IntrinsicElements['bdi']>;
  bdo: React.ElementType<JSX.IntrinsicElements['bdo']>;
  blockquote: React.ElementType<JSX.IntrinsicElements['blockquote']>;
  body: React.ElementType<JSX.IntrinsicElements['body']>;
  br: React.ElementType<JSX.IntrinsicElements['br']>;
  button: React.ElementType<JSX.IntrinsicElements['button']>;
  canvas: React.ElementType<JSX.IntrinsicElements['canvas']>;
  caption: React.ElementType<JSX.IntrinsicElements['caption']>;
  cite: React.ElementType<JSX.IntrinsicElements['cite']>;
  code: React.ElementType<JSX.IntrinsicElements['code']>;
  col: React.ElementType<JSX.IntrinsicElements['col']>;
  colgroup: React.ElementType<JSX.IntrinsicElements['colgroup']>;
  data: React.ElementType<JSX.IntrinsicElements['data']>;
  datalist: React.ElementType<JSX.IntrinsicElements['datalist']>;
  dd: React.ElementType<JSX.IntrinsicElements['dd']>;
  del: React.ElementType<JSX.IntrinsicElements['del']>;
  details: React.ElementType<JSX.IntrinsicElements['details']>;
  dfn: React.ElementType<JSX.IntrinsicElements['dfn']>;
  dialog: React.ElementType<JSX.IntrinsicElements['dialog']>;
  div: React.ElementType<JSX.IntrinsicElements['div']>;
  dl: React.ElementType<JSX.IntrinsicElements['dl']>;
  dt: React.ElementType<JSX.IntrinsicElements['dt']>;
  em: React.ElementType<JSX.IntrinsicElements['em']>;
  embed: React.ElementType<JSX.IntrinsicElements['embed']>;
  fieldset: React.ElementType<JSX.IntrinsicElements['fieldset']>;
  figcaption: React.ElementType<JSX.IntrinsicElements['figcaption']>;
  figure: React.ElementType<JSX.IntrinsicElements['figure']>;
  footer: React.ElementType<JSX.IntrinsicElements['footer']>;
  form: React.ElementType<JSX.IntrinsicElements['form']>;
  h1: React.ElementType<JSX.IntrinsicElements['h1']>;
  h2: React.ElementType<JSX.IntrinsicElements['h2']>;
  h3: React.ElementType<JSX.IntrinsicElements['h3']>;
  h4: React.ElementType<JSX.IntrinsicElements['h4']>;
  h5: React.ElementType<JSX.IntrinsicElements['h5']>;
  h6: React.ElementType<JSX.IntrinsicElements['h6']>;
  head: React.ElementType<JSX.IntrinsicElements['head']>;
  header: React.ElementType<JSX.IntrinsicElements['header']>;
  hgroup: React.ElementType<JSX.IntrinsicElements['hgroup']>;
  hr: React.ElementType<JSX.IntrinsicElements['hr']>;
  html: React.ElementType<JSX.IntrinsicElements['html']>;
  i: React.ElementType<JSX.IntrinsicElements['i']>;
  iframe: React.ElementType<JSX.IntrinsicElements['iframe']>;
  img: React.ElementType<JSX.IntrinsicElements['img']>;
  input: React.ElementType<JSX.IntrinsicElements['input']>;
  ins: React.ElementType<JSX.IntrinsicElements['ins']>;
  kbd: React.ElementType<JSX.IntrinsicElements['kbd']>;
  label: React.ElementType<JSX.IntrinsicElements['label']>;
  legend: React.ElementType<JSX.IntrinsicElements['legend']>;
  li: React.ElementType<JSX.IntrinsicElements['li']>;
  link: React.ElementType<JSX.IntrinsicElements['link']>;
  main: React.ElementType<JSX.IntrinsicElements['main']>;
  map: React.ElementType<JSX.IntrinsicElements['map']>;
  mark: React.ElementType<JSX.IntrinsicElements['mark']>;
  menu: React.ElementType<JSX.IntrinsicElements['menu']>;
  menuitem: React.ElementType<JSX.IntrinsicElements['menuitem']>;
  meta: React.ElementType<JSX.IntrinsicElements['meta']>;
  meter: React.ElementType<JSX.IntrinsicElements['meter']>;
  nav: React.ElementType<JSX.IntrinsicElements['nav']>;
  noscript: React.ElementType<JSX.IntrinsicElements['noscript']>;
  object: React.ElementType<JSX.IntrinsicElements['object']>;
  ol: React.ElementType<JSX.IntrinsicElements['ol']>;
  optgroup: React.ElementType<JSX.IntrinsicElements['optgroup']>;
  option: React.ElementType<JSX.IntrinsicElements['option']>;
  output: React.ElementType<JSX.IntrinsicElements['output']>;
  p: React.ElementType<JSX.IntrinsicElements['p']>;
  param: React.ElementType<JSX.IntrinsicElements['param']>;
  picture: React.ElementType<JSX.IntrinsicElements['picture']>;
  pre: React.ElementType<JSX.IntrinsicElements['pre']>;
  progress: React.ElementType<JSX.IntrinsicElements['progress']>;
  q: React.ElementType<JSX.IntrinsicElements['q']>;
  rp: React.ElementType<JSX.IntrinsicElements['rp']>;
  rt: React.ElementType<JSX.IntrinsicElements['rt']>;
  ruby: React.ElementType<JSX.IntrinsicElements['ruby']>;
  s: React.ElementType<JSX.IntrinsicElements['s']>;
  samp: React.ElementType<JSX.IntrinsicElements['samp']>;
  script: React.ElementType<JSX.IntrinsicElements['script']>;
  section: React.ElementType<JSX.IntrinsicElements['section']>;
  select: React.ElementType<JSX.IntrinsicElements['select']>;
  slot: React.ElementType<JSX.IntrinsicElements['slot']>;
  small: React.ElementType<JSX.IntrinsicElements['small']>;
  source: React.ElementType<JSX.IntrinsicElements['source']>;
  span: React.ElementType<JSX.IntrinsicElements['span']>;
  strong: React.ElementType<JSX.IntrinsicElements['strong']>;
  style: React.ElementType<JSX.IntrinsicElements['style']>;
  sub: React.ElementType<JSX.IntrinsicElements['sub']>;
  summary: React.ElementType<JSX.IntrinsicElements['summary']>;
  sup: React.ElementType<JSX.IntrinsicElements['sup']>;
  svg: React.ElementType<JSX.IntrinsicElements['svg']>;
  table: React.ElementType<JSX.IntrinsicElements['table']>;
  tbody: React.ElementType<JSX.IntrinsicElements['tbody']>;
  td: React.ElementType<JSX.IntrinsicElements['td']>;
  template: React.ElementType<JSX.IntrinsicElements['template']>;
  textarea: React.ElementType<JSX.IntrinsicElements['textarea']>;
  tfoot: React.ElementType<JSX.IntrinsicElements['tfoot']>;
  th: React.ElementType<JSX.IntrinsicElements['th']>;
  thead: React.ElementType<JSX.IntrinsicElements['thead']>;
  time: React.ElementType<JSX.IntrinsicElements['time']>;
  title: React.ElementType<JSX.IntrinsicElements['title']>;
  tr: React.ElementType<JSX.IntrinsicElements['tr']>;
  track: React.ElementType<JSX.IntrinsicElements['track']>;
  u: React.ElementType<JSX.IntrinsicElements['u']>;
  ul: React.ElementType<JSX.IntrinsicElements['ul']>;
  video: React.ElementType<JSX.IntrinsicElements['video']>;
  wbr: React.ElementType<JSX.IntrinsicElements['wbr']>;
};
