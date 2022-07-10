import { ErrorResponse } from "../Api";

export class BaseErrorResponse implements ErrorResponse
{
    status: number;
    message: string;

    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}
