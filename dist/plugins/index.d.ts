import { StylixContext, StylixPublicContext } from '../StylixProvider';
/**
 * Stylix plugin function context object
 */
export type StylixPluginFunctionContext = StylixPublicContext & {
    hash: string;
};
/**
 * Stylix plugin interface
 */
export interface StylixPlugin {
    name: string;
    type: 'initialize' | 'processStyles' | 'preprocessStyles';
    plugin(ctx: StylixPluginFunctionContext, styles: any): any;
    before?: StylixPlugin;
    after?: StylixPlugin;
    atIndex?: number;
}
export declare function applyPlugins(type: StylixPlugin['type'], styles: any, hash: string, context: StylixContext): any;
export { customProps } from './customProps';
export declare const defaultPlugins: {
    themeFunctions: StylixPlugin;
    merge$css: StylixPlugin;
    mediaArrays: StylixPlugin;
    propCasing: StylixPlugin;
    flattenNestedStyles: StylixPlugin;
    replace$$class: StylixPlugin;
    defaultPixelUnits: StylixPlugin;
    cleanStyles: StylixPlugin;
};
