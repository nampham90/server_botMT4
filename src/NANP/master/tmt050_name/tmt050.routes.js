const { Router } = require("express");
const verifyToken = require("../../../middlewares/verifyToken");
const tmt050Controller = require("./tmt050.controller");


class Tmt050Routes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();

    }

    intializeRoutes() {
        this.router.post('/tmt050FindRcdkbn',verifyToken,tmt050Controller.findByRcdkbn);
    }
}

module.exports = new Tmt050Routes().router;