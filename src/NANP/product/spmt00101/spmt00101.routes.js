const { Router } = require("express");
const verifyToken = require("../../../middlewares/verifyToken");
const spmt00101Controller = require("./spmt00101.controller");


class Spmt00101Routes {
    constructor() {
        this.router = Router();
        this.intializeRoutes()

    }

    intializeRoutes() {
        this.router.post('/spmt00101findcondition', verifyToken, spmt00101Controller.findConditon);
        this.router.post('/spmt00101addnew', verifyToken, spmt00101Controller.regist);
    }
}

module.exports = new Spmt00101Routes().router