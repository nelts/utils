"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function RequireDefault(pather, cwd) {
    const moduleExports = Require(pather, cwd);
    return moduleExports.default;
}
exports.RequireDefault = RequireDefault;
function Require(pather, cwd) {
    const moduleExports = path.isAbsolute(pather)
        ? require(pather)
        : require(path.resolve(cwd || process.cwd(), pather));
    return moduleExports;
}
exports.Require = Require;
