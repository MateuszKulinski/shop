const { faker } = require("@faker-js/faker");
const Tools = require("../../models/Tools");
const {
    TABLE_PRODUCT,
    COUNT_PRODUCT,
    TABLE_CATEGORY_PRODUCT,
} = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
    const productArray = [];
    // Deletes ALL existing entries
    await knex(TABLE_CATEGORY_PRODUCT).del();
    await knex(TABLE_PRODUCT)
        .del()
        .then(() => {
            for (let i = 1; i <= COUNT_PRODUCT; i++) {
                const id = i;
                const name = faker.commerce.productName();
                const description = faker.commerce.productDescription();
                const price = faker.commerce.price(1, 500);
                const index = Tools.makeIndex(8);

                const product = {
                    id,
                    name,
                    description,
                    price,
                    index,
                };
                productArray.push(product);
            }
        });
    await knex(TABLE_PRODUCT).insert(productArray);
};
