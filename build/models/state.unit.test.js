"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = require("./State");
test("groupEmployeesByDepartment()", () => __awaiter(void 0, void 0, void 0, function* () {
    const employees = [
        {
            name: "Abhishek",
            salary: "145000",
            currency: "USD",
            department: "Engineering",
            sub_department: "Platform"
        },
        {
            name: "Anurag",
            salary: "90000",
            currency: "USD",
            department: "Banking",
            on_contract: "true",
            sub_department: "Loan"
        },
        {
            name: "Himani",
            salary: "240000",
            currency: "USD",
            department: "Engineering",
            sub_department: "Platform"
        }
    ];
    const expectedGroupedEmployees = {
        "Engineering": [
            {
                name: "Abhishek",
                salary: "145000",
                currency: "USD",
                department: "Engineering",
                sub_department: "Platform"
            },
            {
                name: "Himani",
                salary: "240000",
                currency: "USD",
                department: "Engineering",
                sub_department: "Platform"
            }
        ],
        "Banking": [
            {
                name: "Anurag",
                salary: "90000",
                currency: "USD",
                department: "Banking",
                on_contract: "true",
                sub_department: "Loan"
            }
        ]
    };
    const state = new State_1.State();
    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        yield state.addEmployee(employee);
    }
    ;
    const groupedEmployees = yield state.fetchEmployeesByDepartment();
    expect(groupedEmployees.has("Engineering")).toEqual(true);
    expect(groupedEmployees.has("Banking")).toEqual(true);
}));
test("groupEmployeesByDeptSubCombo()", () => __awaiter(void 0, void 0, void 0, function* () {
    const employees = [
        {
            name: "Abhishek",
            salary: "145000",
            currency: "USD",
            department: "Engineering",
            sub_department: "Platform"
        },
        {
            name: "Anurag",
            salary: "90000",
            currency: "USD",
            department: "Banking",
            on_contract: "true",
            sub_department: "Loan"
        },
        {
            name: "Himani",
            salary: "240000",
            currency: "USD",
            department: "Engineering",
            sub_department: "Platform"
        }
    ];
    const expectedGroupedEmployees = {
        "Engineering": {
            "Platform": [
                {
                    name: "Abhishek",
                    salary: "145000",
                    currency: "USD",
                    department: "Engineering",
                    sub_department: "Platform"
                },
                {
                    name: "Himani",
                    salary: "240000",
                    currency: "USD",
                    department: "Engineering",
                    sub_department: "Platform"
                }
            ]
        },
        "Banking": {
            "Loan": [
                {
                    name: "Anurag",
                    salary: "90000",
                    currency: "USD",
                    department: "Banking",
                    on_contract: "true",
                    sub_department: "Loan"
                }
            ]
        }
    };
    const state = new State_1.State();
    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        yield state.addEmployee(employee);
    }
    ;
    const groupedEmployees = yield state.fetchEmployeesByDeptSubCombo();
    expect(groupedEmployees.has("Engineering")).toEqual(true);
    // @ts-ignore
    expect(groupedEmployees.get("Engineering").has("Platform")).toEqual(true);
    expect(groupedEmployees.has("Banking")).toEqual(true);
    // @ts-ignore
    expect(groupedEmployees.get("Banking").has("Loan")).toEqual(true);
}));
