const { TABLE_CATEGORY } = require("../../../config/constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.dropTableIfExists(TABLE_CATEGORY);
    return knex.schema.createTable(TABLE_CATEGORY, (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.text("description");
        table.integer("img");
        table.integer("id_parent").notNullable();
        table.tinyint("level");

        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists(TABLE_CATEGORY);
};
