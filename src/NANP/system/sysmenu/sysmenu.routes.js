const Router = require("express").Router;
const Menu = require("../../../controller/menu.controller");
const verifyToken = require('../../../middlewares/verifyToken');
const SysMenuController = require('./sysmenu.controller');
class SysMenuRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/ant100SearchFatherMenu",verifyToken,Menu.getListDept);
        this.router.post("/ant100AddMenu",verifyToken,Menu.addMenu)
        this.router.put("/ant100EditMenu",verifyToken,Menu.editMenu)
        this.router.post("/ant100DelMenu",verifyToken,Menu.delMenu)
        this.router.post("/ant100PostDetailMenu",verifyToken,Menu.getDetailMenu);
        this.router.post("/ant100ListMenu",verifyToken,Menu.getListMenu);
        this.router.post("/ant100ListMenuParams",verifyToken,Menu.getListMenuParams);
        this.router.post("/ant100PostUrlParams",verifyToken,Menu.getDetailMenuFromUrl);
        this.router.post("/demofindAllMenu", verifyToken, SysMenuController.findAll);
    }
}

module.exports = new SysMenuRoutes().router;