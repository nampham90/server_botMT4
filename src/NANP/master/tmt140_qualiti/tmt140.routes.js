const { Router } = require("express");
const verifyToken = require("../../../middlewares/verifyToken");
const tmt140Controller = require("./tmt140.controller");



class Tmt14QualityRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();

    }

    intializeRoutes() {
        this.router.post('/tmt140getlistqty', verifyToken, tmt140Controller.findAll)
    }
}

module.exports = new Tmt14QualityRoutes().router;