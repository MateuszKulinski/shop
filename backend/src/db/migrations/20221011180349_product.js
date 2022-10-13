const { TABLE_PRODUCT } = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.dropTableIfExists(TABLE_PRODUCT);
    return knex.schema.createTable(TABLE_PRODUCT, (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("index").notNullable();
        table.double("price").notNullable();
        table.text("description");

        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists(TABLE_PRODUCT);
};
