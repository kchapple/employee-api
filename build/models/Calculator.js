"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
const CalculatorException_1 = __importDefault(require("../exceptions/CalculatorException"));
class Calculator {
    calculate(employees) {
        const salaries = employees.map((employee) => {
            return Number(employee.salary);
        });
        let min = 0;
        let max = 0;
        let mean = 0;
        if (salaries.length > 0) {
            min = Math.min(...salaries);
            max = Math.max(...salaries);
            mean = Math.ceil(salaries.reduce((partialSum, n) => {
                return partialSum + n;
            }, 0) / salaries.length);
        }
        else {
            throw new CalculatorException_1.default("No Employees found to run statistical analysis");
        }
        return {
            mean: mean,
            min: min,
            max: max
        };
    }
}
exports.Calculator = Calculator;
