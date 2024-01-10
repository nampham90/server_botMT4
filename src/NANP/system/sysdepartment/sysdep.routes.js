const Router = require("express").Router;
const Department = require("../../../controller/phongban.controller");
const verifyToken = require('../../../middlewares/verifyToken');
const SysDepController = require('./sysdep.controller');
class SysDepRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post("/ant100addPhongban", verifyToken, SysDepController.create);
        this.router.put("/ant100editPhongban", verifyToken, SysDepController.update);
        this.router.post("/ant100delPhongban", verifyToken, SysDepController.delete);
        this.router.post("/ant100getAllPhongban", verifyToken, SysDepController.findAll);
        this.router.post("/ant100getIdPhongban", verifyToken, SysDepController.findById);
    }
}

module.exports = new SysDepRoutes().router;