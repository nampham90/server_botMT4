const Router = require("express").Router;
const Menu = require("../../../controller/menu.controller");
const verifyToken = require('../../../middlewares/verifyToken');
const SysMenuController = require('./sysmenu.controller');
const {MenuCreate,MenuUpdate,MenuDelete,MenuFindByID,MenuFindAll,MenuFindAllParams,MenuFindAllURl}  = require('../../../common/constAPI')
class SysMenuRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/ant100SearchFatherMenu", verifyToken, Menu.getListDept);
        this.router.post( MenuCreate, verifyToken, SysMenuController.create)
        this.router.put( MenuUpdate, verifyToken, SysMenuController.update)
        this.router.post( MenuDelete, verifyToken, SysMenuController.delete)
        this.router.post( MenuFindByID, verifyToken, SysMenuController.findById);
        this.router.post( MenuFindAll, verifyToken, SysMenuController.findAll);
        this.router.post( MenuFindAllParams, verifyToken, SysMenuController.findAll);
        this.router.post( MenuFindAllURl, verifyToken, SysMenuController.getDetailMenuFromUrl);
        this.router.post("/demofindAllMenu", verifyToken, SysMenuController.findAll);
    }
}

module.exports = new SysMenuRoutes().router;