// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require("dotenv").config();
console.log(process.env.DB_HOST);
module.exports = {
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            tableName: "migrations",
            directory: "src/db/migrations",
        },
        seeds: {
            directory: "src/db/seeds",
        },
    },
};
