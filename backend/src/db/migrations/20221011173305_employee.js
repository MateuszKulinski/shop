const { TABLE_EMPLOYEE } = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.dropTableIfExists(TABLE_EMPLOYEE);
    return knex.schema.createTable(TABLE_EMPLOYEE, (table) => {
        table.increments("id").primary();
        table.string("firstname").notNullable();
        table.string("lastname").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.tinyint("entitlements").notNullable();

        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists(TABLE_EMPLOYEE);
};
