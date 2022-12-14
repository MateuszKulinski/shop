const { TABLE_IMAGE, TABLE_PRODUCT } = require("../../../config/constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    knex.schema.dropTableIfExists(TABLE_IMAGE);
    return knex.schema.createTable(TABLE_IMAGE, (table) => {
        table.increments("id").primary();

        table.integer("id_product").unsigned().notNull();
        table.foreign("id_product").references(`${TABLE_PRODUCT}.id`);

        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists(TABLE_IMAGE);
};
