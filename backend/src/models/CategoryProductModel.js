const db = require("../db/db");
const { Model } = require("objection");
const CategoryModel = require("./CategoryModel");
const ProductModel = require("./ProductModel");
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
        return {
            category: {
                relation: CategoryModel.HasManyRelation,
                modelClass: CategoryModel,
                join: {
                    from: `${TABLE_CATEGORY}.id`,
                    to: `${TABLE_CATEGORY_PRODUCT}.id_category`,
                },
            },
            product: {
                relation: ProductModel.HasManyRelation,
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
