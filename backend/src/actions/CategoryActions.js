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

    async getPageCount(req, res) {
        try {
            const { id, productCount } = req.params;

            if (id && productCount) {
                const categories = await categoryService.getCategoryChildrens(
                    id
                );

                const data = await categoryService.getPageCount(
                    categories,
                    productCount
                );

                res.status(200).json({ pageCount: data });
            } else {
                res.status(400).json({
                    message: "invalid parameters",
                });
            }
        } catch (err) {
            console.warn(err);
            res.status(400).json({
                message: err.message,
            });
        }
    }

    async getPageProduct(req, res) {
        try {
            const { id, productCountPerPage } = req.params;
            const page = parseInt(req.params.page);
            const skip = (page - 1) * productCountPerPage;

            let categories = await categoryService.getCategoryChildrens(id);

            if (!categories.length) {
                categories = [categories];
            }

            const products = productService.getCategoryProduct(
                categories,
                productCountPerPage,
                skip
            );

            const count = categoryService.getPageProductCount(categories);

            const [items, productCount] = await Promise.all([products, count]);
            const pageCount = Math.ceil(productCount / productCountPerPage);

            res.status(200).json({
                pagination: {
                    pageCount,
                    count: productCount,
                    page,
                },
                items,
            });
        } catch (err) {
            console.warn(err);
            res.status(400).json({
                message: err.message,
            });
        }
    }

    // async getProducts(req, res) {
    //     try {
    //         const id = parseInt(req.params.id);
    //         const offset = req.params.offset ? parseInt(req.params.offset) : 0;
    //         const categories = await categoryService.getCategoryChildrens(id);

    //         const products = await productService.getCategoryProduct(
    //             categories,
    //             offset
    //         );

    //         res.status(200).json(products);
    //     } catch (err) {
    //         console.warn(err);
    //         res.status(400).json({
    //             message: err.message,
    //         });
    //     }
    // }

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
