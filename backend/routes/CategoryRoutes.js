const express = require("express");
const categoryActions = require("../src/actions/CategoryActions");

const router = express.Router();

const ENDPOINT_NAME = "/category";

router.post(`${ENDPOINT_NAME}`, categoryActions.createCategory);

router.get(`${ENDPOINT_NAME}/:id`, categoryActions.getCategory);

router.delete(`${ENDPOINT_NAME}/:id`, categoryActions.removeCategory);

router.put(`${ENDPOINT_NAME}/:id`, categoryActions.updateCategory);

module.exports = router;
