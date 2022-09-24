module.exports = app =>{
    const user = require("../controller/user.controller");
    const verifyToken = require('../middlewares/verifyToken');
    const verifyDevadmin = require('../middlewares/verifyDevadmin');
    const router = require("express").Router();

    router.post("/login", user.login);
    router.post("/register", user.register);
    router.get("/getroles", verifyDevadmin, user.getRoles);
    router.get("/menu", verifyToken, user.getMenu);
    router.post("/detailmenu", verifyToken,user.getDetailMenu);
    router.post("/listmenu",verifyToken, user.getListMenu);
    router.post("/ant100SearchAllUser",verifyToken,user.getAllUser);
    router.get("/ant100GetDetailUser/:id",verifyToken,user.getDetailUser);
    router.put("/ant100EditDetailUser",user.editDetailUser)

    app.use("/api/user",router);
}