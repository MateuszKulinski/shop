const {
    TABLE_CATEGORY_PRODUCT,
    TABLE_CATEGORY,
    TABLE_PRODUCT,
} = require("../../../config/constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    knex.schema.dropTableIfExists(TABLE_CATEGORY_PRODUCT);
    return knex.schema.createTable(TABLE_CATEGORY_PRODUCT, (table) => {
        table.integer("id_product").unsigned().notNullable();
        table.foreign("id_product").references(`${TABLE_PRODUCT}.id`);

        table.integer("id_category").unsigned().notNullable();
        table.foreign("id_category").references(`${TABLE_CATEGORY}.id`);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists(TABLE_CATEGORY_PRODUCT);
};
