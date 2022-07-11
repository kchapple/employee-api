"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const AbstractController_1 = require("./AbstractController");
const Calculator_1 = require("../models/Calculator");
const EmployeeFilter_1 = require("../models/EmployeeFilter");
const StatsException_1 = __importDefault(require("../exceptions/StatsException"));
class StatsController extends AbstractController_1.AbstractController {
    /**
     * Calculate summary statistics across all employees and return a Promise
     * containing SummaryStatistics interface.
     *
     * If there are no employees, throw an exception.
     */
    getAllSummaryStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.state.fetchEmployees();
            if (employees.length === 0) {
                throw new StatsException_1.default(400, 'No employees found to calculate summary');
            }
            const calculator = new Calculator_1.Calculator();
            try {
                return calculator.calculate(employees);
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Calculate summary statistics across all employees that are on-contract and return a Promise
     * containing SummaryStatistics interface.
     *
     * If there are no employees, throw an exception.
     */
    getSummaryStatisticsForOnContract() {
        return __awaiter(this, void 0, void 0, function* () {
            const employeesOnContract = yield this.state.fetchEmployeesFilter(new EmployeeFilter_1.EmployeeFilter(true));
            if (employeesOnContract.length === 0) {
                throw new StatsException_1.default(400, 'No employees found to calculate summary');
            }
            const calculator = new Calculator_1.Calculator();
            const ss = calculator.calculate(employeesOnContract);
            return ss;
        });
    }
    /**
     * Calculate summary statistics across all employees arranged by department and return a Promise
     * containing DepartmentStatistics interface.
     *
     * If there are no employees, throw an exception.
     */
    getSummaryStatisticsByDepartment() {
        return __awaiter(this, void 0, void 0, function* () {
            const employeesByDepartment = yield this.state.fetchEmployeesByDepartment();
            if (employeesByDepartment.size === 0) {
                throw new StatsException_1.default(400, 'No employees found to calculate summary');
            }
            const calculator = new Calculator_1.Calculator();
            let departmentStatistics = Object.create(null);
            for (const [department, employees] of employeesByDepartment) {
                const ss = calculator.calculate(employees);
                departmentStatistics[department] = ss;
            }
            return departmentStatistics;
        });
    }
    /**
     * Calculate summary statistics across all employees arranged by department, and their sub-department,
     * and return a Promise containing ComboStatistics interface.
     *
     * If there are no employees, throw an exception.
     */
    getSummaryStatisticsByDeptAndSub() {
        return __awaiter(this, void 0, void 0, function* () {
            const employeesByCombo = yield this.state.fetchEmployeesByDeptSubCombo();
            if (employeesByCombo.size === 0) {
                throw new StatsException_1.default(400, 'No employees found to calculate summary');
            }
            const calculator = new Calculator_1.Calculator();
            let departmentStatistics = Object.create(null);
            for (const [department, sub_department_map] of employeesByCombo) {
                departmentStatistics[department] = Object.create(null);
                for (const [sub_department, employees] of sub_department_map) {
                    const ss = calculator.calculate(employees);
                    departmentStatistics[department][sub_department] = ss;
                }
            }
            return departmentStatistics;
        });
    }
}
exports.StatsController = StatsController;
