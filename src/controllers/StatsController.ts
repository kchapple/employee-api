import { AbstractController } from './AbstractController';
import { Calculator } from '../models/Calculator';
import { ComboStatistics, DepartmentStatistics, SummaryStatistics } from '../Api';
import { EmployeeFilter } from '../models/EmployeeFilter';
import StatsException from "../exceptions/StatsException";

export class StatsController extends AbstractController
{
    /**
     * Calculate summary statistics across all employees and return a Promise
     * containing SummaryStatistics interface.
     *
     * If there are no employees, throw an exception.
     */
    public async getAllSummaryStatistics(): Promise<SummaryStatistics>
    {
        const employees = await this.state.fetchEmployees();
        if (employees.length === 0) {
            throw new StatsException(400, 'No employees found to calculate summary');
        }
        const calculator = new Calculator();
        try {
            return calculator.calculate(employees);
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Calculate summary statistics across all employees that are on-contract and return a Promise
     * containing SummaryStatistics interface.
     *
     * If there are no employees, throw an exception.
     */
    public async getSummaryStatisticsForOnContract(): Promise<SummaryStatistics>
    {
        const employeesOnContract = await this.state.fetchEmployeesFilter(new EmployeeFilter(true));
        if (employeesOnContract.length === 0) {
            throw new StatsException(400, 'No employees found to calculate summary');
        }
        const calculator = new Calculator();
        const ss = calculator.calculate(employeesOnContract);
        return ss;
    }

    /**
     * Calculate summary statistics across all employees arranged by department and return a Promise
     * containing DepartmentStatistics interface.
     *
     * If there are no employees, throw an exception.
     */
    public async getSummaryStatisticsByDepartment(): Promise<Array<DepartmentStatistics>>
    {
        const employeesByDepartment = await this.state.fetchEmployeesByDepartment();
        if (employeesByDepartment.size === 0) {
            throw new StatsException(400, 'No employees found to calculate summary');
        }
        const calculator = new Calculator();
        let departmentStatistics = Object.create(null);
        for (const [department, employees] of employeesByDepartment) {
            const ss = calculator.calculate(employees);
            departmentStatistics[department] = ss;
        }

        return departmentStatistics;
    }

    /**
     * Calculate summary statistics across all employees arranged by department, and their sub-department,
     * and return a Promise containing ComboStatistics interface.
     *
     * If there are no employees, throw an exception.
     */
    public async getSummaryStatisticsByDeptAndSub(): Promise<Array<ComboStatistics>>
    {
        const employeesByCombo = await this.state.fetchEmployeesByDeptSubCombo();
        if (employeesByCombo.size === 0) {
            throw new StatsException(400, 'No employees found to calculate summary');
        }
        const calculator = new Calculator();
        let departmentStatistics = Object.create(null);
        for (const [department, sub_department_map] of employeesByCombo) {
            departmentStatistics[department] = Object.create(null);
            for (const [sub_department, employees] of sub_department_map) {
                const ss = calculator.calculate(employees);
                departmentStatistics[department][sub_department] = ss;
            }
        }

        return departmentStatistics;
    }
}
