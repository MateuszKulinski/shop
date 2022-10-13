const { faker } = require("@faker-js/faker");
const Tools = require("../../models/Tools");
const UserModel = require("../../models/UserModel");
const { TABLE_ADDRESS } = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
    const addressArray = [];
    const users = await UserModel.query();
    let id = 0;

    await knex(TABLE_ADDRESS)
        .del()
        .then(() => {
            users.forEach((user) => {
                const countOfAddresses = Tools.getRandom(100);
                for (let i = 0; i < countOfAddresses; i++) {
                    const address = {
                        id: ++id,
                        city: faker.address.city(),
                        postcode: faker.address.zipCode(),
                        street: faker.address.street(),
                        number: faker.address.buildingNumber(),
                        id_user: user.id,
                    };
                    addressArray.push(address);
                }
            });
        });
    await knex(TABLE_ADDRESS).insert(addressArray);
};
