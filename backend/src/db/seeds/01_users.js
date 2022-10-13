const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const Tools = require("../../models/Tools");
const {
    TABLE_USER,
    TABLE_ADDRESS,
    COUNT_USERS,
} = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async (knex) => {
    const userArray = [];
    // Deletes ALL existing entries
    await knex(TABLE_ADDRESS).del();
    await knex(TABLE_USER)
        .del()
        .then(() => {
            for (let i = 1; i <= COUNT_USERS; i++) {
                const id = i;
                const randomFirstName = faker.name.firstName();
                const randomLastName = faker.name.lastName();
                const randomEmail = faker.helpers.unique(faker.internet.email, [
                    randomFirstName,
                    randomLastName,
                ]);
                const randomBirthday = faker.date.birthdate();
                const randomPassword = bcrypt.hashSync(
                    Tools.generatePassword(),
                    8
                );

                const user = {
                    id,
                    firstname: randomFirstName,
                    lastname: randomLastName,
                    email: randomEmail,
                    birthday: randomBirthday,
                    password: randomPassword,
                };

                userArray.push(user);
            }
        });
    await knex(TABLE_USER).insert(userArray);
};
