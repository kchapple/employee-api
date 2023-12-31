"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    console.log('Error:' + message); // todo remove
    response
        .status(status)
        .send({
        status,
        message,
    });
}
exports.default = errorMiddleware;
