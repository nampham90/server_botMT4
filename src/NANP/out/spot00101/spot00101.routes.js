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
        this.router.post('/spot00101updateorder', verifyToken, spot00101Controller.updateOreder);
        this.router.post('/spot00101inbaogia', verifyToken, spot00101Controller.inbaogia);
    }
}

module.exports = new Spot00101Router().router;