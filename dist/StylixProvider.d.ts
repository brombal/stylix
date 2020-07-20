import React from 'react';
import { StylixThemeProps } from './StylixTheme';
/**
 * Stylix context
 *
 * The <StylixProvider> wrapper represents an "instance" of Stylix - somewhat vaguely defined as a configuration,
 * set of plugins, and reference to the <style> element where css is output. All nodes contained within a
 * <StylixProvider> element will share this Stylix instance's configuration.
 *
 * A StylixProvider also contains a <StylixTheme>, so you can conveniently provide a theme object and media query array
 * with a single element.
 *
 * See the README for more details.
 */
export interface StylixContextProps {
    id: string;
    devMode: boolean;
    plugins: StylixPlugin[];
    stylixPluginSettings: {
        defaultUnit?: any;
        nested?: any;
    };
    styleElement: HTMLStyleElement;
}
declare type StylixPlugin = (ctx: StylixContext) => void;
export interface StylixContext extends StylixContextProps {
    stylesheet: CSSStyleSheet;
    defs: Map<any, string>;
    hashRefs: {
        [key: string]: number;
    };
    rules: {
        [key: string]: {
            postcss: string;
            hash: string;
            rules: string[];
        };
    };
    postcssPlugins: any[];
    customProps: Set<string>;
    initialized: boolean;
}
export declare function useStylixContext(): StylixContext;
declare type StylixProviderProps = Partial<StylixContextProps> & Partial<StylixThemeProps> & {
    children: any;
};
export declare function StylixProvider({ id, devMode, plugins, stylixPluginSettings, styleElement, children, ...other }: StylixProviderProps): React.ReactElement;
export {};
