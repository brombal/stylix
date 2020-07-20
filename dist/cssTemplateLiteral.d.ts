/**
 * A tagged template literal that stringifies nested objects to css.
 */
export declare function css(str: TemplateStringsArray, ...args: any[]): any;
/**
 * Hook used to create a template literal that can access the current Stylix context.
 * This is necessary when using arrays and function values which require access to the theme context.
 */
export declare function useCss(): typeof css;
