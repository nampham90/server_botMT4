const Router = require("express").Router;
//const Datasc = require("../../../controller/screenpc.controller");
const verifyToken = require('../../../middlewares/verifyToken');
const DatascController = require('./sysdatasc.controller');
const {DatascFindById, DatascFindAll, DatascCreate, DatascUpdate, DatascDelete} =  require('../../../common/constAPI')
class SysDatascRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post(DatascFindAll ,verifyToken, DatascController.findAll);
        // this.router.post(DatascCreate ,verifyToken, Datasc.addListDatasc);
        // this.router.put(DatascUpdate ,verifyToken, Datasc.updateDataSC);
        // this.router.post(DatascFindById ,verifyToken, Datasc.getDetailDataSC);
        // this.router.post(DatascDelete ,verifyToken, Datasc.deletelDataSC);
    }
}

module.exports = new SysDatascRoutes().router;