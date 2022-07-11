import {AbstractController} from './AbstractController';
import {Employee} from '../Api';

export class EmployeeController extends AbstractController {

    public async createEmployee(body: Employee): Promise<Employee> {
        return this.state.addEmployee(body)
    }

    public async findEmployeeById(id: string) {
        return this.state.findEmployeeById(id);
    }

    public async delete(id: string) {
        return this.state.deleteEmployee(id);
    }

    public async fetchEmployees() {
        return this.state.fetchEmployees()
    }
}
