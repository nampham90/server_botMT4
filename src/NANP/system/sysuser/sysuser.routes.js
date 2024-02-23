const Router = require("express").Router;
const verifyToken = require('../../../middlewares/verifyToken');
const verifyDevadmin = require('../../../middlewares/verifyDevadmin');
const SysUserController = require('./sysuser.controller');
const { UserLogin,UserGetMenu,UserFindByDepartmentId, UserFindById, UserUpdate,UserDelete, UserCreate, UserCheckEmail, UserCheckName , UserChangePassword, UserFindAll} = require('../../../common/constAPI')
class SysUserRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post(UserLogin, SysUserController.login);
        this.router.post(UserGetMenu, verifyToken, SysUserController.getListMenu);
        this.router.post(UserFindAll, verifyToken, SysUserController.findAll);
        this.router.post(UserFindById , verifyToken, SysUserController.findById);
        this.router.post(UserFindByDepartmentId , verifyToken, SysUserController.findByDepartmentId);
        this.router.put(UserUpdate ,verifyToken, SysUserController.update);
        this.router.post(UserCreate ,verifyToken, SysUserController.create);
        this.router.post(UserDelete ,verifyToken, SysUserController.delete);
        this.router.post(UserCheckEmail ,verifyToken, SysUserController.checkEmail);
        this.router.post(UserCheckName ,verifyToken, SysUserController.checkName);
        this.router.put(UserChangePassword ,verifyToken, SysUserController.changePassword);

    }
}

module.exports = new SysUserRoutes().router;