const {
    TABLE_CATEGORY_PRODUCT,
    COUNT_PRODUCT,
    COUNT_CATEGORIES,
} = require("../../../constants");
const Tools = require("../../models/Tools");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    const categoryProductArray = [];
    // Deletes ALL existing entries
    await knex(TABLE_CATEGORY_PRODUCT)
        .del()
        .then(() => {
            for (
                let id_product = 1;
                id_product <= COUNT_PRODUCT;
                id_product++
            ) {
                const id_category = Tools.getId(COUNT_CATEGORIES);
                const category_product = {
                    id_product,
                    id_category,
                };
                categoryProductArray.push(category_product);
            }
        });
    await knex(TABLE_CATEGORY_PRODUCT).insert(categoryProductArray);
};
