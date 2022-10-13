const AddressModel = require("../models/AddressModel");

class AddressService {
    async createAddress(address) {
        return await AddressModel.query().insert(address);
    }

    async getAddress(id) {
        return await AddressModel.query().findById(id);
    }

    async getUserAddresses(id) {
        return await AddressModel.query().findById(id);
    }

    async removeAddress(id) {
        return await AddressModel.query().findById(id).delete();
    }

    async removeUserAddress(id) {
        return await AddressModel.query().findById(id).delete();
    }

    async updateAddress(id, address) {
        return await AddressModel.query().update(address).where("id", id);
    }
}

module.exports = new AddressService();
