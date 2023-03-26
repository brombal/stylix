"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStyleCollector = exports.styleCollectorContext = void 0;
const React = require("react");
const react_1 = require("react");
exports.styleCollectorContext = (0, react_1.createContext)(null);
function createStyleCollector() {
    const styles = [];
    const collector = {
        collect: (element) => (React.createElement(exports.styleCollectorContext.Provider, { value: styles }, element)),
        render: (props) => (React.createElement("style", Object.assign({ type: "text/css", key: props.id || 'stylix' }, props, { dangerouslySetInnerHTML: { __html: collector.styles.join(' ') } }))),
        styles,
    };
    collector.render.displayName = 'StylixStyleCollectorRenderer';
    return collector;
}
exports.createStyleCollector = createStyleCollector;
//# sourceMappingURL=styleCollector.js.map