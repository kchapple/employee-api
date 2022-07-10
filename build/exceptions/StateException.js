"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StateException extends Error {
    constructor(message) {
        super(message);
        this.message = "State Error: " + message;
    }
}
exports.default = StateException;
