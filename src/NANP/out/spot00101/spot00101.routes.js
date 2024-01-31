const { Router } = require("express");
const verifyToken = require("../../../middlewares/verifyToken");
const spot00101Controller = require("./spot00101.controller");


class Spot00101Router {
    constructor() {
        this.router = Router();
        this.intializeRoutes();

    }

    intializeRoutes() {
        this.router.post('/spot00101neworder', verifyToken, spot00101Controller.createOrder);
        this.router.post('/spot00101orderstatus', verifyToken, spot00101Controller.orderStatus);
    }
}

module.exports = new Spot00101Router().router;