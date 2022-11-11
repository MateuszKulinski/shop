const db = require("../db/db");
const { Model } = require("objection");

const { TABLE_EMPLOYEE } = require("../../config/constants");

Model.knex(db);

class EmployeeModel extends Model {
    static get tableName() {
        return TABLE_EMPLOYEE;
    }
}

module.exports = EmployeeModel;
