"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ajv = require("ajv");
function default_1(schema, data, type) {
    const validator = new ajv({ allErrors: true }).compile(schema);
    const value = validator(data);
    if (!value)
        return Promise.reject(formatAjvErrors(validator.errors, type));
}
exports.default = default_1;
function formatAjvErrors(errors, type = 'Default') {
    const errorTexts = errors.map(error => `- ${type} Validator [${error.keyword}]: ${error.dataPath}${error.schemaPath}: ${error.message}`);
    return new Error(errorTexts.join('\n'));
}
