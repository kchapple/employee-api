class StateException extends Error {
    message: string;
    constructor(message: string) {
        super(message);
        this.message = "State Error: " + message;
    }
}

export default StateException;
