const { Router } = require("express");
const verifyToken = require("../../../middlewares/verifyToken");
const spot00101Controller = require("./spot00101.controller");


class Spot00101Router {
    constructor() {
        this.router = Router();
        this.intializeRoutes();

    }

    intializeRoutes() {
        this.router.post('/spot00101FindByOrder', verifyToken, spot00101Controller.createOrder);
        this.router.post('/spot00101ListProduct', spot00101Controller.listProductInStck)
    }
}

module.exports = new Spot00101Router().router;