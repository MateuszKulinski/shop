const { TABLE_ORDER_HISTORY } = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.dropTableIfExists(TABLE_ORDER_HISTORY);
    return knex.schema.createTable(TABLE_ORDER_HISTORY, (table) => {
        table.increments("id").primary();

        table.integer("id_order").unsigned().notNullable();
        table.foreign("id_order").references("order.id");

        table.integer("id_status").unsigned().notNullable();
        table.foreign("id_status").references("order_history.id");

        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists(TABLE_ORDER_HISTORY);
};
