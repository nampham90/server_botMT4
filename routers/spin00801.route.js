module.exports = app =>{
    const Spin00801 = require("../controller/spin00801.controller");
    const verifyToken = require('../middlewares/verifyToken');
    const router = require("express").Router();

    router.post("/spin00801Ant100Search",verifyToken,Spin00801.search);
    router.post("/spin00801Ant100Delete",verifyToken,Spin00801.delete);
    router.post("/spin00801Ant100Deletemany",verifyToken,Spin00801.deletemany);



    app.use("/api/spin00801",router);
}