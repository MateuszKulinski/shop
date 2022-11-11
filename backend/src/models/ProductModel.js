const db = require("../db/db");
const { Model } = require("objection");
const {
    TABLE_PRODUCT,
    TABLE_CATEGORY_PRODUCT,
} = require("../../config/constants");

Model.knex(db);

class ProductModel extends Model {
    static get tableName() {
        return TABLE_PRODUCT;
    }

    static get relationMappings() {
        const CategoryProductModel = require("./CategoryProductModel");
        return {
            category_product: {
                relation: Model.BelongsToOneRelation,
                modelClass: CategoryProductModel,
                join: {
                    from: `${TABLE_PRODUCT}.id`,
                    to: `${TABLE_CATEGORY_PRODUCT}.id_product`,
                },
            },
        };
    }
}

module.exports = ProductModel;
