const db = require("../db/db");
const { Model } = require("objection");
const {
    TABLE_CATEGORY,
    TABLE_PRODUCT,
    TABLE_CATEGORY_PRODUCT,
} = require("../../constants");

Model.knex(db);

class CategoryProductModel extends Model {
    static get tableName() {
        return TABLE_CATEGORY_PRODUCT;
    }

    static get relationMappings() {
        const CategoryModel = require("./CategoryModel");
        const ProductModel = require("./ProductModel");
        return {
            category: {
                relation: Model.HasManyRelation,
                modelClass: CategoryModel,
                join: {
                    from: `${TABLE_CATEGORY}.id`,
                    to: `${TABLE_CATEGORY_PRODUCT}.id_category`,
                },
            },
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: ProductModel,
                join: {
                    from: `${TABLE_PRODUCT}.id`,
                    to: `${TABLE_CATEGORY_PRODUCT}.id_product`,
                },
            },
        };
    }
}

module.exports = CategoryProductModel;
