const { TABLE_ORDER, TABLE_CART } = require("../../../config/constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.dropTableIfExists(TABLE_ORDER);
    return knex.schema.createTable(TABLE_ORDER, (table) => {
        table.increments("id").primary();

        table.integer("id_cart").unsigned().notNullable();
        table.foreign("id_cart").references(`${TABLE_CART}.id`);

        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists(TABLE_ORDER);
};
