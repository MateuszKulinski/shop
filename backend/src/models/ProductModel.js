const db = require("../db/db");
const { Model } = require("objection");
const { TABLE_PRODUCT } = require("../../constants");

Model.knex(db);

class ProductModel extends Model {
    static get tableName() {
        return TABLE_PRODUCT;
    }
}

module.exports = ProductModel;
