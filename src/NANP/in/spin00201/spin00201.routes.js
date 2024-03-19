const { Router } = require("express");
const verifyToken = require("../../../middlewares/verifyToken");
const spin00201Controller = require("./spin00201.controller");

class Spin00201Routes {
    constructor(){
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post('/spin00201findcondition', verifyToken, spin00201Controller.findConditionTin020)
    }
}

module.exports = new Spin00201Routes().router;