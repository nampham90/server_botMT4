module.exports = app =>{
    const user = require("../controller/user.controller");
    const verifyToken = require('../middlewares/verifyToken');
    const verifyDevadmin = require('../middlewares/verifyDevadmin');
    const router = require("express").Router();

    router.post("/login", user.login);
    router.post("/register", user.register);
    router.get("/getroles", verifyDevadmin, user.getRoles);
    router.get("/menu",user.getMenu);

    app.use("/user",router);
}