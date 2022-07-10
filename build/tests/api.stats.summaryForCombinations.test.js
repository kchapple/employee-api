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
const { app } = require("../app");
describe("GET /statistics/summaryForCombinations", () => {
    test("Server should respond with a single SS", () => __awaiter(void 0, void 0, void 0, function* () {
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
            yield (0, supertest_1.default)(app).post("/employee").send(data[d]);
        }
        const response2 = yield (0, supertest_1.default)(app).get('/statistics/summaryForCombinations');
        expect(response2.body).toHaveProperty("Engineering");
        expect(response2.body["Engineering"]).toHaveProperty("Platform");
        expect(response2.body["Engineering"]["Platform"]).toHaveProperty("mean", 200);
        expect(response2.body["Engineering"]["Platform"]).toHaveProperty("min", 100);
        expect(response2.body["Engineering"]["Platform"]).toHaveProperty("max", 300);
        expect(response2.statusCode).toBe(200);
    }));
});
