import {AbstractController} from "./AbstractController";
import {Calculator} from "../models/Calculator";
import {SummaryStatistics} from "../Api";

export class StatsController extends AbstractController
{
    public async getAllSummaryStatistics(): Promise<SummaryStatistics>
    {
        const employees = await this.state.fetchEmployees();
        const calculator = new Calculator(employees);
        try {
            return calculator.calculate();
        } catch (error: any) {
            throw error;
        }
    }
}
