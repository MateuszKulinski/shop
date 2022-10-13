const db = require("../db/db");
const { Model } = require("objection");

const { TABLE_ADDRESS } = require("../../constants");

Model.knex(db);

class AddressModel extends Model {
    static get tableName() {
        return TABLE_ADDRESS;
    }
}

module.exports = AddressModel;
