module.exports = app => {
    const Screenpc = require("../controller/screenpc.controller");
    const verifyToken = require('../middlewares/verifyToken');
    const route = require("express").Router();

    route.post("/ant100SearchAllDatasc",Screenpc.getAllDataSC);
    route.post("/ant100AddListDatasc",Screenpc.addListDatasc)

    app.use("/api/screenpc",route);
}