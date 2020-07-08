/// <reference types="react" />
export interface StylixThemeContext {
    theme?: any;
    media?: string[];
}
declare type StylixThemeProps = StylixThemeContext & {
    children: any;
};
export declare function StylixTheme({ theme, media, children }: StylixThemeProps): JSX.Element;
export declare function useStylixThemeContext(): StylixThemeContext;
export interface StylixSheetContextProps {
    id: string;
    devMode: boolean;
    styleElement: HTMLStyleElement;
    stylesheet: CSSStyleSheet;
    plugins: any[];
    customProps: string[];
}
export declare type StylixSheetContext = StylixSheetContextProps & {
    styles: {
        [key: string]: {
            styles: string;
            uses: number;
        };
    };
    currentRules: string[];
};
/**
 * Returns the current Stylix context value.
 */
export declare function useStylixSheetContext(): StylixSheetContext;
export declare function StylixProvider({ id, devMode, styleElement, stylesheet, plugins, children, customProps, }: Partial<StylixSheetContextProps> & {
    children: any;
}): JSX.Element;
export {};
