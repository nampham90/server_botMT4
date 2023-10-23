const Router = require("express").Router;
const Role = require("../../../controller/role.controller");
const verifyToken = require('../../../middlewares/verifyToken');
class SysRoleRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post("/ant100SearchAllRole",Role.getListRole);
        this.router.get("/ant100GetSearchAllRole",verifyToken,Role.getSearchAllRole)
        this.router.get("/ant100GetDetailRole/:id",verifyToken,Role.GetDetailRole);
        this.router.put("/ant100EditDetailRole",verifyToken,Role.EditDetailRole);
        this.router.post("/ant100AddDetailRole",Role.AddDetailRole);
        this.router.post("/ant100DelDetailRole",verifyToken,Role.DelDetailRole);
        this.router.get("/ant100GetpermissionRole/:id",verifyToken,Role.GetpermissionRole);
        this.router.put("/ant100PutpermissionRole",verifyToken,Role.PutpermissionRole);
    }
}

module.exports = new SysRoleRoutes().router;