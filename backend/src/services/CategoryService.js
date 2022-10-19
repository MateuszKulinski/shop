const CategoryModel = require("../models/CategoryModel");

class CategoryService {
    async createCategory(category) {
        return await CategoryModel.query().insert(category);
    }

    async getCategory(id) {
        return await CategoryModel.query().findById(id);
    }

    async getMainCategories(orderBy) {
        return await CategoryModel.query().where("level", 1).orderBy(orderBy);
    }

    async removeCategory(id) {
        return await CategoryModel.query().findById(id).delete();
    }

    async updateCategory(id, category) {
        return await CategoryModel.query().update(category).where("id", id);
    }
}

module.exports = new CategoryService();
