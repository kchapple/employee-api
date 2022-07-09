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
exports.StatsController = void 0;
const AbstractController_1 = require("./AbstractController");
const Calculator_1 = require("../models/Calculator");
class StatsController extends AbstractController_1.AbstractController {
    getAllSummaryStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.state.fetchEmployees();
            const calculator = new Calculator_1.Calculator(employees);
            return calculator.calculate();
        });
    }
}
exports.StatsController = StatsController;
