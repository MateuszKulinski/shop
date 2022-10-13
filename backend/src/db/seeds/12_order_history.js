const { TABLE_ORDER_HISTORY } = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(TABLE_ORDER_HISTORY).del();
};
