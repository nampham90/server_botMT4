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

    app.use("/api/user",router);
}