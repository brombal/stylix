import { isValidJSXProp, simplifyStylePropName } from '../classifyProps';
import { walkRecursive } from '../util/walkRecursive';
import { mediaArrays } from './mediaArrays';
export const customProps = (customProps) => {
    customProps = Object.keys(customProps).reduce((memo, key) => {
        memo[simplifyStylePropName(key)] = customProps[key];
        return memo;
    }, {});
    return [
        {
            name: 'customPropsInit',
            type: 'initialize',
            plugin(ctx) {
                Object.keys(customProps).forEach((key) => (ctx.styleProps[simplifyStylePropName(key)] = key));
            },
        },
        {
            name: 'customPropsProcess',
            type: 'processStyles',
            before: mediaArrays,
            plugin(ctx, styles) {
                return walkRecursive(styles, (key, value, object) => {
                    if (!isValidJSXProp(key))
                        return;
                    const simpleKey = simplifyStylePropName(key);
                    if (!(simpleKey in customProps))
                        return;
                    const propValue = customProps[simpleKey];
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
                    afterKeys.forEach((k) => {
                        const val = objectClone[k];
                        delete object[k];
                        object[k] = val;
                    });
                });
            },
        },
    ];
};
//# sourceMappingURL=customProps.js.map