const Router = require("express").Router;
const Tmt002 = require("../../../controller/tmt101.controller");
const verifyToken = require('../../../middlewares/verifyToken');
class Tmt002VideoRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post("/tmt101Ant100Create",verifyToken,Tmt002.Create);
        this.router.post("/tmt101Ant100Update",verifyToken,Tmt002.Update);
        this.router.post("/tmt101Ant100Detail",verifyToken,Tmt002.Detail);
        this.router.post("/tmt101Ant100GetDetail",verifyToken,Tmt002.GetDetail);
        this.router.post("/tmt101Ant100Searchparam",verifyToken,Tmt002.searchParams);
        this.router.post("/tmt101Ant100FindAll",verifyToken,Tmt002.getLists);
    }
}

module.exports = new Tmt002VideoRoutes().router;