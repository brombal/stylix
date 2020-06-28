"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const context_1 = require("./context");
const utils_1 = require("./utils");
function useStyles(styles, hash) {
    const ctx = context_1.useStylixSheetContext();
    react_1.default.useLayoutEffect(() => {
        if (hash in ctx.styles) {
            ctx.styles[hash].uses++;
        }
        else {
            ctx.styles[hash] = { styles: '', uses: 1 };
        }
        ctx.styles[hash].styles = styles;
        utils_1.applyContextRules(ctx);
        requestAnimationFrame(() => {
            var _a, _b;
            if (!((_a = ctx.styles[hash]) === null || _a === void 0 ? void 0 : _a.uses) || ((_b = ctx.styles[hash]) === null || _b === void 0 ? void 0 : _b.uses) <= 0) {
                delete ctx.styles[hash];
            }
        });
        return () => {
            ctx.styles[hash].uses--;
        };
    }, [styles]);
}
exports.useStyles = useStyles;
//# sourceMappingURL=hooks.js.map