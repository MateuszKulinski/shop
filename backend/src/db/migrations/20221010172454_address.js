const { TABLE_ADDRESS, TABLE_USER } = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    knex.schema.dropTableIfExists(TABLE_ADDRESS);
    return knex.schema.createTable(TABLE_ADDRESS, (table) => {
        table.increments("id").primary();
        table.string("city").notNull();
        table.string("postcode").notNull();
        table.string("street").notNull();
        table.string("number").notNull();

        table.integer("id_user").unsigned().notNullable();
        table.foreign("id_user").references(`${TABLE_USER}.id`);

        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists(TABLE_ADDRESS);
};
