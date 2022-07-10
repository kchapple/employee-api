"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CalculatorException extends Error {
    constructor(message) {
        super(message);
        this.message = "Calculator Error: " + message;
    }
}
exports.default = CalculatorException;
