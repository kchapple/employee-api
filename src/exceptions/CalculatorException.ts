import HttpException from "./HttpException";

class CalculatorException extends HttpException {
    constructor(status: number, message: string) {
        super(status, message);
        this.message = 'Calculator Error: ' + message;
    }
}

export default CalculatorException;
