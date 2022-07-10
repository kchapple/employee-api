"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeFilter = void 0;
class EmployeeFilter {
    constructor(onContract = false) {
        this._onContract = onContract;
    }
    get onContract() {
        return this._onContract;
    }
}
exports.EmployeeFilter = EmployeeFilter;
