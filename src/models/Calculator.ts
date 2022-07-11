import {Employee, SummaryStatistics} from '../Api';
import CalculatorException from '../exceptions/CalculatorException';

export class Calculator {

    /**
     * Calculate salary statistics (mean, min, max) given an array of employees
     *
     * @param employees
     */
    public calculate(employees: Array<Employee>): SummaryStatistics {

        const salaries = employees.map((employee: Employee) => {
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
            throw new CalculatorException('No Employees found to run statistical analysis')
        }

        return {
            mean: mean,
            min: min,
            max: max
        };
    }
}
