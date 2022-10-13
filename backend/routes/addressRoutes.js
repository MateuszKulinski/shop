const express = require("express");
const addressActions = require("../src/actions/AddressActions");

const router = express.Router();

router.delete("/api/address/:id", addressActions.removeAddress);
router.delete("/api/addressUser/:id", addressActions.removeUserAddress);

router.get("/api/address/:id", addressActions.getAddress);
router.get("/api/addressUser/:id", addressActions.getUserAddress);

router.post("/api/address", addressActions.createAddress);

router.put("/api/address/:id", addressActions.updateAddress);

module.exports = router;
