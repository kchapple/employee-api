"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { auth } = require('express-oauth2-jwt-bearer');
let jwtCheck;
if (process.env.JEST_WORKER_ID !== undefined) {
    // Middleware to verify against the Auth0 JSON Web Key Set.
    jwtCheck = auth({
        audience: 'localhost:8000/',
        issuerBaseURL: 'https://dev-ekg7j3vm.us.auth0.com/',
    });
}
else {
    jwtCheck = function (req, res, next) {
        next();
    };
}
exports.default = jwtCheck;
