/**
 * Accepts an object of postcss-compatible styles and returns a className based on the styles' hash.
 * If `global` is false, provided styles are contained within the generated classname.
 * Returns the className hash if enabled, or an empty string.
 */
export declare function useStyles(styles: any, global: boolean, enabled: boolean): string;
