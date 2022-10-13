const {
    TABLE_ORDER_HISTORY,
    TABLE_CART,
    TABLE_ORDER,
    TABLE_STATUS,
} = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.dropTableIfExists(TABLE_ORDER_HISTORY);
    return knex.schema.createTable(TABLE_ORDER_HISTORY, (table) => {
        table.increments("id").primary();

        table.integer("id_order").unsigned().notNullable();
        table.foreign("id_order").references(`${TABLE_ORDER}.id`);

        table.integer("id_status").unsigned().notNullable();
        table.foreign("id_status").references(`${TABLE_STATUS}id`);

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
