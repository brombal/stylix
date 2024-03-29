"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStyleCollector = exports.styleCollectorContext = void 0;
const react_1 = __importStar(require("react"));
exports.styleCollectorContext = (0, react_1.createContext)(null);
function createStyleCollector() {
    const styles = [];
    const collector = {
        collect: (element) => (react_1.default.createElement(exports.styleCollectorContext.Provider, { value: styles }, element)),
        render: (props) => (react_1.default.createElement("style", Object.assign({ type: "text/css", key: props.id || 'stylix' }, props, { dangerouslySetInnerHTML: { __html: collector.styles.join(' ') } }))),
        styles,
    };
    collector.render.displayName = 'StylixStyleCollectorRenderer';
    return collector;
}
exports.createStyleCollector = createStyleCollector;
//# sourceMappingURL=styleCollector.js.map