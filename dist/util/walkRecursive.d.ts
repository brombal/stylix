/**
 * Invokes a callback for each key/value pair in `object`, and continues recursively on each value that is also a
 * plain object. Returns `object`.
 * The `cb` function will receive the key, the value, the current object being mapped, and a context object.
 * The context object is a plain object that you can modify as needed. The value will persist to subsequent calls to
 * `map` on child properties of `value`.
 */
export declare function walkRecursive(object: any, cb: (key: string, value: any, currentObject: any, context: any) => void, context?: any): void;
