"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const CalculatorException_1 = __importDefault(require("../exceptions/CalculatorException"));
const BaseErrorResponse_1 = require("./BaseErrorResponse");
class ErrorHandler {
    makeErrorResponse(error, response) {
        let errorResponse;
        if (error instanceof CalculatorException_1.default) {
            response.statusCode = 400;
            errorResponse = new BaseErrorResponse_1.BaseErrorResponse(400, error.message);
        }
        else {
            response.statusCode = 500;
            errorResponse = new BaseErrorResponse_1.BaseErrorResponse(400, error.message);
        }
        return errorResponse;
    }
}
exports.ErrorHandler = ErrorHandler;
