/**
 * Accepts a Stylix CSS object and returns a unique className based on the styles' hash.
 * The styles are registered with the Stylix context and will be applied to the document.
 * If `global` is false, provided styles will be nested within the generated classname.
 * Returns the className hash if enabled, or an empty string.
 */
export declare function useStyles(styles: any, options?: {
    global?: boolean;
    disabled?: boolean;
}): string;
export declare function useKeyframes(keyframes: any, disabled?: boolean): string;
export declare function useGlobalStyles(styles: any, disabled?: boolean): string;
