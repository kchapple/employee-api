// we will use supertest to test HTTP requests/responses
import request from 'supertest';
import supertest from "supertest";

// we also need our app for the correct routes!
// @ts-ignore
const { app } = require("../app");

describe("POST /employee ", () => {
    test("Server should respond with newly created employee", async () => {
        const response = await request(app).post("/employee").send({
            "name": "Abhishek",
            "salary": "145000",
            "currency": "USD",
            "department": "Engineering",
            "sub_department": "Platform"
        });
        const deleteResp = await request(app).delete("/employee/" + response.body.id).send();
        expect(deleteResp.statusCode).toBe(200);
        expect(deleteResp.text).toEqual(response.body.id);
        const listResp = await request(app).get('/employees');
        expect(listResp.body).toEqual([])
    });
});
