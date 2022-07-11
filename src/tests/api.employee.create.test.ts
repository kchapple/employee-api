// we will use supertest to test HTTP requests/responses
import request from 'supertest';
import supertest from 'supertest';

// we also need our app for the correct routes!
// @ts-ignore
const { app } = require('../app');

describe('POST /employee ', () => {
    test('Server should respond with newly created employee', async () => {
        const response = await request(app).post('/employee').send({
            'name': 'Abhishek',
            'salary': '145000',
            'currency': 'USD',
            'department': 'Engineering',
            'sub_department': 'Platform'
        });
        expect(response.body).toHaveProperty('name', 'Abhishek');
        expect(response.body).toHaveProperty('salary', '145000');
        expect(response.body).toHaveProperty('currency', 'USD');
        expect(response.body).toHaveProperty('department', 'Engineering');
        expect(response.body).toHaveProperty('sub_department', 'Platform');
        expect(response.body).toHaveProperty('id');
        expect(response.statusCode).toBe(200);
    });
});
