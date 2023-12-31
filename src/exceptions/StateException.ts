import HttpException from "./HttpException";

class StateException extends HttpException {
    constructor(status: number, message: string) {
        super(status, message);
        this.message = 'State Error: ' + message;
    }
}

export default StateException;
