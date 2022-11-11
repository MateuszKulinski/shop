const db = require("../db/db");
const { Model } = require("objection");
const { TABLE_USER, TABLE_ADDRESS } = require("../../config/constants");

Model.knex(db);

class UserModel extends Model {
    static get tableName() {
        return TABLE_USER;
    }

    static get relationMappings() {
        const AddressModel = require("./AddressModel");
        return {
            address: {
                relation: Model.HasManyRelation,
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
