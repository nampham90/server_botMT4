const { Router } = require("express");
const tmt280Controller = require("./tmt280.controller");
const verifyToken = require("../../../middlewares/verifyToken");


class Tmt280Router {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post("/tmt280listdivkbn", verifyToken, tmt280Controller.findAll);
    }
}

module.exports = new Tmt280Router().router;