const CategoryProductModel = require("../models/CategoryProductModel");

class CategoryProductService {
    async removeByCategory(id) {
        return await CategoryProductModel.query()
            .delete()
            .where("id_category", id);
    }
    async removeByProduct(id) {
        return await CategoryProductModel.query()
            .delete()
            .where("id_product", id);
    }
}

module.exports = new CategoryProductService();
