const Router = require("express").Router;
const Department = require("../../../controller/phongban.controller");
const verifyToken = require('../../../middlewares/verifyToken');
class SysDepRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post("/ant100addPhongban",verifyToken,Department.addPhongban);
        this.router.put("/ant100editPhongban",verifyToken,Department.editPhongban);
        this.router.post("/ant100delPhongban",verifyToken,Department.delPhongban);
        this.router.post("/ant100getAllPhongban",verifyToken,Department.getAllPhongban);
        this.router.post("/ant100getIdPhongban",verifyToken,Department.getIdPhongban);
    }
}

module.exports = new SysDepRoutes().router;