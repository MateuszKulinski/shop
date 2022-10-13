const addressService = require("../services/AddressService");

class AddressActions {
    async createAddress(req, res) {
        try {
            const address = { ...req.body };
            const createResponse = await addressService.createAddress(address);
            res.status(201).json(createResponse);
        } catch (err) {
            console.warn(err);
            res.status(err.response.status).json({
                message: err.response.message,
            });
        }
    }

    async getAddress(req, res) {
        try {
            const id = req.params.id;
            const data = await addressService.getAddress(id);
            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(err.response.status).json({
                message: err.response.message,
            });
        }
    }

    async getUserAddress(req, res) {
        try {
            const userId = req.params.id;
            const createResponse = await addressService.getUserAddresses(
                userId
            );
            res.status(201).json(createResponse);
        } catch (err) {
            console.warn(err);
            res.status(err.response.status).json({
                message: err.response.message,
            });
        }
    }

    async removeAddress(req, res) {
        try {
            const id = req.params.id;
            await addressService.removeAddress(id);
            res.sendStatus(204);
        } catch (err) {
            console.warn(err);
            res.status(err.response.status).json({
                message: err.response.message,
            });
        }
    }

    async removeUserAddress(req, res) {
        try {
            const userId = req.params.id;
            await addressService.removeUserAddress(userId);
            res.sendStatus(204);
        } catch (err) {
            console.warn(err);
            res.status(err.response.status).json({
                message: err.response.message,
            });
        }
    }

    async updateAddress(req, res) {
        try {
            const id = req.params.id;
            const address = { ...req.body };
            const updateResponse = await addressService.updateAddress(
                id,
                address
            );
            res.status(201).json(updateResponse);
        } catch (err) {
            console.warn(err);
            res.status(err.response.status).json({
                message: err.response.message,
            });
        }
    }
}

module.exports = new AddressActions();
