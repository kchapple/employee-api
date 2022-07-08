import express, {Application, json} from 'express';
import {OpenApiValidator} from 'express-openapi-validate';
import { createLogger, transports, format } from 'winston';
import EmployeeController from './controllers/EmployeeController';
import HealthController from './controllers/HealthController';
import State from './models/State';
import errorMiddleware from "./middleware/error.middleware";

const PORT = process.env.PORT || 8000;
const app: Application = express();
const router = express.Router();

const state = new State()

app.use(express.json());
app.use(express.static('public'));
app.use(router);

const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.simple()
    ),
});

// Load the validator and the spec
const fs = require('fs')
const jsYaml = require('js-yaml');
const openApiDocument = jsYaml.safeLoad(
    fs.readFileSync('./schema/kchapple-Employees-1.0.0-resolved.yaml', 'utf-8')
);

// Construct the validator with some basic options
const validator = new OpenApiValidator(openApiDocument,
    {
        ajvOptions: {
            allErrors: true,
            removeAdditional: "all",
        }
    }
);

router.get(
    '/health',
    validator.validate('get', '/health'),
    async (request: express.Request, response: express.Response) => {
        logger.log({ level: 'info', message: 'GET /health. headers: ' + JSON.stringify(request.headers) });
        const controller = new HealthController(state);
        const controllerResp = await controller.getMessage();
        return response.send(controllerResp);
});

router.delete('/employee/:id', async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'DELETE /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController(state);
    const id = request.params.id;
    const controllerResp = await controller.delete(id)
})

router.post('/employee', async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'POST /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController(state);
    const controllerResp = await controller.createEmployee(request.body);
    state.printEmployees(); // TODO remove
    return response.send(controllerResp);
});

router.get('/employees', async (request, responserequest: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'GET /employees. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController(state);
    const controllerResp = await controller.fetchEmployees();
});

// add the error handling middleware (add last or else other middlewares will be skipped)
app.use(errorMiddleware);

app.listen(PORT, () => {
    logger.log({ level: 'info', message: 'Server is running on port ' + PORT});
});
