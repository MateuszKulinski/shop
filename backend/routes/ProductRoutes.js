const express = require("express");
const productActions = require("../src/actions/ProductActions");

const router = express.Router();

const ENDPOINT_NAME = "/product";

router.post(`${ENDPOINT_NAME}`, productActions.createProduct);

router.get(`${ENDPOINT_NAME}/:id`, productActions.getProduct);
router.get(
    `${ENDPOINT_NAME}/getRandomProducts/:count`,
    productActions.getRandomProduct
);
router.delete(`${ENDPOINT_NAME}/:id`, productActions.removeProduct);

router.put(`${ENDPOINT_NAME}/:id`, productActions.updateProduct);

module.exports = router;
