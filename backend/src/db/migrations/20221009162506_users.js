const { TABLE_USER } = require("../../../config/constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema.createTable(TABLE_USER, (table) => {
        table.increments("id").primary();
        table.string("firstname").notNull();
        table.string("lastname").notNull();
        table.string("email").unique().notNull();
        table.string("password").notNull();
        table.timestamp("birthday");
        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists(TABLE_USER);
};
