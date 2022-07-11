// we will use supertest to test HTTP requests/responses
import request from 'supertest';
import supertest from 'supertest';
// we also need our app for the correct routes!
// @ts-ignore
const { app } = require('../app');

describe('GET /statistics/summary', () => {
    test('Server should respond with a single SS', async () => {
        // First create an employee
        const response = await request(app).post('/employee').send({
            'name': 'Abhishek',
            'salary': '145000',
            'currency': 'USD',
            'department': 'Engineering',
            'sub_department': 'Platform'
        });
        console.log(response.body);

        const response2 = await request(app).get('/statistics/summary');
        expect(response2.body).toHaveProperty('mean', 145000);
        expect(response2.body).toHaveProperty('min', 145000);
        expect(response2.body).toHaveProperty('max', 145000);
        expect(response2.statusCode).toBe(200);
    });
});
