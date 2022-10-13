const ProductModel = require("../models/ProductModel");

class ProductService {
    async createProduct(product) {
        return await ProductModel.query().insert(product);
    }

    async getProduct(id) {
        return await ProductModel.query().findById(id);
    }

    async removeProduct(id) {
        return await ProductModel.query().findById(id).delete();
    }

    async updateProduct(id, product) {
        return await ProductModel.query().update(product).where("id", id);
    }
}

module.exports = new ProductService();
