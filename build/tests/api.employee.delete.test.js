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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// we will use supertest to test HTTP requests/responses
const supertest_1 = __importDefault(require("supertest"));
// we also need our app for the correct routes!
// @ts-ignore
const { app } = require('../app');
describe('POST /employee ', () => {
    test('Server should respond with newly created employee', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/employee').send({
            'name': 'Abhishek',
            'salary': '145000',
            'currency': 'USD',
            'department': 'Engineering',
            'sub_department': 'Platform'
        });
        const deleteResp = yield (0, supertest_1.default)(app).delete('/employee/' + response.body.id).send();
        expect(deleteResp.statusCode).toBe(200);
        expect(deleteResp.text).toEqual(response.body.id);
        const listResp = yield (0, supertest_1.default)(app).get('/employees');
        expect(listResp.body).toEqual([]);
    }));
});
