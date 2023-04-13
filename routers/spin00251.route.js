module.exports = app =>{
    const Spin00251 = require("../controller/spin00251.controller");
    const verifyToken = require('../middlewares/verifyToken');
    const router = require("express").Router();

    router.post("/spin00251Ant100Register",Spin00251.Register);



    app.use("/api/spin00251",router);
}