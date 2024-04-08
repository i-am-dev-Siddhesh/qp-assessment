"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringPropertiesToIntegerMiddleware = void 0;
const cattle_validation_1 = require("../validations/cattle.validation");
function parseJSONOrString(str) {
    let result;
    try {
        result = JSON.parse(str);
    }
    catch (error) {
        // Parsing failed, treat the input as a regular string
        result = str;
    }
    return result;
}
function convertStringPropertiesToIntegerMiddleware(req, res, next) {
    const schema = req.route.path.startsWith("/add")
        ? cattle_validation_1.cattleUpdateValidation
        : cattle_validation_1.cattleCreateValidation;
    let data = req.body;
    for (let key in data) {
        data[key] = parseJSONOrString(data[key]);
        // @ts-ignore
        const field = schema._ids._byKey.get(key);
        if (field && field.schema.type === "number" && /^\d+$/.test(data[key])) {
            const parsedValue = parseInt(data[key]);
            if (!isNaN(parsedValue)) {
                data[key] = parsedValue;
            }
            else {
                data[key] = null;
            }
        }
    }
    req.body = data;
    next();
}
exports.convertStringPropertiesToIntegerMiddleware = convertStringPropertiesToIntegerMiddleware;
