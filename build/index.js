"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const OpenApiValidator = __importStar(require("express-openapi-validator"));
const winston_1 = require("winston");
const EmployeeController_1 = require("./controllers/EmployeeController");
const HealthController_1 = require("./controllers/HealthController");
const State_1 = require("./models/State");
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const StatsController_1 = require("./controllers/StatsController");
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
const state = new State_1.State();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
// Construct the validator with some basic options
app.use(OpenApiValidator.middleware({
    apiSpec: './schema/kchapple-Employees-1.0.0-resolved.yaml'
}));
const logger = (0, winston_1.createLogger)({
    transports: [new winston_1.transports.Console()],
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.simple()),
});
app.get('/health', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger.log({ level: 'info', message: 'GET /health. headers: ' + JSON.stringify(request.headers) });
    const controller = new HealthController_1.HealthController(state);
    const controllerResp = yield controller.getMessage();
    return response.send(controllerResp);
}));
app.delete('/employee/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger.log({ level: 'info', message: 'DELETE /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController_1.EmployeeController(state);
    const id = request.params.id;
    const controllerResp = yield controller.delete(id);
}));
app.post('/employee', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger.log({ level: 'info', message: 'POST /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController_1.EmployeeController(state);
    const controllerResp = yield controller.createEmployee(request.body);
    state.printEmployees(); // TODO remove
    return response.send(controllerResp);
}));
app.get('/employees', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger.log({ level: 'info', message: 'GET /employees. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController_1.EmployeeController(state);
    const controllerResp = yield controller.fetchEmployees();
}));
app.get('/statistics/summary', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger.log({ level: 'info', message: 'GET /statistics/summary. headers: ' + JSON.stringify(request.headers) });
    const controller = new StatsController_1.StatsController(state);
    const controllerResp = yield controller.getAllSummaryStatistics();
    return response.send(controllerResp);
}));
// add the error handling middleware (add last or else other middlewares will be skipped)
app.use(error_middleware_1.default);
app.listen(PORT, () => {
    logger.log({ level: 'info', message: 'Server is running on port ' + PORT });
});
