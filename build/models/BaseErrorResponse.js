"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseErrorResponse = void 0;
class BaseErrorResponse {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}
exports.BaseErrorResponse = BaseErrorResponse;
