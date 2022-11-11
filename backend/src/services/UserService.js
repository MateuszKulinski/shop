const UserModel = require("../models/UserModel");
const AddressService = require("./AddressService");

class UserService {
    async createUser(user) {
        return await UserModel.query().insert(user);
    }

    async getUser(id) {
        return await UserModel.query().findById(id);
    }

    async getUserByEmail(email) {
        return await UserModel.query().where("email", email);
    }

    async getUsers() {
        return await UserModel.query();
    }

    async getUsersWithAddresses() {
        return await UserModel.query().withGraphFetched("address");
    }

    async removeUser(id) {
        return await UserModel.query().findById(id).delete();
    }

    async removeUserAndAddress(id) {
        AddressService.removeUserAddress(id);
        return this.removeUser(id);
    }

    async updateUser(id, user) {
        return await UserModel.query().update(user).where("id", id);
    }
}

module.exports = new UserService();
