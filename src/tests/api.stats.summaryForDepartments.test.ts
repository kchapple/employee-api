// we will use supertest to test HTTP requests/responses
import request from 'supertest';
// we also need our app for the correct routes!
// @ts-ignore
const { app } = require('../app');

describe('GET /statistics/summaryForDepartments', () => {
    test('Server should respond with a single SS', async () => {
        // First create an employee
        const data = [
            {
                'name': 'Abhishek',
                'salary': '145000',
                'currency': 'USD',
                'department': 'Engineering',
                'sub_department': 'Platform'
            },
            {
                'name': 'Himani',
                'salary': '240000',
                'currency': 'USD',
                'department': 'Engineering',
                'sub_department': 'Platform'
            },
            {
                'name': 'Yatendra',
                'salary': '30',
                'currency': 'USD',
                'department': 'Operations',
                'sub_department': 'CustomerOnboarding'
            }
        ];

        for (let d in data) {
            const response = await request(app).post('/employee').send(data[d]);
        }

        const response2 = await request(app).get('/statistics/summaryForDepartments');
        expect(response2.body).toHaveProperty('Engineering');
        expect(response2.body['Engineering']).toHaveProperty('mean', 192500);
        expect(response2.body['Engineering']).toHaveProperty('min', 145000);
        expect(response2.body['Engineering']).toHaveProperty('max', 240000);
        expect(response2.statusCode).toBe(200);
    });
});
