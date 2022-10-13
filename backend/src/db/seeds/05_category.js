const { faker } = require("@faker-js/faker");
const Tools = require("../../models/Tools");
const { TABLE_CATEGORY, COUNT_CATEGORIES } = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
    const categoryArray = [];
    // Deletes ALL existing entries
    await knex(TABLE_CATEGORY)
        .del()
        .then(() => {
            for (let i = 1; i <= COUNT_CATEGORIES; i++) {
                const id = i;
                const name = faker.commerce.department();
                const description = faker.lorem.lines(2);
                const img = Tools.getId(100000000);
                let id_parent = 0;
                let level = 1;
                if (i > 5) {
                    id_parent = generateParent(categoryArray);
                    level = categoryArray[id_parent].level + 1;
                }

                const category = {
                    id,
                    name,
                    description,
                    img,
                    id_parent,
                    level,
                };
                categoryArray.push(category);
            }
        });
    await knex(TABLE_CATEGORY).insert(categoryArray);
};

function generateParent(categoryArray) {
    return Tools.getId(categoryArray.length - 1);
}
