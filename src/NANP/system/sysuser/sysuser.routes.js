const Router = require("express").Router;
const User = require("../../../controller/user.controller");
const verifyToken = require('../../../middlewares/verifyToken');
const verifyDevadmin = require('../../../middlewares/verifyDevadmin');
const SysUserController = require('./sysuser.controller');
class SysUserRoutes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post("/login", SysUserController.login);
        this.router.post("/demo",User.demo)
        this.router.post("/register", User.register);
        this.router.get("/getroles", verifyDevadmin, User.getRoles);
        this.router.get("/menu", verifyToken, User.getMenu);
        this.router.post("/ant100SearchAllUser",verifyToken,User.getAllUser);
        this.router.get("/ant100GetDetailUser/:id",verifyToken, SysUserController.findById);
        this.router.put("/ant100EditDetailUser",verifyToken,User.editDetailUser);
        this.router.post("/ant100AddDetailUser",verifyToken,User.addDetailUser);
        this.router.post("/ant100CheckEmailUser",verifyToken,User.checkEmail);
        this.router.post("/ant100CheckNameUser",verifyToken,User.checkName);
        this.router.put("/ant100ChangePasswordUser",verifyToken,User.changePassword);
    
        // login từ app 
        this.router.post("/login-app", User.loginApp)
    }
}

module.exports = new SysUserRoutes().router;