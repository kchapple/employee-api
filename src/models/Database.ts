import {EmployeeInterface} from "../interfaces/EmployeeInterface";

export default class Database {
    employees: Map<EmployeeInterface,EmployeeInterface>;

    constructor() {
        this.employees = new Map();
    }

    addEmployee(employee: EmployeeInterface) : Promise<EmployeeInterface> {
        return new Promise(resolve => {
            this.employees.set(employee, employee);
            resolve(employee)
        })
    }

    fetchEmployees() : Promise<EmployeeInterface[]> {
        return new Promise<Array<EmployeeInterface>>(resolve => {
            const employeeArray = this.employees.values()
            return employeeArray
        })
    }
}
