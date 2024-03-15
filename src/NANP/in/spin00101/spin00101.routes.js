const { Router } = require("express");
const verifyToken = require("../../../middlewares/verifyToken");
const spin00101Controller = require("./spin00101.controller");

class Spin00101Routes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();

    }

    intializeRoutes() {
        this.router.post('/spin00101create', verifyToken, spin00101Controller.create);
    }
}

module.exports = new Spin00101Routes().router;