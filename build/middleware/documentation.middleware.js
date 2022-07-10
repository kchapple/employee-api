"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = require('yamljs');
const swaggerDocument = yaml.load('schema/kchapple-Employees-1.0.0-resolved.yaml');
exports.default = swaggerDocument;
