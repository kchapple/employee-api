import {AbstractController} from './AbstractController';

export class HealthController extends AbstractController {
    public async getMessage(): Promise<object> {
        return {
            message: 'I am Healthy'
        }
    }
}
