module.exports = app => {
    const Phongban = require("../controller/phongban.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post("/ant100addPhongban",verifyToken,Phongban.addPhongban);
    route.put("/ant100editPhongban",verifyToken,Phongban.editPhongban);
    route.post("/ant100delPhongban",verifyToken,Phongban.delPhongban);
    route.post("/ant100getAllPhongban",verifyToken,Phongban.getAllPhongban);
    route.post("/ant100getIdPhongban",verifyToken,Phongban.getIdPhongban);
    
    app.use("/api/phongban",route);
}