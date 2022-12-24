"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customProps = void 0;
const classifyProps_1 = require("../classifyProps");
const isPlainObject_1 = require("../util/isPlainObject");
const walkRecursive_1 = require("../util/walkRecursive");
const mediaArrays_1 = require("./mediaArrays");
const customProps = (customProps) => {
    for (const key in customProps) {
        customProps[(0, classifyProps_1.simplifyStylePropName)(key)] = customProps[key];
    }
    return [
        {
            name: 'customPropsInit',
            type: 'initialize',
            plugin(ctx) {
                for (const key in customProps) {
                    ctx.styleProps[(0, classifyProps_1.simplifyStylePropName)(key)] = key;
                }
            },
        },
        {
            name: 'customPropsProcess',
            type: 'processStyles',
            before: mediaArrays_1.mediaArrays,
            plugin(ctx, styles) {
                return (0, walkRecursive_1.walkRecursive)(styles, (key, value, object) => {
                    if (!(0, classifyProps_1.isValidJSXProp)(key) || (0, isPlainObject_1.isPlainObject)(value))
                        return;
                    const simpleKey = (0, classifyProps_1.simplifyStylePropName)(key);
                    const propValue = customProps[simpleKey];
                    if (!propValue)
                        return;
                    const objectClone = Object.assign({}, object);
                    const keys = Object.keys(object);
                    const afterKeys = keys.slice(keys.indexOf(key) + 1);
                    const newStyles = {};
                    if (typeof propValue === 'object') {
                        if (value)
                            Object.assign(newStyles, propValue);
                    }
                    else if (typeof propValue === 'string') {
                        newStyles[propValue] = value;
                    }
                    else if (typeof propValue === 'function') {
                        Object.assign(newStyles, propValue(value));
                    }
                    delete object[key];
                    Object.assign(object, newStyles);
                    for (const k of afterKeys) {
                        const val = objectClone[k];
                        delete object[k];
                        object[k] = val;
                    }
                });
            },
        },
    ];
};
exports.customProps = customProps;
//# sourceMappingURL=customProps.js.map