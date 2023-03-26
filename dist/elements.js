"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_1 = require("./styled");
const Stylix_1 = require("./Stylix");
const htmlTags = require("./html-tags.json");
for (const i in htmlTags) {
    const tag = htmlTags[i];
    const htmlComponent = (0, styled_1.styled)(tag);
    Stylix_1.default[tag] = htmlComponent;
}
//# sourceMappingURL=elements.js.map