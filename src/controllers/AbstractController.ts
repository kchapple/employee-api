import Database from "../models/Database";

export default class AbstractController {

    database: Database;

    constructor(database: Database) {
        this.database = database
    }
}
