const { TABLE_CART } = require("../../../config/constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(TABLE_CART).del();
};
