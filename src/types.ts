import React, { CSSProperties } from 'react';

type StyleProperties = {
  [key in keyof CSSProperties]:
    | CSSProperties[key]
    | CSSProperties[key][]
    | ((theme: any, media: string[]) => CSSProperties[key] | CSSProperties[key][]);
};

type ComponentType<P = {}> =
  | React.ElementType
  | React.ComponentClass<P>
  | ((p: P) => React.ReactElement | null);

/**
 * Props that exist on all Stylix components
 */
interface StylixCommonProps {
  $css?: any; // Applies additional styles
  $disabled?: boolean; // Pass true to disable applying styles
}

/**
 $global: string | object; // Applies styles globally
 $media?: never; // Applies styles to child elements when media query matches
 $selector?: never; // Applies styles to a custom selector (such as "& > a") relative to the child(ren).
 $inject?: never; // Instead of creating an element, injects styles down to the element's children.
 */

/** $global only; no children or other props allowed */
interface StylixGlobalProps {
  $global: string | object;

  $media?: never;
  $selector?: never;
  $el?: never;
  children?: never;
}

/** $media or $selector; children required; no $el */
interface StylixMediaProps {
  $media: string;
  children: any;

  $selector?: never;
  $el?: never;
  $global?: never;
}

/** $selector; children required; no $media or $el */
interface StylixSelectorProps {
  $selector: string;
  children: any;

  $media?: never;
  $el?: never;
  $global?: never;
}

// type SafeHtmlProps<TComponent extends React.ElementType> = Omit<React.ComponentPropsWithRef<TComponent>, "color" | "translate">;
type ComponentProps<TComponent extends ComponentType> = Omit<
  React.ComponentPropsWithRef<TComponent>,
  keyof StyleProperties
>;

//   React.ComponentPropsWithRef<TComponent> extends {
//   dangerouslySetInnerHTML?: any; // cheap way to determine that props are for an html element
// }
//   ? SafeHtmlProps<TComponent>
//   : React.ComponentPropsWithRef<TComponent>;

/** $el; children optional; no other Stylix props allowed; */
export type StylixElProps<TComponent extends ComponentType> = {
  $el: TComponent;
  $elProps?: Partial<React.ComponentPropsWithoutRef<TComponent>>;
} & ComponentProps<TComponent> & {
    $media?: never;
    $selector?: never;
    $global?: never;
  };

export interface StylixPropsExtensions {} // eslint-disable-line

// Additional properties on Stylix component functions
type StylixExtensions = {
  displayName?: string;
  __isStylix: true;
};

export type StylixProps = StylixCommonProps & StyleProperties & StylixPropsExtensions;
// export type StylixProps<T = any> = Omit<StylixCommonProps & StyleProperties & StylixPropsExtensions, keyof T>;

// Props for main Stylix component ($)
export type Stylix$Props<T> = (T extends ComponentType
  ? StylixElProps<T>
  : StylixGlobalProps | StylixMediaProps | StylixSelectorProps) &
  StylixProps & { [key: string]: any };

// Type of main Stylix component ($)
export type Stylix$Component = {
  <T>(props: Stylix$Props<T>, context?: any): React.ReactElement<any, any> | null;
} & StylixExtensions &
  StylixHtmlTags;

// Props for html components
export type StylixHtmlProps<ElType extends React.ElementType> =
  | ComponentProps<ElType>
  | StylixProps;

// html component
export type StylixHtmlComponent<ElType extends React.ElementType> = React.FunctionComponent<
  StylixHtmlProps<ElType>
> &
  StylixExtensions;

export type StylixHtmlTags = {
  a: StylixHtmlComponent<'a'>;
  abbr: StylixHtmlComponent<'abbr'>;
  address: StylixHtmlComponent<'address'>;
  area: StylixHtmlComponent<'area'>;
  article: StylixHtmlComponent<'article'>;
  aside: StylixHtmlComponent<'aside'>;
  audio: StylixHtmlComponent<'audio'>;
  b: StylixHtmlComponent<'b'>;
  base: StylixHtmlComponent<'base'>;
  bdi: StylixHtmlComponent<'bdi'>;
  bdo: StylixHtmlComponent<'bdo'>;
  blockquote: StylixHtmlComponent<'blockquote'>;
  body: StylixHtmlComponent<'body'>;
  br: StylixHtmlComponent<'br'>;
  button: StylixHtmlComponent<'button'>;
  canvas: StylixHtmlComponent<'canvas'>;
  caption: StylixHtmlComponent<'caption'>;
  cite: StylixHtmlComponent<'cite'>;
  code: StylixHtmlComponent<'code'>;
  col: StylixHtmlComponent<'col'>;
  colgroup: StylixHtmlComponent<'colgroup'>;
  data: StylixHtmlComponent<'data'>;
  datalist: StylixHtmlComponent<'datalist'>;
  dd: StylixHtmlComponent<'dd'>;
  del: StylixHtmlComponent<'del'>;
  details: StylixHtmlComponent<'details'>;
  dfn: StylixHtmlComponent<'dfn'>;
  dialog: StylixHtmlComponent<'dialog'>;
  div: StylixHtmlComponent<'div'>;
  dl: StylixHtmlComponent<'dl'>;
  dt: StylixHtmlComponent<'dt'>;
  em: StylixHtmlComponent<'em'>;
  embed: StylixHtmlComponent<'embed'>;
  fieldset: StylixHtmlComponent<'fieldset'>;
  figcaption: StylixHtmlComponent<'figcaption'>;
  figure: StylixHtmlComponent<'figure'>;
  footer: StylixHtmlComponent<'footer'>;
  form: StylixHtmlComponent<'form'>;
  h1: StylixHtmlComponent<'h1'>;
  h2: StylixHtmlComponent<'h2'>;
  h3: StylixHtmlComponent<'h3'>;
  h4: StylixHtmlComponent<'h4'>;
  h5: StylixHtmlComponent<'h5'>;
  h6: StylixHtmlComponent<'h6'>;
  head: StylixHtmlComponent<'head'>;
  header: StylixHtmlComponent<'header'>;
  hgroup: StylixHtmlComponent<'hgroup'>;
  hr: StylixHtmlComponent<'hr'>;
  html: StylixHtmlComponent<'html'>;
  i: StylixHtmlComponent<'i'>;
  iframe: StylixHtmlComponent<'iframe'>;
  img: StylixHtmlComponent<'img'>;
  input: StylixHtmlComponent<'input'>;
  ins: StylixHtmlComponent<'ins'>;
  kbd: StylixHtmlComponent<'kbd'>;
  label: StylixHtmlComponent<'label'>;
  legend: StylixHtmlComponent<'legend'>;
  li: StylixHtmlComponent<'li'>;
  link: StylixHtmlComponent<'link'>;
  main: StylixHtmlComponent<'main'>;
  map: StylixHtmlComponent<'map'>;
  mark: StylixHtmlComponent<'mark'>;
  menu: StylixHtmlComponent<'menu'>;
  menuitem: StylixHtmlComponent<'menuitem'>;
  meta: StylixHtmlComponent<'meta'>;
  meter: StylixHtmlComponent<'meter'>;
  nav: StylixHtmlComponent<'nav'>;
  noscript: StylixHtmlComponent<'noscript'>;
  object: StylixHtmlComponent<'object'>;
  ol: StylixHtmlComponent<'ol'>;
  optgroup: StylixHtmlComponent<'optgroup'>;
  option: StylixHtmlComponent<'option'>;
  output: StylixHtmlComponent<'output'>;
  p: StylixHtmlComponent<'p'>;
  param: StylixHtmlComponent<'param'>;
  picture: StylixHtmlComponent<'picture'>;
  pre: StylixHtmlComponent<'pre'>;
  progress: StylixHtmlComponent<'progress'>;
  q: StylixHtmlComponent<'q'>;
  rp: StylixHtmlComponent<'rp'>;
  rt: StylixHtmlComponent<'rt'>;
  ruby: StylixHtmlComponent<'ruby'>;
  s: StylixHtmlComponent<'s'>;
  samp: StylixHtmlComponent<'samp'>;
  script: StylixHtmlComponent<'script'>;
  section: StylixHtmlComponent<'section'>;
  select: StylixHtmlComponent<'select'>;
  slot: StylixHtmlComponent<'slot'>;
  small: StylixHtmlComponent<'small'>;
  source: StylixHtmlComponent<'source'>;
  span: StylixHtmlComponent<'span'>;
  strong: StylixHtmlComponent<'strong'>;
  style: StylixHtmlComponent<'style'>;
  sub: StylixHtmlComponent<'sub'>;
  summary: StylixHtmlComponent<'summary'>;
  sup: StylixHtmlComponent<'sup'>;
  svg: StylixHtmlComponent<'svg'>;
  table: StylixHtmlComponent<'table'>;
  tbody: StylixHtmlComponent<'tbody'>;
  td: StylixHtmlComponent<'td'>;
  template: StylixHtmlComponent<'template'>;
  textarea: StylixHtmlComponent<'textarea'>;
  tfoot: StylixHtmlComponent<'tfoot'>;
  th: StylixHtmlComponent<'th'>;
  thead: StylixHtmlComponent<'thead'>;
  time: StylixHtmlComponent<'time'>;
  title: StylixHtmlComponent<'title'>;
  tr: StylixHtmlComponent<'tr'>;
  track: StylixHtmlComponent<'track'>;
  u: StylixHtmlComponent<'u'>;
  ul: StylixHtmlComponent<'ul'>;
  video: StylixHtmlComponent<'video'>;
  wbr: StylixHtmlComponent<'wbr'>;
};

/**
 * Additional css shortcut props.
 * These props are accepted in addition to all other valid css properties. These mostly just get converted to the
 * long versions (see `shortcutMappings` values below), but some have special treatment (see `shortcutConversions`).
 * Comments indicate what shortcuts are for.

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
 */
/**
 * A string type that represents any valid key in IBoxCssShortcutProps.
 */
// type BoxCssShortcutPropsKey = keyof IBoxCssShortcutProps;
