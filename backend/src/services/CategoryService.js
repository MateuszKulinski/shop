const CategoryModel = require("../models/CategoryModel");
const CategoryProductModel = require("../models/CategoryProductModel");
const ProductModel = require("../models/ProductModel");

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
            const arrayId = [parseInt(id)];
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
            return parseInt(id);
        }
    }

    async getPageCount(id, productCount) {
        const quantity = await ProductModel.query()
            .joinRelated("category_product")
            .whereIn("id_category", id)
            .count("* as count");

        return Math.ceil(quantity[0].count / productCount);
    }

    async getPageProductCount(id) {
        const quantity = await ProductModel.query()
            .joinRelated("category_product")
            .whereIn("id_category", id)
            .count("* as count");

        return quantity[0].count;
    }
}

module.exports = new CategoryService();
