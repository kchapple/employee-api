import {AbstractController} from "./AbstractController";
import {HealthResponseInterface} from "../interfaces/HealthResponseInterface";

export default class HealthController extends AbstractController {
    public async getMessage(): Promise<HealthResponseInterface> {
        return {
            message: "Healthy"
        }
    }
}
