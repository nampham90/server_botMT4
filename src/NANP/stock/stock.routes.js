const { Router } = require("express");
const StockController = require("./stock.controller");
const verifyToken = require("../../middlewares/verifyToken");

class StockRouter {
    constructor(){
        this.router = Router();
        this.intializeRoutes()
    }

    intializeRoutes() {
        this.router.post('/stockListProduct', verifyToken, StockController.listProductInStck)
    }
}

module.exports = new StockRouter().router;