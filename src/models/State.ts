import { Employee} from '../Api'
import { randomUUID } from 'crypto';
import StateException from '../exceptions/StateException';
import { EmployeeFilter } from './EmployeeFilter';

export class State {
    employees: Map<string,Employee>;

    constructor() {
        this.employees = new Map();
    }

    /**
     * Get our employees as an array
     */
    public getEmployeesAsArray() {
        return Array.from(this.employees.values());
    }

    /**
     * Add an employee to our Map. Create a UUID for them and add the id property
     * to the employee object.
     *
     * @param employee
     */
    public async addEmployee(employee: Employee) : Promise<Employee> {
        return new Promise(resolve => {
            const uuid = randomUUID();
            this.employees.set(uuid, employee);
            employee.id = uuid;
            resolve(employee);
        });
    }

    /**
     * Get an employee out of our Map by their ID
     *
     * @param uuid
     */
    public async findEmployeeById(uuid: string) : Promise<Employee> {
        return new Promise(resolve => {
            if (this.employees.has(uuid)) {
                const employee = this.employees.get(uuid) as Employee;
                resolve(employee);
            } else {
                throw new StateException('Employee not found')
            }
        });
    }

    /**
     * Remove an employee from our Map by their ID
     *
     * @param uuid
     */
    public async deleteEmployee(uuid: string) : Promise<String> {
        return new Promise(resolve => {
            if (this.employees.has(uuid)) {
                this.employees.delete(uuid);
                resolve(uuid);
            } else {
                throw new StateException('Employee not found')
            }
        });
    }

    /**
     * Get all employees out or our Map
     */
    public fetchEmployees() : Promise<Employee[]> {
        return new Promise<Array<Employee>>(resolve => {
            const employeeArray = Array.from(this.employees.values());
            resolve(employeeArray);
        });
    }

    /**
     * Get all employees organized by department
     */
    public fetchEmployeesByDepartment() {
        return new Promise<Map<string,Array<Employee>>>(resolve => {
            let employeeArray = this.getEmployeesAsArray();
            let result = new Map<string, Array<Employee>>();
            for (let i = 0; i < employeeArray.length; i++) {
                const employee = employeeArray[i] as Employee;
                if (!result.has(employee.department)) {
                    result.set(employee.department, new Array<Employee>());
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
    public fetchEmployeesByDeptSubCombo()
    {
        return new Promise<Map<string,Map<string,Array<Employee>>>>(resolve => {
            let employeeArray = this.getEmployeesAsArray();
            let result = new Map<string,Map<string,Array<Employee>>>();
            for (let i = 0; i < employeeArray.length; i++) {
                const employee = employeeArray[i] as Employee;
                if (!result.has(employee.department)) {
                    result.set(employee.department, new Map<string, Array<Employee>>());
                }

                const sub = result.get(employee.department);

                // @ts-ignore TS complains that sub could be undefined, but that is not possible
                if (!sub.has(employee.sub_department)) {
                    // @ts-ignore
                    sub.set(employee.sub_department, new Array<Employee>());
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
    public fetchEmployeesFilter(filter: EmployeeFilter) : Promise<Employee[]> {
        return new Promise<Array<Employee>>(resolve => {
            let employeeArray = Array.from(this.employees.values());
            if (filter.onContract === true) {
                employeeArray = employeeArray.filter((employee: Employee) => {
                    if (employee.on_contract === 'true') {
                        return employee;
                    }
                })
            }

            resolve(employeeArray);
        });
    }

    /**
     * Print the Map of employees to the console
     */
    public printEmployees() {
        console.log(this.employees)
    }
}
