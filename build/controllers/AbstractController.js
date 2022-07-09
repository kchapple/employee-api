"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractController = void 0;
class AbstractController {
    constructor(state) {
        this._state = state;
    }
    get state() {
        return this._state;
    }
}
exports.AbstractController = AbstractController;
