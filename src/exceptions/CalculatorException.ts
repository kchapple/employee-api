class CalculatorException extends Error {
    message: string;
    constructor(message: string) {
        super(message);
        this.message = 'Calculator Error: ' + message;
    }
}

export default CalculatorException;
