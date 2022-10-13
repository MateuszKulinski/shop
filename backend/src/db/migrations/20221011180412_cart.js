const { TABLE_CART } = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.dropTableIfExists(TABLE_CART);
    return knex.schema.createTable(TABLE_CART, (table) => {
        table.increments("id").primary();

        table.integer("id_user").unsigned().notNullable();
        table.foreign("id_user").references("users.id");

        table.integer("id_address").unsigned().notNullable();
        table.foreign("id_address").references("address.id");

        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists(TABLE_CART);
};
