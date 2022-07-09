"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
class Calculator {
    constructor(employees) {
        this.employees = employees;
    }
    calculate() {
        const salaries = this.employees.map((employee) => {
            return Number(employee.salary);
        });
        const min = Math.min(...salaries);
        const max = Math.max(...salaries);
        const mean = Math.ceil(salaries.reduce((partialSum, n) => {
            return partialSum + n;
        }, 0) / salaries.length);
        return {
            mean: mean,
            min: min,
            max: max
        };
    }
}
exports.Calculator = Calculator;
