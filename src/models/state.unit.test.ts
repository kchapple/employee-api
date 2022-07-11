import {State} from './State';
import {Employee} from '../Api';

test('groupEmployeesByDepartment()', async () => {
    const employees = [
        {
            name: 'Abhishek',
            salary: '145000',
            currency: 'USD',
            department: 'Engineering',
            sub_department: 'Platform'
        },
        {
            name: 'Anurag',
            salary: '90000',
            currency: 'USD',
            department: 'Banking',
            on_contract: 'true',
            sub_department: 'Loan'
        },
        {
            name: 'Himani',
            salary: '240000',
            currency: 'USD',
            department: 'Engineering',
            sub_department: 'Platform'
        }
    ];

    const expectedGroupedEmployees = {
        'Engineering': [
            {
                name: 'Abhishek',
                salary: '145000',
                currency: 'USD',
                department: 'Engineering',
                sub_department: 'Platform'
            },
            {
                name: 'Himani',
                salary: '240000',
                currency: 'USD',
                department: 'Engineering',
                sub_department: 'Platform'
            }
        ],
        'Banking': [
            {
                name: 'Anurag',
                salary: '90000',
                currency: 'USD',
                department: 'Banking',
                on_contract: 'true',
                sub_department: 'Loan'
            }
        ]
    };

    const state = new State();
    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i] as Employee;
        await state.addEmployee(employee);
    };

    const groupedEmployees = await state.fetchEmployeesByDepartment();
    expect(groupedEmployees.has('Engineering')).toEqual(true);
    expect(groupedEmployees.has('Banking')).toEqual(true);
});

test('groupEmployeesByDeptSubCombo()', async () => {
    const employees = [
        {
            name: 'Abhishek',
            salary: '145000',
            currency: 'USD',
            department: 'Engineering',
            sub_department: 'Platform'
        },
        {
            name: 'Anurag',
            salary: '90000',
            currency: 'USD',
            department: 'Banking',
            on_contract: 'true',
            sub_department: 'Loan'
        },
        {
            name: 'Himani',
            salary: '240000',
            currency: 'USD',
            department: 'Engineering',
            sub_department: 'Platform'
        }
    ];

    const expectedGroupedEmployees = {
        'Engineering': {
            'Platform': [
                {
                    name: 'Abhishek',
                    salary: '145000',
                    currency: 'USD',
                    department: 'Engineering',
                    sub_department: 'Platform'
                },
                {
                    name: 'Himani',
                    salary: '240000',
                    currency: 'USD',
                    department: 'Engineering',
                    sub_department: 'Platform'
                }
            ]
        },
        'Banking': {
            'Loan': [
                {
                    name: 'Anurag',
                    salary: '90000',
                    currency: 'USD',
                    department: 'Banking',
                    on_contract: 'true',
                    sub_department: 'Loan'
                }
            ]
        }
    };

    const state = new State();
    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i] as Employee;
        await state.addEmployee(employee);
    };

    const groupedEmployees = await state.fetchEmployeesByDeptSubCombo();
    expect(groupedEmployees.has('Engineering')).toEqual(true);
    // @ts-ignore
    expect(groupedEmployees.get('Engineering').has('Platform')).toEqual(true);
    expect(groupedEmployees.has('Banking')).toEqual(true);
    // @ts-ignore
    expect(groupedEmployees.get('Banking').has('Loan')).toEqual(true);
});
