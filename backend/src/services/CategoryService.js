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
            const arrayId = [id];
            await Promise.all(
                categories.map(async (item) => {
                    const childId = await this.getCategoryChildrens(
                        parseInt(item.id)
                    );
                    arrayId.push(childId);
                })
            );
            return arrayId.flat();
        } else {
            return id;
        }
    }
}

module.exports = new CategoryService();
