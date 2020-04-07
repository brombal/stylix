import * as CSS from 'csstype';
import React, { CSSProperties } from 'react';
/**
 * These are the basic Box props, not including css properties, shortcuts, or pseudo classes.
 */
interface StylixCoreProps<T extends React.ElementType> {
    $el?: T;
    $selector?: string;
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
 */
interface IBoxCssShortcutProps {
    inline?: boolean;
    block?: boolean;
    inlineBlock?: boolean;
    flex?: boolean;
    inlineFlex?: boolean;
    flexMe?: CSS.FlexProperty<string | number>;
    flexChildren?: CSS.FlexProperty<string | number>;
    align?: CSS.AlignItemsProperty;
    justify?: CSS.JustifyContentProperty;
    wrap?: CSS.FlexWrapProperty;
    absolute?: boolean;
    relative?: boolean;
    column?: boolean;
    bg?: CSS.BackgroundProperty<string | number>;
    bgColor?: CSS.BackgroundColorProperty;
    m?: CSS.MarginProperty<string | number>;
    mt?: CSS.MarginTopProperty<string | number>;
    mr?: CSS.MarginRightProperty<string | number>;
    mb?: CSS.MarginBottomProperty<string | number>;
    ml?: CSS.MarginLeftProperty<string | number>;
    p?: CSS.PaddingProperty<string | number>;
    pt?: CSS.PaddingTopProperty<string | number>;
    pr?: CSS.PaddingRightProperty<string | number>;
    pb?: CSS.PaddingBottomProperty<string | number>;
    pl?: CSS.PaddingLeftProperty<string | number>;
    size?: CSS.FontSizeProperty<string | number>;
    weight?: CSS.FontWeightProperty;
    bold?: boolean;
    italic?: boolean;
    vAlign?: CSS.VerticalAlignProperty<string | number>;
    alignCenter?: boolean;
    alignRight?: boolean;
    alignLeft?: boolean;
    ellipsis?: boolean;
}
/**
 * A string type that represents any valid key in IBoxCssShortcutProps.
 */
declare type BoxCssShortcutPropsKey = keyof IBoxCssShortcutProps;
/**
 * A type that represents any object containing style information that Box understands.
 * This includes all known css properties (kebab-case and camelCase), Box css shortcut props, and all css pseudo classes.
 */
declare type StylixStyleProps = Omit<CSSProperties, BoxCssShortcutPropsKey> & IBoxCssShortcutProps;
/**
 * All Stylix component props:
 * 1. Core props (StylixCoreProps)
 * 2. Style properties (StylixStyleProps)
 * 3. General React props and ref (React.ComponentPropsWithRef)
 */
export declare type StylixProps<T extends React.ElementType> = StylixCoreProps<T> & StylixStyleProps & React.ComponentPropsWithRef<T>;
export declare type StylixComponentType<T extends React.ElementType = 'div'> = React.ComponentType<StylixProps<T>> & {
    __isStylix?: boolean;
};
export {};
