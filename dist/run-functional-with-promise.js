"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function RunFunctionalResult(target) {
    try {
        return Promise.resolve(target);
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.default = RunFunctionalResult;
