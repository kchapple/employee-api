import CalculatorException from '../exceptions/CalculatorException';
import express from 'express';
import { BaseErrorResponse } from './BaseErrorResponse';
import { ErrorResponse } from '../Api';

export class ErrorHandler
{
    /**
     * Given an error/exception (subclass of Error object) and the response, create
     * an ErrorResponse to send to the client, and set status code on the express response.
     *
     * @param error
     * @param response
     */
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
