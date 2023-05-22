module.exports = app =>{
    const Spin00301 = require("../controller/spin00301.controller");
    const verifyToken = require('../middlewares/verifyToken');
    const router = require("express").Router();

    router.post("/spin00301Ant100Search",verifyToken,Spin00301.search);
    
    app.use("/api/spin00301",router);
}