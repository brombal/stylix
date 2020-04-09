import React, { CSSProperties } from 'react';
/**
 * These are the basic Box props, not including css properties, shortcuts, or pseudo classes.
 */
export interface StylixCoreProps<T extends React.ElementType> {
    $el?: T;
    $media?: string;
    $selector?: string;
    $selectors?: {
        [key: string]: StylixStyleProps;
    };
    $inject?: boolean;
    $global?: string;
    $disable?: boolean;
    $enable?: boolean;
    children?: any;
}
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
/**
 * A type that represents any object containing style information that Box understands.
 * This includes all known css properties (kebab-case and camelCase), Box css shortcut props, and all css pseudo classes.
 */
declare type StylixStyleProps = CSSProperties;
export interface StylixPropsExtensions {
}
/**
 * All Stylix component props:
 * 1. Core props (StylixCoreProps)
 * 2. Style properties (StylixStyleProps)
 * 3. General React props and ref (React.ComponentPropsWithRef)
 */
export declare type StylixProps<T extends React.ElementType> = StylixPropsExtensions & StylixCoreProps<T> & StylixStyleProps & React.ComponentPropsWithRef<T>;
declare type StylixExtensions = {
    displayName?: string;
    __isStylix: true;
};
export declare type StylixComponentType<ElType extends React.ElementType> = ((props: StylixProps<ElType>) => React.ReactElement) & StylixExtensions;
export declare type StylixType = {
    <ElType extends React.ElementType = 'div'>(props: StylixProps<ElType>): React.ReactElement;
} & StylixExtensions & StylixHtmlTags;
export declare type StylixHtmlTags = {
    a: StylixComponentType<'a'>;
    abbr: StylixComponentType<'abbr'>;
    address: StylixComponentType<'address'>;
    area: StylixComponentType<'area'>;
    article: StylixComponentType<'article'>;
    aside: StylixComponentType<'aside'>;
    audio: StylixComponentType<'audio'>;
    b: StylixComponentType<'b'>;
    base: StylixComponentType<'base'>;
    bdi: StylixComponentType<'bdi'>;
    bdo: StylixComponentType<'bdo'>;
    blockquote: StylixComponentType<'blockquote'>;
    body: StylixComponentType<'body'>;
    br: StylixComponentType<'br'>;
    button: StylixComponentType<'button'>;
    canvas: StylixComponentType<'canvas'>;
    caption: StylixComponentType<'caption'>;
    cite: StylixComponentType<'cite'>;
    code: StylixComponentType<'code'>;
    col: StylixComponentType<'col'>;
    colgroup: StylixComponentType<'colgroup'>;
    data: StylixComponentType<'data'>;
    datalist: StylixComponentType<'datalist'>;
    dd: StylixComponentType<'dd'>;
    del: StylixComponentType<'del'>;
    details: StylixComponentType<'details'>;
    dfn: StylixComponentType<'dfn'>;
    dialog: StylixComponentType<'dialog'>;
    div: StylixComponentType<'div'>;
    dl: StylixComponentType<'dl'>;
    dt: StylixComponentType<'dt'>;
    em: StylixComponentType<'em'>;
    embed: StylixComponentType<'embed'>;
    fieldset: StylixComponentType<'fieldset'>;
    figcaption: StylixComponentType<'figcaption'>;
    figure: StylixComponentType<'figure'>;
    footer: StylixComponentType<'footer'>;
    form: StylixComponentType<'form'>;
    h1: StylixComponentType<'h1'>;
    h2: StylixComponentType<'h2'>;
    h3: StylixComponentType<'h3'>;
    h4: StylixComponentType<'h4'>;
    h5: StylixComponentType<'h5'>;
    h6: StylixComponentType<'h6'>;
    head: StylixComponentType<'head'>;
    header: StylixComponentType<'header'>;
    hgroup: StylixComponentType<'hgroup'>;
    hr: StylixComponentType<'hr'>;
    html: StylixComponentType<'html'>;
    i: StylixComponentType<'i'>;
    iframe: StylixComponentType<'iframe'>;
    img: StylixComponentType<'img'>;
    input: StylixComponentType<'input'>;
    ins: StylixComponentType<'ins'>;
    kbd: StylixComponentType<'kbd'>;
    label: StylixComponentType<'label'>;
    legend: StylixComponentType<'legend'>;
    li: StylixComponentType<'li'>;
    link: StylixComponentType<'link'>;
    main: StylixComponentType<'main'>;
    map: StylixComponentType<'map'>;
    mark: StylixComponentType<'mark'>;
    menu: StylixComponentType<'menu'>;
    menuitem: StylixComponentType<'menuitem'>;
    meta: StylixComponentType<'meta'>;
    meter: StylixComponentType<'meter'>;
    nav: StylixComponentType<'nav'>;
    noscript: StylixComponentType<'noscript'>;
    object: StylixComponentType<'object'>;
    ol: StylixComponentType<'ol'>;
    optgroup: StylixComponentType<'optgroup'>;
    option: StylixComponentType<'option'>;
    output: StylixComponentType<'output'>;
    p: StylixComponentType<'p'>;
    param: StylixComponentType<'param'>;
    picture: StylixComponentType<'picture'>;
    pre: StylixComponentType<'pre'>;
    progress: StylixComponentType<'progress'>;
    q: StylixComponentType<'q'>;
    rp: StylixComponentType<'rp'>;
    rt: StylixComponentType<'rt'>;
    ruby: StylixComponentType<'ruby'>;
    s: StylixComponentType<'s'>;
    samp: StylixComponentType<'samp'>;
    script: StylixComponentType<'script'>;
    section: StylixComponentType<'section'>;
    select: StylixComponentType<'select'>;
    slot: StylixComponentType<'slot'>;
    small: StylixComponentType<'small'>;
    source: StylixComponentType<'source'>;
    span: StylixComponentType<'span'>;
    strong: StylixComponentType<'strong'>;
    style: StylixComponentType<'style'>;
    sub: StylixComponentType<'sub'>;
    summary: StylixComponentType<'summary'>;
    sup: StylixComponentType<'sup'>;
    svg: StylixComponentType<'svg'>;
    table: StylixComponentType<'table'>;
    tbody: StylixComponentType<'tbody'>;
    td: StylixComponentType<'td'>;
    template: StylixComponentType<'template'>;
    textarea: StylixComponentType<'textarea'>;
    tfoot: StylixComponentType<'tfoot'>;
    th: StylixComponentType<'th'>;
    thead: StylixComponentType<'thead'>;
    time: StylixComponentType<'time'>;
    title: StylixComponentType<'title'>;
    tr: StylixComponentType<'tr'>;
    track: StylixComponentType<'track'>;
    u: StylixComponentType<'u'>;
    ul: StylixComponentType<'ul'>;
    video: StylixComponentType<'video'>;
    wbr: StylixComponentType<'wbr'>;
};
export {};
