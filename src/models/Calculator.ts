import {Employee, SummaryStatistics} from "../Api";
import CalculatorException from "../exceptions/CalculatorException";

export class Calculator {
    private employees: Array<Employee>;

    constructor(employees: Array<Employee>) {
        this.employees = employees;
    }

    public calculate(): SummaryStatistics {

        const salaries = this.employees.map((employee: Employee) => {
            return Number(employee.salary);
        });
        let min = 0;
        let max = 0;
        let mean = 0;
        if (salaries.length > 0) {

            min = Math.min(...salaries);

            max = Math.max(...salaries);

            mean = Math.ceil(salaries.reduce((partialSum: number, n: number) => {
                return partialSum + n;
            }, 0) / salaries.length);
        } else {
            throw new CalculatorException("No Employees found to run statistical analysis")
        }

        return {
            mean: mean,
            min: min,
            max: max
        };
    }
}
