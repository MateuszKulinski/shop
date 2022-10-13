const EmployeeModel = require("../models/EmployeeModel");

class EmployeeService {
    async createEmployee(employee) {
        return await EmployeeModel.query().insert(employee);
    }

    async getEmployee(id) {
        return await EmployeeModel.query().findById(id);
    }

    async getWorkers() {
        return await EmployeeModel.query();
    }

    async removeEmployee(id) {
        return await EmployeeModel.query().findById(id).delete();
    }

    async updateEmployee(id, employee) {
        return await EmployeeModel.query().update(employee).where("id", id);
    }
}

module.exports = new EmployeeService();
