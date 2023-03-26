import * as React from 'react';
import { StylixPlugin } from './plugins';
/**
 * Stylix context
 *
 * The <StylixProvider> wrapper represents an "instance" of Stylix - a configuration, set of plugins, and reference to
 * the <style> element where css is output. All nodes contained within a <StylixProvider> element will share this
 * Stylix instance's configuration.
 *
 * A StylixProvider internally contains a <StylixTheme>, so you can conveniently provide a theme object and media query
 * array with a single element.
 *
 * See the README for more details.
 */
type StylixProviderProps<Theme = any> = StylixThemeProps<Theme> & {
    id?: string;
    devMode?: boolean;
    plugins?: StylixPlugin[] | StylixPlugin[][];
    styleElement?: HTMLStyleElement;
    children: any;
};
type StylixThemeProps<Theme = any> = {
    theme?: Theme;
    media?: string[];
    children: any;
};
export type StylixContext<Theme = any> = {
    id: string;
    devMode: boolean;
    theme: Theme;
    media: string[];
    plugins: StylixPlugin[];
    stylesheet: CSSStyleSheet;
    styleElement: HTMLStyleElement;
    styleCollector?: string[];
    rules: {
        [key: string]: {
            hash: string;
            rules: string[];
            refs: number;
        };
    };
    styleProps: Record<string, string>;
    cleanupRequest: number;
    requestApply: boolean;
};
export type StylixPublicContext = Pick<StylixContext, 'id' | 'devMode' | 'theme' | 'media' | 'stylesheet' | 'styleElement' | 'styleProps'>;
export declare function useStylixContext<Theme = any>(): StylixContext<Theme>;
export declare function useStylixTheme<Theme = any>(): Theme;
export declare function StylixProvider({ id, devMode, plugins, styleElement, children, ...themeProps }: StylixProviderProps): React.ReactElement;
export declare function StylixTheme({ children, media, theme }: StylixThemeProps): JSX.Element;
export {};
