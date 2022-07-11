import CalculatorException from '../exceptions/CalculatorException';
import express from 'express';
import { BaseErrorResponse } from './BaseErrorResponse';
import {ErrorResponse} from '../Api';

export class ErrorHandler
{
    public makeErrorResponse(error: any, response: express.Response) : ErrorResponse {
        let errorResponse;
        if (error instanceof CalculatorException) {
            response.statusCode = 400;
            errorResponse = new BaseErrorResponse(400, error.message);
        } else {
            response.statusCode = 500;
            errorResponse = new BaseErrorResponse(400, error.message);
        }
        return errorResponse;
    }
}
