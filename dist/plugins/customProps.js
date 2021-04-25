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
            after: mediaArrays,
            plugin(ctx, styles) {
                return walkRecursive(styles, (key, value, object) => {
                    if (!isValidJSXProp(key))
                        return;
                    const simpleKey = simplifyStylePropName(key);
                    if (!(simpleKey in customProps))
                        return;
                    const customValue = customProps[simpleKey];
                    if (typeof customValue === 'object') {
                        const enabled = !!value;
                        delete object[key];
                        if (enabled)
                            Object.assign(object, customValue);
                    }
                    else if (typeof customValue === 'string') {
                        delete object[key];
                        object[customValue] = value;
                    }
                    else if (typeof customValue === 'function') {
                        delete object[key];
                        Object.assign(object, customValue(value));
                    }
                });
            },
        },
    ];
};
//# sourceMappingURL=customProps.js.map