const CategoryModel = require("../models/CategoryModel");
const { checkColumns } = require("../models/Tools");
const categoryProductService = require("../services/CategoryProductService");
const categoryService = require("../services/CategoryService");
const productService = require("../services/ProductService");

class CategoryActions {
    async createCategory(req, res) {
        try {
            const category = { ...req.body };
            const createResponse = categoryService.createCategory(category);
            res.status(201).json(createResponse);
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }

    async getCategory(req, res) {
        try {
            const id = req.params.id;
            const data = await categoryService.getCategory(id);
            res.status(200).json(data);
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }

    async getMainCategories(req, res) {
        try {
            const orderBy = req.params.orderBy || "id";
            if (await checkColumns(CategoryModel, orderBy)) {
                const data = await categoryService.getMainCategories(orderBy);
                res.status(200).json(data);
            } else {
                throw new Error("order by incorrected");
            }
        } catch (err) {
            console.warn(err);
            res.status(500).json({
                message: err.message,
            });
        }
    }

    async getProducts(req, res) {
        try {
            const id = parseInt(req.params.id);
            const categories = await categoryService.getCategoryChildrens(id);

            const products = await productService.getCategoryProduct(
                categories
            );

            res.status(200).json(products);
        } catch (err) {
            console.warn(err);
            res.status(400).json({
                message: err.message,
            });
        }
    }

    async removeCategory(req, res) {
        try {
            const id = req.params.id;
            await categoryProductService.removeByCategory(id);
            await categoryService.removeCategory(id);
            res.sendStatus(204);
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }

    async updateCategory(req, res) {
        try {
            const id = req.params.id;
            const category = { ...req.body };
            const updateResponse = await categoryService.updateCategory(
                id,
                category
            );
            res.status(201).json(updateResponse);
        } catch (err) {
            console.warn(err);
            res.status(err.status).json({
                message: err.message,
            });
        }
    }
}

module.exports = new CategoryActions();
