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

    async getCategoryChildrens(id) {
        const categories = await CategoryModel.query()
            .column("id")
            .where("id_parent", id);
        if (categories.length) {
            const categoriesArray = [];
            categories.forEach(async (category) => {
                const childId = await this.getCategoryChildrens(category.id);
                console.log("C" + childId);
                categoriesArray.push(childId);
            });
            console.log("ID" + id, "C2" + categoriesArray);
            return categoriesArray;
        } else {
            console.log("ID2" + id);
            return id;
        }
    }
}

module.exports = new CategoryService();
