const { json } = require("express");
const employeeService = require("../services/EmployeeService");

class EmployeeActions {
    async createEmployee(req, res) {
        try {
            const employee = { ...req.body };
            const createEmployee = await employeeService.createEmployee(
                employee
            );
            res.status(201).json(createEmployee);
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }

    async getEmployee(req, res) {
        try {
            const id = req.params.id;
            const data = await employeeService.getEmployee(id);
            res.status(200).json(data);
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }

    async getWorkers(req, res) {
        try {
            const data = await employeeService.getWorkers();
            res.status(200).json(data);
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({ message: err.message });
        }
    }

    async removeEmployee(req, res) {
        try {
            const id = req.params.id;
            await employeeService.removeEmployee(id);
            res.sendStatus(204);
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }

    async updateEmployee(req, res) {
        try {
            const id = req.params.id;
            console.log(id);
            const employee = { ...req.body };
            console.log(employee);
            const updateEmployee = await employeeService.updateEmployee(
                id,
                employee
            );
            res.status(201).json(updateEmployee);
        } catch (err) {
            console.warn(err);
            res.status(500).json({
                message: err.message,
            });
        }
    }
}

module.exports = new EmployeeActions();
