"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useIsoLayoutEffect = typeof window !== 'undefined'
    ? (fn, deps, runOnSsr) => react_1.useLayoutEffect(fn, deps)
    : (fn, deps, runOnSsr) => (runOnSsr ? fn() : null);
exports.default = useIsoLayoutEffect;
//# sourceMappingURL=useIsoLayoutEffect.js.map