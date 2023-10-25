const Router = require("express").Router;
const User = require("../../../controller/user.controller");
const verifyToken = require('../../../middlewares/verifyToken');
const verifyDevadmin = require('../../../middlewares/verifyDevadmin');
const SysUserController = require('./sysuser.controller');
const { UserLogin,UserGetMenu, UserFindById, UserUpdate, UserCreate, UserCheckEmail, UserCheckName , UserChangePassword, UserFindAll} = require('../../../common/constAPI')
class SysUserRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post(UserLogin, SysUserController.login);
        this.router.post("/demo",User.demo)
        this.router.post("/register", User.register);
        this.router.get("/getroles", verifyDevadmin, User.getRoles);
        this.router.post(UserGetMenu, verifyToken, SysUserController.gitListMenu);
        this.router.post(UserFindAll,verifyToken,User.getAllUser);
        this.router.post(UserFindById , verifyToken, SysUserController.findById);
        this.router.put(UserUpdate ,verifyToken,User.editDetailUser);
        this.router.post(UserCreate ,verifyToken,User.addDetailUser);
        this.router.post(UserCheckEmail ,verifyToken,User.checkEmail);
        this.router.post(UserCheckName ,verifyToken,User.checkName);
        this.router.put(UserChangePassword ,verifyToken,User.changePassword);
    
        // login từ app 
        this.router.post("/login-app", User.loginApp)
    }
}

module.exports = new SysUserRoutes().router;