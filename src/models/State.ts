import {EmployeeInterface} from "../interfaces/EmployeeInterface";
import {randomUUID} from "crypto";

export default class State {
    employees: Map<string,EmployeeInterface>;

    constructor() {
        this.employees = new Map();
    }

    addEmployee(employee: EmployeeInterface) : Promise<EmployeeInterface> {
        return new Promise(resolve => {
            const uuid = randomUUID();
            this.employees.set(uuid, employee);
            employee.id = uuid;
            resolve(employee);
        })
    }

    deleteEmployee(uuid: string) {
        return new Promise(resolve => {
            this.employees.delete(uuid);
            resolve(uuid);
        })
    }

    fetchEmployees() : Promise<EmployeeInterface[]> {
        return new Promise<Array<EmployeeInterface>>(resolve => {
            const employeeArray = this.employees.values()
            return employeeArray
        })
    }

    printEmployees() {
        console.log(this.employees)
    }
}
