import { StylixPlugin } from './index';
export declare const defaultIgnoreUnits: string[];
/**
 * Adds unit (px, em, etc) to numeric values for any style properties not included in `ignoreProps`..
 */
export declare const defaultUnits: (unit?: string, ignoreProps?: string[]) => StylixPlugin;
export declare const defaultPixelUnits: StylixPlugin;
