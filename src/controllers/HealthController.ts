import {HealthResponseInterface} from "../interfaces/HealthResponseInterface";
import AbstractController from "./AbstractController";

export default class HealthController extends AbstractController {
    public async getMessage(): Promise<HealthResponseInterface> {
        return {
            message: "Healthy"
        }
    }
}
