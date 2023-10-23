const Router = require("express").Router;
const Datasc = require("../../../controller/screenpc.controller");
const verifyToken = require('../../../middlewares/verifyToken');
class SysDatascRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post("/ant100SearchAllDatasc",verifyToken,Datasc.getAllDataSC);
        this.router.post("/ant100AddListDatasc",verifyToken,Datasc.addListDatasc);
        this.router.put("/ant100EditDatasc",verifyToken,Datasc.updateDataSC);
        this.router.post("/ant100DetailDatasc",verifyToken,Datasc.getDetailDataSC);
        this.router.post("/ant100DelDatasc",verifyToken,Datasc.deletelDataSC);
    }
}

module.exports = new SysDatascRoutes().router;