const userService = require("../services/UserService");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/hiddenConfig");
const { EXPIRES_IN } = require("../../config/config");

class UserActions {
    async register(req, res) {
        try {
            const user = { ...req.body };
            user.password = crypto
                .pbkdf2Sync(user.password, "", 1000, 64, "sha512")
                .toString("hex");

            const createResponse = await userService.createUser(user);
            res.status(201).json(createResponse);
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }

    async login(req, res) {
        const user = req.user;
        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: EXPIRES_IN,
        });
        res.status(200).json(token);
    }

    async getUser(req, res) {
        try {
            let data = req.user;
            if (!req.user) {
                const id = req.params.id;
                data = await userService.getUser(id);
            }
            res.status(200).json(data);
        } catch (err) {
            console.warn(err);
            res.status(500).json({
                message: err.message,
            });
        }
    }

    async getUsers(req, res) {
        try {
            const data = await userService.getUsers();
            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }

    async getUsersWithAddresses(req, res) {
        try {
            const data = await userService.getUsersWithAddresses();
            res.status(200).json(data);
        } catch (err) {
            console.warn(err);
            res.status(500).json({
                message: err.message,
            });
        }
    }

    async removeUser(req, res) {
        try {
            const id = req.params.id;
            await userService.removeUser(id);
            res.sendStatus(204);
        } catch (err) {
            console.warn(err);
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
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
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
            res.status(err.status).json({
                message: err.message,
            });
        }
    }
}

module.exports = new UserActions();
