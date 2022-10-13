const db = require("../db/db");
const { Model } = require("objection");

const TABLE_NAME = "address";

Model.knex(db);

class AddressModel extends Model {
    static get tableName() {
        return TABLE_NAME;
    }
}

module.exports = AddressModel;
