module.exports = app => {
    const Phongban = require("../controller/phongban.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post("/ant100addPhongban",Phongban.addPhongban);
    route.post("/ant100editPhongban",Phongban.editPhongban);
    route.post("/ant100delPhongban",Phongban.delPhongban);
    route.post("/ant100getAllPhongban",Phongban.getAllPhongban);
    route.post("/ant100getIdPhongban",Phongban.getIdPhongban);
    
    app.use("/api/phongban",route);
}