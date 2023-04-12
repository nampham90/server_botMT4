module.exports = app =>{
    const Spin00901 = require("../controller/spin00901.controller");
    const verifyToken = require('../middlewares/verifyToken');
    const router = require("express").Router();

    router.post("/spin00901Ant100Search",verifyToken,Spin00901.Sreach);
    router.post("/spin00901Ant100Add",verifyToken,Spin00901.Register);
    router.post("/spin00901Ant100Update",Spin00901.Update);
    router.post("/spin00901Ant100Del",verifyToken,Spin00901.Delete);
    router.post("/spin00901Ant100Alldel",verifyToken,Spin00901.AllDelete);


    app.use("/api/spin00901",router);
}