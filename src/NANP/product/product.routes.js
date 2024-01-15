const { Router } = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const productController = require("./product.controller");


class ProductRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();

    }

    intializeRoutes() {
        this.router.post('/productcategories', verifyToken, productController.categories);
    }
}

module.exports = new ProductRoutes().router;