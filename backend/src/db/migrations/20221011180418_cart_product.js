const {
    TABLE_CART_PRODUCT,
    TABLE_CART,
    TABLE_PRODUCT,
} = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.dropTableIfExists(TABLE_CART_PRODUCT);
    return knex.schema.createTable(TABLE_CART_PRODUCT, (table) => {
        table.increments("id").primary();
        table.double("price").notNullable();

        table.integer("id_cart").unsigned().notNullable();
        table.foreign("id_cart").references(`${TABLE_CART}.id`);

        table.integer("id_product").unsigned().notNullable();
        table.foreign("id_product").references(`${TABLE_PRODUCT}.id`);

        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists(TABLE_CART_PRODUCT);
};
