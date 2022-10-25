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

    async getRandomProduct(count) {
        const productsIds = await ProductModel.query().column("id");
        const productsIdsArray = [];
        productsIds.forEach((e) => productsIdsArray.push(e.id));
        const choiceIds = [];
        for (let i = 0; i < count; i++) {
            const id = Math.floor(Math.random() * productsIdsArray.length - 1);
            choiceIds.push(productsIdsArray[id]);
            productsIdsArray.slice(productsIds[id], 1);
        }
        if (choiceIds) {
            const choceProducts = await ProductModel.query().whereIn(
                "id",
                choiceIds
            );

            return choceProducts;
        } else {
            throw new Error("products empty");
        }
    }
}

module.exports = new ProductService();
