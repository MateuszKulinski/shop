const db = require("../db/db");
const { Model } = require("objection");
const AddressModel = require("./AddressModel");

const TABLE_NAME = "users";

Model.knex(db);

class UserModel extends Model {
    static get tableName() {
        return TABLE_NAME;
    }

    static get relationMappings() {
        return {
            address: {
                relation: AddressModel.HasManyRelation,
                modelClass: AddressModel,
                join: {
                    from: "users.id",
                    to: "address.id_user",
                },
            },
        };
    }
}

module.exports = UserModel;
