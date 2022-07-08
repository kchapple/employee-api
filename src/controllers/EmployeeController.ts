import {AbstractController} from "./AbstractController";
import {EmployeeInterface} from "../interfaces/EmployeeInterface";

export default class EmployeeController extends AbstractController {

    public async createEmployee(body: EmployeeInterface): Promise<EmployeeInterface> {
        return this.state.addEmployee(body)
    }

    public async delete(id: string) {
        return this.state.deleteEmployee(id);
    }

    public async fetchEmployees() {
        return this.state.fetchEmployees()
    }
}
