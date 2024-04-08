"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const url_1 = require("url");
const test = (url) => {
    return new url_1.URL(url).pathname;
};
exports.test = test;
