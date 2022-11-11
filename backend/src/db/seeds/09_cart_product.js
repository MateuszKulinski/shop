const { TABLE_CART_PRODUCT } = require("../../../config/constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(TABLE_CART_PRODUCT).del();
};
