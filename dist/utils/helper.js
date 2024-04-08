"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.getFilenameFromUrl = exports.getPath = void 0;
const url_1 = require("url");
const getPath = (url) => {
    return new url_1.URL(url).pathname;
};
exports.getPath = getPath;
function getFilenameFromUrl(url) {
    const pathname = new url_1.URL(url).pathname;
    const index = pathname.lastIndexOf("/");
    return pathname.substring(index + 1); // if index === -1 then index+1 will be 0
}
exports.getFilenameFromUrl = getFilenameFromUrl;
const generateOTP = () => {
    // Generate a random six-digit number
    const otp = Math.floor(Math.random() * 900000) + 100000;
    return otp;
};
exports.generateOTP = generateOTP;
