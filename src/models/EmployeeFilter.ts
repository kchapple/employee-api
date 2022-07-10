export class EmployeeFilter
{
    private readonly _onContract : boolean;

    constructor(onContract: boolean = false) {
        this._onContract = onContract;
    }

    get onContract(): boolean {
        return this._onContract;
    }
}
