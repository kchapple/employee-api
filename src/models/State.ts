import {Employee} from "../Api"
import {randomUUID} from "crypto";
import StateException from "../exceptions/StateException";

export class State {
    employees: Map<string,Employee>;

    constructor() {
        this.employees = new Map();
    }

    public async addEmployee(employee: Employee) : Promise<Employee> {
        return new Promise(resolve => {
            const uuid = randomUUID();
            this.employees.set(uuid, employee);
            employee.id = uuid;
            resolve(employee);
        });
    }

    public async deleteEmployee(uuid: string) : Promise<String> {
        return new Promise(resolve => {
            if (this.employees.has(uuid)) {
                this.employees.delete(uuid);
                resolve(uuid);
            } else {
                throw new StateException("Employee not found")
            }
        });
    }

    public fetchEmployees() : Promise<Employee[]> {
        return new Promise<Array<Employee>>(resolve => {
            const employeeArray = Array.from(this.employees.values());
            resolve(employeeArray);
        });
    }

    public printEmployees() {
        console.log(this.employees)
    }
}
