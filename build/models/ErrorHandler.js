"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const CalculatorException_1 = __importDefault(require("../exceptions/CalculatorException"));
const BaseErrorResponse_1 = require("./BaseErrorResponse");
const StateException_1 = __importDefault(require("../exceptions/StateException"));
const StatsException_1 = __importDefault(require("../exceptions/StatsException"));
class ErrorHandler {
    /**
     * Given an error/exception (subclass of Error object) and the response, create
     * an ErrorResponse to send to the client, and set status code on the express response.
     *
     * @param error
     * @param response
     */
    makeErrorResponse(error, response) {
        let errorResponse;
        if (error instanceof CalculatorException_1.default) {
            response.statusCode = error.status;
            errorResponse = new BaseErrorResponse_1.BaseErrorResponse(error.status, error.message);
        }
        else if (error instanceof StatsException_1.default) {
            response.statusCode = error.status;
            errorResponse = new BaseErrorResponse_1.BaseErrorResponse(error.status, error.message);
        }
        else if (error instanceof StateException_1.default) {
            response.statusCode = error.status;
            errorResponse = new BaseErrorResponse_1.BaseErrorResponse(error.status, error.message);
        }
        else {
            response.statusCode = 500;
            errorResponse = new BaseErrorResponse_1.BaseErrorResponse(400, error.message);
        }
        return errorResponse;
    }
}
exports.ErrorHandler = ErrorHandler;
