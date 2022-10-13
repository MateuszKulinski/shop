const db = require("../db/db");
const { Model } = require("objection");
const AddressModel = require("./AddressModel");
const { TABLE_USER, TABLE_ADDRESS } = require("../../constants");

Model.knex(db);

class UserModel extends Model {
    static get tableName() {
        return TABLE_USER;
    }

    static get relationMappings() {
        return {
            address: {
                relation: AddressModel.HasManyRelation,
                modelClass: AddressModel,
                join: {
                    from: `${TABLE_USER}.id`,
                    to: `${TABLE_ADDRESS}.id_user`,
                },
            },
        };
    }
}

module.exports = UserModel;
