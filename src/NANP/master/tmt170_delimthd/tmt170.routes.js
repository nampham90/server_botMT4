const { Router } = require("express");
const verifyToken = require("../../../middlewares/verifyToken");
const Tmt170Controller = require("./tmt170.controller");


class Tmt170Router {
    constructor() {
        this.router = Router();
        this.intializeRoutes();

    }
    intializeRoutes() {
        this.router.post('/tmt170listdelimthd', verifyToken, Tmt170Controller.findAll);
    }
}

module.exports = new Tmt170Router().router;