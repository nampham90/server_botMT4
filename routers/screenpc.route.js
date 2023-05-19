module.exports = app => {
    const Screenpc = require("../controller/screenpc.controller");
    const verifyToken = require('../middlewares/verifyToken');
    const route = require("express").Router();

    route.post("/ant100SearchAllDatasc",verifyToken,Screenpc.getAllDataSC);
    route.post("/ant100AddListDatasc",verifyToken,Screenpc.addListDatasc);
    route.put("/ant100EditDatasc",verifyToken,Screenpc.updateDataSC)
    route.post("/ant100DetailDatasc",verifyToken,Screenpc.getDetailDataSC)

    app.use("/api/screenpc",route);
}