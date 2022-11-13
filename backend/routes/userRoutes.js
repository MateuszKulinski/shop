const express = require("express");
const userActions = require("../src/actions/UserActions");
const UserService = require("../src/services/UserService");

const router = express.Router();
const password = require("passport");
const jwt = require("../config/jwt");

const ENDPOINT_NAME = "/user";

router.get(`${ENDPOINT_NAME}/all`, userActions.getUsers); //tests
router.get(
    `${ENDPOINT_NAME}/allWithAddresses`,
    userActions.getUsersWithAddresses
); //tests

router.post(`${ENDPOINT_NAME}/create`, userActions.register);
router.post(
    `${ENDPOINT_NAME}/login`,
    password.authenticate("local", { session: false }),
    userActions.login
);
router.post(`${ENDPOINT_NAME}/getUserData`, jwt.auth, userActions.getUser);

router.delete(`${ENDPOINT_NAME}/:id`, userActions.removeUser);
router.delete(
    `${ENDPOINT_NAME}AndAddress/:id`,
    userActions.removeUserAndAddress
);

router.get(`${ENDPOINT_NAME}/:id`, userActions.getUser);
router.put(`${ENDPOINT_NAME}/:id`, userActions.updateUser);

module.exports = router;
