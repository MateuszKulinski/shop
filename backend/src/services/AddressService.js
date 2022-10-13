const AddressModel = require("../models/AddressModel");

class AddressService {
    async createAddress(address) {
        return await AddressModel.query().insert(address);
    }

    async getAddress(id) {
        return await AddressModel.query().findById(id);
    }

    async getUserAddresses(userId) {
        return await AddressModel.query().where("id_user", userId);
    }

    async removeAddress(id) {
        return await AddressModel.query().findById(id).delete();
    }

    async removeUserAddress(userId) {
        return await AddressModel.query().where("id_user", userId).delete();
    }

    async updateAddress(id, address) {
        return await AddressModel.query().update(address).where("id", id);
    }
}

module.exports = new AddressService();
