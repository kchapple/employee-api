import HttpException from "./HttpException";

class StatsException extends HttpException {
    constructor(status: number, message: string) {
        super(status, message);
        this.message = 'Stats Error: ' + message;
    }
}

export default StatsException;
