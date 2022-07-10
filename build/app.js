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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const EmployeeController_1 = require("./controllers/EmployeeController");
const HealthController_1 = require("./controllers/HealthController");
const State_1 = require("./models/State");
const StatsController_1 = require("./controllers/StatsController");
const swaggerUi = require("swagger-ui-express");
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const logger_middleware_1 = __importDefault(require("./middleware/logger.middleware"));
// import jwtCheck from "./middleware/auth.middleware";
const schemavalidator_middleware_1 = __importDefault(require("./middleware/schemavalidator.middleware"));
const documentation_middleware_1 = __importDefault(require("./middleware/documentation.middleware"));
const { auth } = require('express-oauth2-jwt-bearer');
const app = (0, express_1.default)();
const state = new State_1.State();
let jwtCheck;
if (process.env.JEST_WORKER_ID === undefined) {
    // Middleware to verify against the Auth0 JSON Web Key Set.
    jwtCheck = auth({
        audience: 'localhost:8000/',
        issuerBaseURL: 'https://dev-ekg7j3vm.us.auth0.com/',
    });
}
else {
    jwtCheck = function (req, res, next) {
        next();
    };
}
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(documentation_middleware_1.default));
app.use(body_parser_1.default.json());
app.use(express_1.default.static('public'));
app.use(schemavalidator_middleware_1.default);
app.get('/health', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger_middleware_1.default.log({ level: 'info', message: 'GET /health. headers: ' + JSON.stringify(request.headers) });
    const controller = new HealthController_1.HealthController(state);
    const controllerResp = yield controller.getMessage();
    return response.send(controllerResp);
}));
app.delete('/employee/:id', jwtCheck, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger_middleware_1.default.log({ level: 'info', message: 'DELETE /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController_1.EmployeeController(state);
    const id = request.params.id;
    try {
        const controllerResp = yield controller.delete(id);
        return response.send(controllerResp);
    }
    catch (error) {
        return response.send({
            status: 400,
            message: error.message
        });
    }
}));
app.post('/employee', jwtCheck, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger_middleware_1.default.log({ level: 'info', message: 'POST /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController_1.EmployeeController(state);
    try {
        const controllerResp = yield controller.createEmployee(request.body);
        state.printEmployees(); // TODO remove
        return response.send(controllerResp);
    }
    catch (error) {
        return response.send({
            status: 400,
            message: error.message
        });
    }
}));
app.get('/employees', jwtCheck, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger_middleware_1.default.log({ level: 'info', message: 'GET /employees. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController_1.EmployeeController(state);
    try {
        const controllerResp = yield controller.fetchEmployees();
        response.send(controllerResp);
    }
    catch (error) {
        return response.send({
            status: 400,
            message: error.message
        });
    }
}));
app.get('/statistics/summary', jwtCheck, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger_middleware_1.default.log({ level: 'info', message: 'GET /statistics/summary. headers: ' + JSON.stringify(request.headers) });
    const controller = new StatsController_1.StatsController(state);
    try {
        const controllerResp = yield controller.getAllSummaryStatistics();
        return response.send(controllerResp);
    }
    catch (error) {
        return response.send({
            status: 400,
            message: error.message
        });
    }
}));
app.get('/statistics/summaryForOnContract', jwtCheck, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger_middleware_1.default.log({ level: 'info', message: 'GET /statistics/summary. headers: ' + JSON.stringify(request.headers) });
    const controller = new StatsController_1.StatsController(state);
    try {
        const controllerResp = yield controller.getSummaryStatisticsForOnContract();
        return response.send(controllerResp);
    }
    catch (error) {
        return response.send({
            status: 400,
            message: error.message
        });
    }
}));
app.get('/statistics/summaryForDepartments', jwtCheck, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger_middleware_1.default.log({ level: 'info', message: 'GET /statistics/summaryForDepartments. headers: ' + JSON.stringify(request.headers) });
    const controller = new StatsController_1.StatsController(state);
    try {
        const controllerResp = yield controller.getSummaryStatisticsByDepartment();
        return response.send(controllerResp);
    }
    catch (error) {
        return response.send({
            status: 400,
            message: error.message
        });
    }
}));
app.get('/statistics/summaryForCombinations', jwtCheck, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger_middleware_1.default.log({ level: 'info', message: 'GET /statistics/summaryForCombinations. headers: ' + JSON.stringify(request.headers) });
    const controller = new StatsController_1.StatsController(state);
    try {
        const controllerResp = yield controller.getSummaryStatisticsByDeptAndSub();
        return response.send(controllerResp);
    }
    catch (error) {
        return response.send({
            status: 400,
            message: error.message
        });
    }
}));
// add the error handling middleware (add last or else other middlewares will be skipped)
app.use(error_middleware_1.default);
module.exports = { app, logger: logger_middleware_1.default };
