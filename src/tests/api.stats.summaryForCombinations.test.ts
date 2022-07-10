// we will use supertest to test HTTP requests/responses
import request from 'supertest';
// we also need our app for the correct routes!
// @ts-ignore
const { app } = require("../app");

describe("GET /statistics/summaryForCombinations", () => {
    test("Server should respond with a single SS", async () => {
        const data = [
            {
                "name": "Abhishek",
                "salary": "100",
                "currency": "USD",
                "department": "Engineering",
                "sub_department": "Platform"
            },
            {
                "name": "Abhishek",
                "salary": "200",
                "currency": "USD",
                "department": "Engineering",
                "sub_department": "Platform"
            },
            {
                "name": "Abhishek",
                "salary": "300",
                "currency": "USD",
                "department": "Engineering",
                "sub_department": "Platform"
            }
        ];

        // Add our data
        for (let d in data) {
            const response = await request(app).post("/employee").send(d);
        }

        const response2 = await request(app).get('/statistics/summaryForCombinations');
        expect(response2.body).toHaveProperty("mean", 200);
        expect(response2.body).toHaveProperty("min", 100);
        expect(response2.body).toHaveProperty("max", 300);
        expect(response2.statusCode).toBe(200);
    });
});
