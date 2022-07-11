import * as OpenApiValidator from 'express-openapi-validator';

// Construct the validator based on the spec from our schema dir
const validator = OpenApiValidator.middleware({
    apiSpec: 'schema/kchapple-Employees-1.0.0-resolved.yaml',
    validateResponses: true
});

export default validator;
