"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Database {
    constructor() {
        this.employees = new Map();
    }
    addEmployee(employee) {
        return new Promise(resolve => {
            this.employees.set(employee, employee);
            resolve(employee);
        });
    }
    fetchEmployees() {
        return new Promise(resolve => {
            const employeeArray = this.employees.values();
            return employeeArray;
        });
    }
}
exports.default = Database;
