const express = require("express");
const addressActions = require("../src/actions/AddressActions");

const router = express.Router();

const ENDPOINT_NAME = "/address";

router.post(`${ENDPOINT_NAME}`, addressActions.createAddress);

router.delete(`${ENDPOINT_NAME}/:id`, addressActions.removeAddress);
router.delete(`${ENDPOINT_NAME}User/:id`, addressActions.removeUserAddress);

router.get(`${ENDPOINT_NAME}/:id`, addressActions.getAddress);
router.get(`${ENDPOINT_NAME}User/:id`, addressActions.getUserAddress);

router.put(`${ENDPOINT_NAME}/:id`, addressActions.updateAddress);

module.exports = router;
