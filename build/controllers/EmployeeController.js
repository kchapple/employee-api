"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const AbstractController_1 = require("./AbstractController");
class EmployeeController extends AbstractController_1.AbstractController {
    createEmployee(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.state.addEmployee(body);
        });
    }
    findEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.state.findEmployeeById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.state.deleteEmployee(id);
        });
    }
    fetchEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.state.fetchEmployees();
        });
    }
}
exports.EmployeeController = EmployeeController;
