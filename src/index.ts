import express, {Application, response} from 'express';
import { createLogger, transports, format } from 'winston';

import HealthController from './controllers/HealthController';
import Database from "./models/Database";
import EmployeeController from "./controllers/EmployeeController";

const router = express.Router();

const PORT = process.env.PORT || 8000;

const app: Application = express();

const database = new Database()

app.use(express.json());
app.use(express.static("public"));
app.use(router);

const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.simple()
    ),
});

router.get('/health', async (request, response) => {
    logger.log({ level: 'info', message: 'GET /health. headers: ' + JSON.stringify(request.headers) });
    const controller = new HealthController(database);
    const controllerResp = await controller.getMessage();
    return response.send(controllerResp);
});

router.post('/employee', async (request, response) => {
    logger.log({ level: 'info', message: 'POST /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController(database);
    const controllerResp = controller.createEmployee(request.body)
    return response.send(controllerResp)
});

router.get('/employees', async (request, response) => {
    logger.log({ level: 'info', message: 'GET /employees. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController(database)
    const controllerResp = controller.fetchEmployees()
});

app.listen(PORT, () => {
    logger.log({ level: 'info', message: 'Server is running on port ' + PORT});
});
