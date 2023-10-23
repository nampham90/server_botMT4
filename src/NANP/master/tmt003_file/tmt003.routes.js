const Router = require("express").Router;
const Tmt003 = require("../../../controller/tmt010_file.controller");
const verifyToken = require('../../../middlewares/verifyToken');
const fileValidator = require('../../../middlewares/fileValidator');
class Tmt003FileRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post("/tmt010Ant100SaveFile",verifyToken,fileValidator, Tmt003.saveFile);
    }
}

module.exports = new Tmt003FileRoutes().router;