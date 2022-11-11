const db = require("../db/db");
const { Model } = require("objection");

const { TABLE_ADDRESS, TABLE_USER } = require("../../config/constants");

Model.knex(db);

class AddressModel extends Model {
    static get tableName() {
        return TABLE_ADDRESS;
    }

    static get relationMappings() {
        const UserModel = require("./UserModel");
        return {
            address: {
                relation: Model.HasManyRelation,
                modelClass: UserModel,
                join: {
                    from: `${TABLE_USER}.id`,
                    to: `${TABLE_ADDRESS}.id_user`,
                },
            },
        };
    }
}

module.exports = AddressModel;
