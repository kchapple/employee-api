import bodyParser from "body-parser";
import express, { Application } from 'express';
import { EmployeeController } from './controllers/EmployeeController';
import { ErrorHandler } from "./models/ErrorHandler";
import { HealthController } from './controllers/HealthController';
import { State } from './models/State';
import { StatsController } from "./controllers/StatsController";
const swaggerUi = require("swagger-ui-express");

import errorMiddleware from "./middleware/error.middleware";
import logger from './middleware/logger.middleware';
import validator from "./middleware/schemavalidator.middleware";
import swaggerDocument from "./middleware/documentation.middleware";

const app: Application = express();
const state = new State();
const errorHandler = new ErrorHandler();

// We define our auth middleware here, replace with a noop for jest testing
const { auth } = require('express-oauth2-jwt-bearer');
let jwtCheck;
if (process.env.JEST_WORKER_ID === undefined) {
    // Middleware to verify against the Auth0 JSON Web Key Set.
    jwtCheck = auth({
        audience: 'localhost:8000/',
        issuerBaseURL: 'https://dev-ekg7j3vm.us.auth0.com/',
    });
} else {
    jwtCheck = function (req:express.Request, res:express.Response, next:express.NextFunction) {
        next();
    };
}

app.use(
    "/documentation",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(validator);

app.get('/health', async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'GET /health. headers: ' + JSON.stringify(request.headers) });
    const controller = new HealthController(state);
    const controllerResp = await controller.getMessage();
    return response.send(controllerResp);
});

app.delete('/employee/:id', jwtCheck, async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'DELETE /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController(state);
    const id = request.params.id;
    try {
        const controllerResp = await controller.delete(id);
        return response.send(controllerResp);
    } catch (error: any) {
        const errResp = errorHandler.makeErrorResponse(error, response);
        return response.send(errResp);
    }
});

app.get('/employee/:id', jwtCheck, async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'GET /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController(state);
    const id = request.params.id;
    try {
        const controllerResp = await controller.findEmployeeById(id);
        return response.send(controllerResp);
    } catch (error: any) {
        const errResp = errorHandler.makeErrorResponse(error, response);
        return response.send(errResp);
    }
})

app.post('/employee', jwtCheck, async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'POST /employee. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController(state);
    try {
        const controllerResp = await controller.createEmployee(request.body);
        state.printEmployees(); // TODO remove
        return response.send(controllerResp);
    } catch (error: any) {
        const errResp = errorHandler.makeErrorResponse(error, response);
        return response.send(errResp);
    }
});

app.get('/employees', jwtCheck, async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'GET /employees. headers: ' + JSON.stringify(request.headers) });
    const controller = new EmployeeController(state);
    try {
        const controllerResp = await controller.fetchEmployees();
        response.send(controllerResp);
    } catch (error: any) {
        const errResp = errorHandler.makeErrorResponse(error, response);
        return response.send(errResp);
    }
});

app.get('/statistics/summary', jwtCheck, async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'GET /statistics/summary. headers: ' + JSON.stringify(request.headers) });
    const controller = new StatsController(state);
    try {
        const controllerResp = await controller.getAllSummaryStatistics();
        return response.send(controllerResp);
    } catch (error: any) {
        const errResp = errorHandler.makeErrorResponse(error, response);
        return response.send(errResp);
    }
});

app.get('/statistics/summaryForOnContract', jwtCheck, async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'GET /statistics/summary. headers: ' + JSON.stringify(request.headers) });
    const controller = new StatsController(state);
    try {
        const controllerResp = await controller.getSummaryStatisticsForOnContract();
        return response.send(controllerResp);
    } catch (error: any) {
        const errResp = errorHandler.makeErrorResponse(error, response);
        return response.send(errResp);
    }
});

app.get('/statistics/summaryForDepartments', jwtCheck, async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'GET /statistics/summaryForDepartments. headers: ' + JSON.stringify(request.headers) });
    const controller = new StatsController(state);
    try {
        const controllerResp = await controller.getSummaryStatisticsByDepartment();
        return response.send(controllerResp);
    } catch (error: any) {
        const errResp = errorHandler.makeErrorResponse(error, response);
        return response.send(errResp);
    }
});

app.get('/statistics/summaryForCombinations', jwtCheck, async (request: express.Request, response: express.Response) => {
    logger.log({ level: 'info', message: 'GET /statistics/summaryForCombinations. headers: ' + JSON.stringify(request.headers) });
    const controller = new StatsController(state);
    try {
        const controllerResp = await controller.getSummaryStatisticsByDeptAndSub();
        return response.send(controllerResp);
    } catch (error: any) {
        const errResp = errorHandler.makeErrorResponse(error, response);
        return response.send(errResp);
    }
});

// add the error handling middleware (add last or else other middlewares will be skipped)
app.use(errorMiddleware);

module.exports = { app, logger };
