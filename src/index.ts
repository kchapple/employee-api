import bodyParser from "body-parser";
import express, {Application, json} from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { createLogger, transports, format } from 'winston';
import {EmployeeController} from './controllers/EmployeeController';
import {HealthController} from './controllers/HealthController';
import {State} from './models/State';
import errorMiddleware from "./middleware/error.middleware";
import {StatsController} from "./controllers/StatsController";
import HttpException from "./exceptions/HttpException";

const PORT = process.env.PORT || 8000;
const app: Application = express();
const state = new State();

app.use(bodyParser.json());
//app.use(express.json());
app.use(express.static('public'));

// Construct the validator based on the spec from our schema dir
app.use(OpenApiValidator.middleware({
    apiSpec: './schema/kchapple-Employees-1.0.0-resolved.yaml'
}));

const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.simple()
    ),
});

app.get('/health', async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'GET /health. headers: ' + JSON.stringify(request.headers) });
    const controller = new HealthController(state);
    const controllerResp = await controller.getMessage();
    return response.send(controllerResp);
});

app.delete('/employee/:id', async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'DELETE /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController(state);
    const id = request.params.id;
    try {
        const controllerResp = await controller.delete(id);
        return response.send(controllerResp);
    } catch (error: any) {
        return response.send({
            status: 400,
            message: error.message
        });
    }
})

app.post('/employee', async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'POST /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController(state);
    try {
        const controllerResp = await controller.createEmployee(request.body);
        state.printEmployees(); // TODO remove
        return response.send(controllerResp);
    } catch (error: any) {
        return response.send({
            status: 400,
            message: error.message
        });
    }
});

app.get('/employees', async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'GET /employees. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController(state);
    const controllerResp = await controller.fetchEmployees();
});

app.get('/statistics/summary', async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'GET /statistics/summary. headers: ' + JSON.stringify(request.headers) });
    const controller = new StatsController(state);
    try {
        const controllerResp = await controller.getAllSummaryStatistics();
        return response.send(controllerResp);
    } catch (error: any) {
        return response.send({
            status: 400,
            message: error.message
        });
    }
});

// add the error handling middleware (add last or else other middlewares will be skipped)
app.use(errorMiddleware);

app.listen(PORT, () => {
    logger.log({ level: 'info', message: 'Server is running on port ' + PORT});
});
