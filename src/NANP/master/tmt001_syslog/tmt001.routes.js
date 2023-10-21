const Router = require("express").Router;
const Tmt001 = require("../../../controller/nhatkyhethong.controller");
const verifyToken = require('../../../middlewares/verifyToken');
class Tmt001SyslogRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post('/nhatkyhethongAnt100getAll',verifyToken, Tmt001.getListsType);
    }
}

module.exports = new Tmt001SyslogRoutes().router;