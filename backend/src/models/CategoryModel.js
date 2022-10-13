const db = require("../db/db");
const { Model } = require("objection");

const { TABLE_CATEGORY } = require("../../constants");

Model.knex(db);

class CategoryModel extends Model {
    static get tableName() {
        return TABLE_CATEGORY;
    }
}

module.exports = CategoryModel;
