const Router = require("express").Router;
const Role = require("../../../controller/role.controller");
const verifyToken = require('../../../middlewares/verifyToken');
const SysRoleController = require('./sysrole.controller');
const {RoleCreate,RoleUpdate,RoleFindById,RoleFindAll,RoleSearchAll,RoleDelete,RoleGetMenu,RolePutMenu}  = require('../../../common/constAPI')
class SysRoleRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post(RoleFindAll ,verifyToken, SysRoleController.findAll);//Role.getListRole
        this.router.get(RoleSearchAll ,verifyToken, SysRoleController.searchAll);
        this.router.post(RoleFindById, verifyToken, SysRoleController.findById);
        this.router.put(RoleUpdate, verifyToken, SysRoleController.update);
        this.router.post(RoleCreate, verifyToken, SysRoleController.create);
        this.router.post(RoleDelete, verifyToken, Role.DelDetailRole);
        this.router.get(RoleGetMenu, verifyToken, Role.GetpermissionRole);
        this.router.put(RolePutMenu, verifyToken, Role.PutpermissionRole);
    }
}

module.exports = new SysRoleRoutes().router;