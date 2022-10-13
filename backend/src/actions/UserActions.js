const userService = require("../services/UserService");

class UserActions {
    async createUser(req, res) {
        try {
            const user = { ...req.body };
            const createResponse = await userService.createUser(user);
            res.status(201).json(createResponse);
        } catch (err) {
            console.warn(err);
            res.status(err.response.status).json({
                message: err.response.message,
            });
        }
    }

    async getUser(req, res) {
        try {
            const id = req.params.id;
            const data = await userService.getUser(id);
            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(err.response.status).json({
                message: err.response.message,
            });
        }
    }

    async getUsers(req, res) {
        try {
            const data = await userService.getUsers();
            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(err.response.status).json({
                message: err.response.message,
            });
        }
    }

    async getUsersWithAddresses(req, res) {
        try {
            const data = await userService.getUsersWithAddresses();
            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(err.response.status).json({
                message: err.response.message,
            });
        }
    }

    async removeUser(req, res) {
        try {
            const id = req.params.id;
            await userService.removeUser(id);
            res.sendStatus(204);
        } catch (err) {
            if (err.client === "mysql") {
                res.status(500).json({ message: err.message });
            } else {
                res.status(500).json({ message: message.response.message });
            }
        }
    }

    async removeUserAndAddress(req, res) {
        try {
            const id = req.params.id;
            await userService.removeUserAndAddress(id);
            res.sendStatus(204);
        } catch (err) {
            res.status(err.response.status).json({
                message: err.response.message,
            });
        }
    }

    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const user = { ...req.body };
            const updateResponse = await userService.updateUser(id, user);
            res.status(201).json(updateResponse);
        } catch (err) {
            console.warn(err);
            res.status(err.response.status).json({
                message: err.response.message,
            });
        }
    }
}

module.exports = new UserActions();
