import {AbstractController} from './AbstractController';
import {Calculator} from '../models/Calculator';
import {ComboStatistics, DepartmentStatistics, Employee, SummaryStatistics} from '../Api';
import {EmployeeController} from './EmployeeController';
import {EmployeeFilter} from '../models/EmployeeFilter';
import CalculatorException from '../exceptions/CalculatorException';

export class StatsController extends AbstractController
{
    public async getAllSummaryStatistics(): Promise<SummaryStatistics>
    {
        const employees = await this.state.fetchEmployees();
        if (employees.length === 0) {
            throw new CalculatorException('No employees found to calculate summary');
        }
        const calculator = new Calculator();
        try {
            return calculator.calculate(employees);
        } catch (error: any) {
            throw error;
        }
    }

    public async getSummaryStatisticsForOnContract(): Promise<SummaryStatistics>
    {
        const employeesOnContract = await this.state.fetchEmployeesFilter(new EmployeeFilter(true));
        if (employeesOnContract.length === 0) {
            throw new CalculatorException('No employees found to calculate summary');
        }
        const calculator = new Calculator();
        const ss = calculator.calculate(employeesOnContract);
        return ss;
    }

    public async getSummaryStatisticsByDepartment(): Promise<Array<DepartmentStatistics>>
    {
        const employeesByDepartment = await this.state.fetchEmployeesByDepartment();
        if (employeesByDepartment.size === 0) {
            throw new CalculatorException('No employees found to calculate summary');
        }
        const calculator = new Calculator();
        let departmentStatistics = Object.create(null);
        for (const [department, employees] of employeesByDepartment) {
            const ss = calculator.calculate(employees);
            departmentStatistics[department] = ss;
        }

        return departmentStatistics;
    }

    public async getSummaryStatisticsByDeptAndSub(): Promise<Array<ComboStatistics>>
    {
        const employeesByCombo = await this.state.fetchEmployeesByDeptSubCombo();
        if (employeesByCombo.size === 0) {
            throw new CalculatorException('No employees found to calculate summary');
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
