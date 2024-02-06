const { Router } = require("express");
const verifyToken = require("../../../middlewares/verifyToken");
const tmt171Controller = require("./tmt171.controller");


class Tmt171Router {
    constructor() {
        this.router = Router();
        this.intializeRoutes();

    }

    intializeRoutes() {
        this.router.post("/tmt171listpaymethd", verifyToken, tmt171Controller.findAll);

    }
}

module.exports = new Tmt171Router().router;