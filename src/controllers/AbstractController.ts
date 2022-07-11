import {State} from '../models/State';

export class AbstractController {

    readonly _state: State;

    get state() {
        return this._state
    }

    constructor(state: State) {
        this._state = state
    }
}
