const express = require("express");
const employeeActions = require("../src/actions/EmployeeActions");

const router = express.Router();

const ENDPOINT_NAME = "/employee";

router.post(`${ENDPOINT_NAME}`, employeeActions.createEmployee);

router.delete(`${ENDPOINT_NAME}/:id`, employeeActions.removeEmployee);

router.get(`${ENDPOINT_NAME}/all`, employeeActions.getWorkers);
router.get(`${ENDPOINT_NAME}/:id`, employeeActions.getEmployee);

router.put(`${ENDPOINT_NAME}/:id`, employeeActions.updateEmployee);

module.exports = router;
