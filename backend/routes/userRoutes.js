const express = require("express");
const userActions = require("../src/actions/UserActions");

const router = express.Router();

const ENDPOINT_NAME = "/user";

router.get(`${ENDPOINT_NAME}/all`, userActions.getUsers); //tests
router.get(
    `${ENDPOINT_NAME}/allWithAddresses`,
    userActions.getUsersWithAddresses
); //tests

router.post(`${ENDPOINT_NAME}/create`, userActions.createUser);

router.delete(`${ENDPOINT_NAME}/:id`, userActions.removeUser);
router.delete(
    `${ENDPOINT_NAME}AndAddress/:id`,
    userActions.removeUserAndAddress
);

router.get(`${ENDPOINT_NAME}/:id`, userActions.getUser);
router.put(`${ENDPOINT_NAME}/:id`, userActions.updateUser);

module.exports = router;
