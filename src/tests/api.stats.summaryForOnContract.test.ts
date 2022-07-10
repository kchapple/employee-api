// we will use supertest to test HTTP requests/responses
import request from 'supertest';
// we also need our app for the correct routes!
// @ts-ignore
const { app } = require("../app");

describe("GET /statistics/summaryForOnContract", () => {
    test("Server should respond with a single SS", async () => {
        // First create an employee
        const response = await request(app).post("/employee").send({
            "name": "Abhishek",
            "salary": "145000",
            "currency": "USD",
            "department": "Engineering",
            "sub_department": "Platform"
        });

        const response2 = await request(app).get('/statistics/summaryForOnContract');

        // No on-contract, return 400
        expect(response2.body.status).toBe(400);

        await request(app).post("/employee").send({
            "name": "Ken",
            "salary": "145000",
            "currency": "USD",
            "department": "Engineering",
            "sub_department": "Platform",
            "on_contract": "true"
        });

        const response3 = await request(app).get('/statistics/summaryForOnContract');

        expect(response3.body).toHaveProperty("mean", 145000);
        expect(response3.body).toHaveProperty("min", 145000);
        expect(response3.body).toHaveProperty("max", 145000);
        expect(response3.statusCode).toBe(200);
    });
});
