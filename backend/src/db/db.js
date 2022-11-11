const knex = require("knex");
const knexfile = require("../../config/knexfile");

const db = knex(knexfile.development);
module.exports = db;
