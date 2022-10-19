const db = require("../db/db");
const { Model, snakeCaseMappers } = require("objection");

const { TABLE_CATEGORY } = require("../../constants");

Model.knex(db);

class CategoryModel extends Model {
    static get tableName() {
        return TABLE_CATEGORY;
    }
    static get columnNameMappers() {
        return snakeCaseMappers({ upperCase: true });
    }
}

module.exports = CategoryModel;
