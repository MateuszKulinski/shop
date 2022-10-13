const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const Tools = require("../../models/Tools");
const { TABLE_EMPLOYEE } = require("../../../constants");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async (knex) => {
    const employeeArray = [];
    // Deletes ALL existing entries
    await knex(TABLE_EMPLOYEE)
        .del()
        .then(() => {
            for (let i = 1; i <= 8; i++) {
                const id = i;
                const randomFirstName = faker.name.firstName();
                const randomLastName = faker.name.lastName();
                const randomEmail = faker.helpers.unique(faker.internet.email, [
                    randomFirstName,
                    randomLastName,
                ]);
                const randomPassword = bcrypt.hashSync(
                    Tools.generatePassword(),
                    8
                );
                const randomEntitlements = Tools.getRandomEntitlements();

                const employee = {
                    id,
                    firstname: randomFirstName,
                    lastname: randomLastName,
                    email: randomEmail,
                    password: randomPassword,
                    entitlements: randomEntitlements,
                };

                employeeArray.push(employee);
            }
        });
    await knex(TABLE_EMPLOYEE).insert(employeeArray);
};
