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
exports.State = void 0;
const crypto_1 = require("crypto");
const StateException_1 = __importDefault(require("../exceptions/StateException"));
class State {
    constructor() {
        this.employees = new Map();
    }
    /**
     * Get our employees as an array
     */
    getEmployeesAsArray() {
        return Array.from(this.employees.values());
    }
    /**
     * Add an employee to our Map. Create a UUID for them and add the id property
     * to the employee object.
     *
     * @param employee
     */
    addEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                const uuid = (0, crypto_1.randomUUID)();
                this.employees.set(uuid, employee);
                employee.id = uuid;
                resolve(employee);
            });
        });
    }
    /**
     * Get an employee out of our Map by their ID
     *
     * @param uuid
     */
    findEmployeeById(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                if (this.employees.has(uuid)) {
                    const employee = this.employees.get(uuid);
                    resolve(employee);
                }
                else {
                    throw new StateException_1.default(404, 'Employee not found');
                }
            });
        });
    }
    /**
     * Remove an employee from our Map by their ID
     *
     * @param uuid
     */
    deleteEmployee(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                if (this.employees.has(uuid)) {
                    this.employees.delete(uuid);
                    resolve(uuid);
                }
                else {
                    throw new StateException_1.default(404, 'Employee not found');
                }
            });
        });
    }
    /**
     * Get all employees out or our Map
     */
    fetchEmployees() {
        return new Promise(resolve => {
            const employeeArray = Array.from(this.employees.values());
            resolve(employeeArray);
        });
    }
    /**
     * Get all employees organized by department
     */
    fetchEmployeesByDepartment() {
        return new Promise(resolve => {
            let employeeArray = this.getEmployeesAsArray();
            let result = new Map();
            for (let i = 0; i < employeeArray.length; i++) {
                const employee = employeeArray[i];
                if (!result.has(employee.department)) {
                    result.set(employee.department, new Array());
                }
                // @ts-ignore TS complains that employee.department could be undefined, but that is not possible
                result.get(employee.department).push(employee);
            }
            resolve(result);
        });
    }
    /**
     * Get all employees organized by their department and sub-department
     */
    fetchEmployeesByDeptSubCombo() {
        return new Promise(resolve => {
            let employeeArray = this.getEmployeesAsArray();
            let result = new Map();
            for (let i = 0; i < employeeArray.length; i++) {
                const employee = employeeArray[i];
                if (!result.has(employee.department)) {
                    result.set(employee.department, new Map());
                }
                const sub = result.get(employee.department);
                // @ts-ignore TS complains that sub could be undefined, but that is not possible
                if (!sub.has(employee.sub_department)) {
                    // @ts-ignore
                    sub.set(employee.sub_department, new Array());
                }
                // @ts-ignore
                const sub_array = sub.get(employee.sub_department);
                // @ts-ignore
                sub_array.push(employee);
            }
            resolve(result);
        });
    }
    /**
     * Get employees who satisfy the filter criteria
     *
     * @param filter
     */
    fetchEmployeesFilter(filter) {
        return new Promise(resolve => {
            let employeeArray = Array.from(this.employees.values());
            if (filter.onContract === true) {
                employeeArray = employeeArray.filter((employee) => {
                    if (employee.on_contract === 'true') {
                        return employee;
                    }
                });
            }
            resolve(employeeArray);
        });
    }
    /**
     * Print the Map of employees to the console
     */
    printEmployees() {
        console.log(this.employees);
    }
}
exports.State = State;
