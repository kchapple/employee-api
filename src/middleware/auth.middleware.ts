const { auth } = require('express-oauth2-jwt-bearer');

// Middleware to verify against the Auth0 JSON Web Key Set.
const jwtCheck = auth({
    audience: 'localhost:8000/',
    issuerBaseURL: 'https://dev-ekg7j3vm.us.auth0.com/',
});

export default jwtCheck;
