const db = require("../db/db");
const { Model, snakeCaseMappers } = require("objection");

const {
    TABLE_CATEGORY,
    TABLE_CATEGORY_PRODUCT,
} = require("../../config/constants");

Model.knex(db);

class CategoryModel extends Model {
    static get tableName() {
        return TABLE_CATEGORY;
    }
    static get columnNameMappers() {
        return snakeCaseMappers({ upperCase: true });
    }

    static get relationMappings() {
        const CategoryProductModel = require("./CategoryProductModel");
        return {
            category_product: {
                relation: Model.HasManyRelation,
                modelClass: CategoryProductModel,
                join: {
                    from: `${TABLE_CATEGORY}.id`,
                    to: `${TABLE_CATEGORY_PRODUCT}.id_category`,
                },
            },
        };
    }
}

module.exports = CategoryModel;
