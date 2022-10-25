const categoryProductService = require("../services/CategoryProductService");
const productService = require("../services/ProductService");

class ProductActions {
    async createProduct(req, res) {
        try {
            const product = { ...req.body };
            const createResponse = await productService.createProduct(product);
            res.status(201).json({
                status: 201,
                data: createResponse,
            });
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }

    async getProduct(req, res) {
        try {
            const id = req.params.id;
            const data = await productService.getProduct(id);
            res.status(200).json({
                status: 200,
                data: data,
            });
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }

    async getRandomProduct(req, res) {
        try {
            const count = req.params.count;
            const data = await productService.getRandomProduct(count);
            res.status(200).json({
                status: 200,
                data: data,
            });
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }

    async removeProduct(req, res) {
        try {
            const id = req.params.id;
            await categoryProductService.removeByProduct(id);
            await productService.removeProduct(id);
            res.sendStatus(204);
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({ message: err.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const product = { ...req.body };
            const updateProduct = await productService.updateProduct(
                id,
                product
            );
            res.status(201).json(updateProduct);
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }
}

module.exports = new ProductActions();
