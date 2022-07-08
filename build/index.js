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
const express_1 = __importDefault(require("express"));
const winston_1 = require("winston");
const Database_1 = __importDefault(require("./models/Database"));
const EmployeeController_1 = __importDefault(require("./controllers/EmployeeController"));
const HealthController_1 = __importDefault(require("./controllers/HealthController"));
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
const router = express_1.default.Router();
const database = new Database_1.default();
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use(router);
const logger = (0, winston_1.createLogger)({
    transports: [new winston_1.transports.Console()],
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.simple()),
});
router.get('/health', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger.log({ level: 'info', message: 'GET /health. headers: ' + JSON.stringify(request.headers) });
    const controller = new HealthController_1.default(database);
    const controllerResp = yield controller.getMessage();
    return response.send(controllerResp);
}));
router.post('/employee', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger.log({ level: 'info', message: 'POST /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController_1.default(database);
    const controllerResp = controller.createEmployee(request.body);
    return response.send(controllerResp);
}));
router.get('/employees', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger.log({ level: 'info', message: 'GET /employees. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController_1.default(database);
    const controllerResp = controller.fetchEmployees();
}));
app.listen(PORT, () => {
    logger.log({ level: 'info', message: 'Server is running on port ' + PORT });
});
