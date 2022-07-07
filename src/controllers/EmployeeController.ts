import AbstractController from "./AbstractController";
import {EmployeeInterface} from "../interfaces/EmployeeInterface";

export default class EmployeeController extends AbstractController {

    public async createEmployee(body: EmployeeInterface): Promise<EmployeeInterface> {
        return this.database.addEmployee(body)
    }

    public async fetchEmployees() {
        return this.database.fetchEmployees()
    }
}
