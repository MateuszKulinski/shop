const { TABLE_STATUS } = require("../../../config/constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.dropTableIfExists(TABLE_STATUS);
    return knex.schema.createTable(TABLE_STATUS, (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("color").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists(TABLE_STATUS);
};
