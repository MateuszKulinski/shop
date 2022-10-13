const express = require("express");
const userActions = require("../src/actions/UserActions");

const router = express.Router();

router.delete("/api/user/:id", userActions.removeUser);
router.delete("/api/userAndAddress/:id", userActions.removeUserAndAddress);

router.get("/api/user/:id", userActions.getUser);
router.get("/api/user/all", userActions.getUsers); //tests
router.get("/api/user/allWithAddresses", userActions.getUsersWithAddresses); //tests

router.post("/api/user", userActions.createUser);

router.put("/api/user/:id", userActions.updateUser);

module.exports = router;
