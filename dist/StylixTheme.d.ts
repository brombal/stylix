import React from 'react';
/**
 * StylixTheme
 *
 * A <StylixTheme> is a context wrapper that specifies a theme object and media queries.
 *
 * See the README.md for more details.
 */
export interface StylixThemeContext {
    theme: any;
    media: string[];
}
export declare type StylixThemeProps = Partial<StylixThemeContext> & {
    children: any;
};
export declare const StylixTheme: React.NamedExoticComponent<StylixThemeProps>;
export declare function useStylixTheme(): StylixThemeContext;
